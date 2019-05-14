<template>
  <div class="shopping-order-pay center-main" v-loading.fullscreen.lock="fullscreenLoading">
    <shopping-step :active="2" class="shopping-step"></shopping-step>
    <div class="order-pay-edit">
      <div class="slide-left ">
        <!-- 第一步 地址 -->
        <div class="box-address">
          <div class="title"  v-bind:class="{ 'active' : isOrder }">1.Shipping Address</div>
          <!-- 未登录的地址优化 -->
          <shipping-address  @newAddress="showAddress" v-if="!isLogin" v-show="!isNew" @cancelAddress="cancelRess" :updateRess="updateRess"></shipping-address>
          <!-- 登录情况地址 添加 如果没有登录就不要显示-->
          <div class="box-list" v-if="isLogin" v-show="!isOrder">
            <div class="list" >
              <div class="item rel" v-for="(item,index) in inAddressList" @click="clickAddress(item)" v-bind:class="{ 'active': isSelect === item.id }" :key="index">
                <p>{{ item.firstName }} {{ item.lastName }}</p>
                <p>{{ email }}</p>
                <div class="desc">
                  <p>{{ item.address1 }} {{ item.address2 }}</p>
                  <p> {{ item.city }}, {{ item.regionCode }} {{ item.postcode }}</p>
                  <p> {{ item.countryCode }}</p>
                  <p> Phone: {{item.telephone}}</p>
                </div>
                <div class="abs-op">
                  <i class="el-icon-edit" @click="updateAddress(item)" ></i>
                  <i class="el-icon-delete" @click="delAddress(item)"></i>
                </div>
              </div>
              <div class="item"  @click="addAddress">
                <div class="add-icon">
                  <i class="el-icon-plus"></i>
                </div>
                <p class="text">Add a new address</p>
              </div>
            </div>
            <!-- 按钮下一步 -->
            <vava-button :disable="inAddressList.length === 0" @click="clickCont" class="bg-gradient check-address">Continue</vava-button>
          </div>
          <!-- 折叠内容展示 -->
          <div class="detail" v-if="isOrder">
              <p>{{ selAddress.firstName }} {{ selAddress.lastName }}</p>
              <p>{{ email }}</p>
              <div class="desc">
                <p>{{ selAddress.address1 }} {{ selAddress.address2 }}</p>
                <p> {{ selAddress.city }}, {{ selAddress.regionCode }} {{ selAddress.postcode }}</p>
                <p> {{ selAddress.countryCode }}</p>
                <p> Phone: {{selAddress.telephone}}</p>
              </div>
              <div class="abs-edit" @click="showAddres">
                Change Address
              </div>
          </div>
          <!-- 登陆之后地址 修改地址弹框 -->
          <el-dialog :visible.sync="dialogVisible" title="Shipping Address" width="55%" top="10vh" class="dialog-ress" center>
            <shipping-address  @newAddress="showAddress" :updateRess="updateRess" @cancelAddress="cancelRess"></shipping-address>
          </el-dialog>
        </div>
        <!-- 第二步  2.Payment Methods-->
        <div class="pay-methods">
          <div class="title"  v-bind:class="{ 'bg-ddd' : !isOrder }" >2.Payment Methods</div>
          <div class="box-list" v-if="isOrder">
              <!-- pp支付 -->
              <div class="item rel border-gradient">
              <p class="sub-title">PayPal</p>
              <p>Pay by credit card. debit card and more through your PayPal account</p>
              <img src="@/assets/images/shopping/icon_pay.png" style="width:170px;margin-top: 4px;">
              <div class="right-block"><img src="@/assets/images/shopping/paypal.png" width="120px"></div>
              </div>
              <p class="desc">*Currently we only support payment via PayPal,  but will add more methods in the future.</p>
          </div>
        </div>
      </div>
      <!-- 右边结算预览 -->
      <order-summary class="order-pay-summary" :isActive="isOrder" @click="saveOrder"></order-summary>
    </div>
  </div>
</template>
<script>
  import ShippingAddress  from './shipping-address.vue'
  import OrderSummary from './order-summary.vue'
  import ShoppingStep from './shopping-step.vue'
  export default {
    components: { ShoppingStep, ShippingAddress, OrderSummary },
    computed: {
      totalPrice () {
        let total = this.$utils.toDecimal(Number(this.shoppingCart.totalAmount) + this.objTax.tax - this.couponAmount);
        return total;
      },
      shoppingCart () { // 最终需要购买的商品
        return this.$utils.calculationCart(this.$store.state.shoppingCart.productList, this.$store.state.shoppingCart.shoppingCartId, true)
      }
    },
    data () {
      return {
        isNew: false, // 是否显示地址
        isAdd: false, // 是否登录新增地址
        email: '', // 用户操作邮箱
        updateRess: {}, // 修改地址对象
        objTax: {
          tax: 0
        }, // 税费
        selAddress: {}, // 选中的地址列表
        inAddressList: [], // 地址列表
        isSelect: '',
        couponCode: '', // 优惠码
        couponName: '', // 名称
        promotionType: '', // 优惠码类型
        directDiscount: '', // 优惠码
        couponAmount: 0.00, // 优惠价格
        userAuthToken : '',
        isCoupon: false, // 优惠券是否应用
        dialogVisible: false, // 修改地址弹出框是否显示
        isOrder: false, // 是否可以下订单
        fullscreenLoading: false,
        isTips: false, // 优惠错误提示
        emailLock: false, // 是否锁定邮箱禁止编辑
        cartList: {productList: []},
        isLogin: false // 是否登陆
      }
    },
    mounted () {
      // 如果登陆就获取地址列表 未登陆直接显示地址编辑表单
       if (this.$cookies.get('token')) {
         this.isLogin = true
         this.getInAddress()
       }
    },
    methods: {
      async showAddress (form) { // 编辑地址点击保存处理方法
        // 登陆了才保存地址
        if (this.isLogin) {
          this.saveAddress(form, this.isAdd) // 保存地址
          if (this.isAdd) {
            this.dialogVisible = false;
            this.isAdd = false;
          }
        } else {
          // 没有登录
          this.selAddress = form;
          this.selAddress.countryCode = form.country;
          this.selAddress.regionCode = form.region;
          this.isNew = true;
          this.isOrder = true;
          // 获取税费
          this.getOrderTax();
        }
      },
      saveAddress (form, isAdd) { // 登陆状态下 编辑地址保存 isAdd 为true表示登陆下新增地址
        this.$store.dispatch('postFetch', {api: isAdd ? 'addressAdd' : 'addressEdit', data: form}).then(data => {
          this.$message.success('success')
          this.getInAddress() // 保存成功后重新获取地址列表
        }).catch(error => {
          let messageStr = error.code === 'ECONNABORTED' ? 'The system is busy. Please try to refresh it.' : error && error.message || 'The system is busy. Please try to refresh it.'
          this.$message.error(messageStr)
        })
      },
      getInAddress () { // 获取地址列表
        this.$store.dispatch('postFetch', {api: 'findAddressInfoListVo', data: {pageNo: 1, pageSize: 20}}).then(json => {
          this.inAddressList = json.payload.data;
          // 默认选中第一个
          this.selAddress = this.inAddressList[0];
          this.isSelect = this.selAddress.id;
          // 获取税费
          this.selAddress.country = this.selAddress.countryCode;
          this.selAddress.region = this.selAddress.regionCode;
          this.selAddress.email = this.userList.email;
          ths.getOrderTax();
        }).catch(error => {
          this.$message.error(error)
        })
      },
      /**
       * [addAddress 添加地址展开]
       * @author luke 2018-12-17
       */
      addAddress () {
        this.isAdd = true;
        this.updateRess = '';
        this.dialogVisible = true;
      },
      /**
       * [getOrderTax 保存地址调用税费接口]
       * @author luke 2018-12-13
       */
      async getOrderTax () {
        // 获取税费接口
        let productList = [];
        for (let i = 0; i < this.shoppingCart.productList.length; i++) {
          let ths = this.shoppingCart.productList[i];
          productList.push({
            pid: ths.productId,
            colorId: ths.colorId,
            num: ths.productQty,
            sku: ths.sku,
            model: ths.model,
            promotionType: this.promotionType,
            directDiscount: this.directDiscount
          })
        }
        // 购物车没有数据跳转到购物车界面
        if (productList.length < 1) {
          location.href = location.origin + '/carts/';
        }
        // 判断选择没有地址
        if (this.$common.isNull(this.selAddress.email)) {
          console.log(this.selAddress);
          return false;
        }
        let obj = {
          api: 'getOrderInfoPriceVo',
          data: {
            'brand': 'rp',
            'lang': 'en',
            'items': productList,
            'rqShopOrderAddress': this.selAddress
          }
        }
        let taxList = await this.$store.dispatch('requestPost', obj);
        this.objTax = taxList.payload.data;
      },
      /**
       * [getAccountToken 获取token]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      async getAccountToken () {
        // 如果没有登录获取userAuthToken
        let accountObj = {
          api: 'getAccount',
          data: {
            'accountEmail': this.selAddress.email,
            'brand': 'RAVPower',
            'brandId': 1,
            'langId': 1,
            'originalSource': 'shopOrder'
          }
        }
        let account = await this.$store.dispatch('requestPost', accountObj)
        this.userAuthToken = account.payload.data.userAuthToken;
      },
      // 下单
      saveOrder () {
        this.fullscreenLoading = true
        // 获取商品信息列表
        let productList = [];
        for (let i = 0; i < this.shoppingCart.productList.length; i++) {
          let ths = this.shoppingCart.productList[i];
          productList.push({
            pid: ths.productId,
            colorId: ths.colorId,
            num: ths.productQty,
            sku: ths.sku,
            model: ths.model
          })
        }
        let coupon = this.isCoupon ? this.couponCode : '';
        // 先保存订单然后调用支付按钮
        let obj = {
          api: 'submitOrderInfo',
          data: {
            'brand': 'rp',
            'lang': 'en',
            'orderCurrencyCode': 'US',
            'orderSource': 'RAVPower',
            'purchaseType': '0',
            'couponCode': coupon,
            'amountTotal': this.shoppingCart.totalAmount,
            'qtyTotal': this.shoppingCart.totalNum,
            'qtyItem': productList.length,
            'items': productList,
            'userAuthToken': this.userAuthToken,
            "rqShopOrderAddress": this.selAddress
          }
        }
        this.$store.dispatch('postFetch', obj).then(orderList => { // 调用下单接口
          // this.$seoFn.onCheckoutOption(3, 'Pay')
          // 提交给pp支付并跳转
          if (orderList) this.palpal(orderList) // 下单成功后调用PP支付
        }).catch(error => {
          this.fullscreenLoading = false
          this.$message.error(error && error.message || 'Server Error' )
        })
      },
      /**
       * [palpal 支付页面]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      palpal (orderList) {
        // 提交给pp支付
        let arrExList = [];
        for(let i = 0 ; i < this.shoppingCart.productList.length; i++){
          let orderItemExList = this.shoppingCart.productList[i];
          let json = {
            'sku': orderItemExList.sku,
            'shortName': orderItemExList.productName,
            'productId': orderItemExList.productId,
            'price': orderItemExList.price,
            'variant': orderItemExList.colorId,
            'qtyOrdered': orderItemExList.productQty,
            'discountPrice': orderItemExList.discountPrice || null,
          };
          arrExList.push(json);
        }
        let url = window.location.origin;
        let pObj = {
          api: 'payment',
          data: {
            'orderId': orderList.id,
            'orderTotal': this.totalPrice,
            'subTotal': this.shoppingCart.totalAmount,
            'discountAmount': orderList.discountAmount,
            'tax': this.objTax.tax,
            'description': '',
            'userAuthToken': this.userAuthToken,
            'successUrl': url + '/pay-result-success',
            'cancelUrl': url + '/pay-result-fail',
            "orderAddressEx": {
              'address1': orderList.orderAddressEx.address1,
              'city': orderList.orderAddressEx.city,
              'country': orderList.orderAddressEx.country,
              'postcode': orderList.orderAddressEx.postcode,
              'region': orderList.orderAddressEx.region,
              'firstName': orderList.orderAddressEx.firstName,
              'lastName': orderList.orderAddressEx.lastName
            },
            'orderItemExList': arrExList
          }
        }
        // 清除购物车数据
        this.clearCarts();
        // 跳转pp
        this.$store.dispatch('requestPost', pObj).then(json => {
          let data = json.payload.data
          if (data) {
            // window.open(data.approvalUrl);
            pObj.orderNo = orderList.orderNo;
            // 20190123
            pObj.userEmail = this.email
            window.localStorage.setItem('paymentData', JSON.stringify(pObj));
            window.location.href = data.approvalUrl;
          } else if (json.resCode === 40000) {
            this.fullscreenLoading = false
            this.$message.error(json.resDes)
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /**
       * [clearCarts 清空购物车]
       * @author luke 2019-01-03
       */
      clearCarts () {
        let newArr = [];
        let pList = this.shoppingCart.productList;
        for (let i = 0; i < pList.length; i++) {
          let ths = pList[i];
          newArr.push({
            pid: ths.productId,
            num: 0,
            colorId: ths.colorId,
            sku: ths.sku,
            model: ths.model
          })
        }
        let obj = {
          countryId: 1,
          brand: this.brand,
          lang: this.lang,
          items: newArr
        };
        this.$store.dispatch('UPDATE_CART_LIST', obj).then(json => {
          localStorage.removeItem('shoppingCarts');
        }).catch(error => {
          this.$message.error(error);
        });
      },
      getCart () {
        let obj = {
          api: 'getCartList',
          data: {
            token: this.userAuthToken
          }
        };
        this.$store.dispatch('fetchGetAll', obj).then(json => {
          this.shoppingCart.productList = json.brandShopCartItems;
          this.shoppingCart.totalAmount = json.brandShopCart[0].amountTotal;
          this.shoppingCart.totalNum = json.brandShopCart[0].qtyTotal
          this.loading = false;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /**
       * [delAddress 删除地址]
       * @author luke 2018-12-15
       */
      async delAddress (item) {
        let obj = {
          api: 'delAddress',
          data: {
            userAuthToken: this.userAuthToken,
            id: item.id
          }
        };
        await this.$store.dispatch('FETCH_ADDRESS_ALL', obj);
        // 获取新的地址列表
        this.getInAddress();
        let inObj = {
          api: 'getAddressList',
          data: {
            userAuthToken: this.userAuthToken
          }
        }
        this.$store.dispatch('FETCH_ADDRESS_ALL', inObj).then(json => {
          this.inAddressList = json.payload.data;
        });
        // 阻止事件冒泡
        event.stopPropagation();
      },
      /**
       * [updateAddress 修改地址]
       * @author luke 2018-12-17
       */
      updateAddress (item) {
        this.updateRess = item;
        this.isAdd = true;
        this.dialogVisible = true;
        // 阻止事件冒泡
        event.stopPropagation();
      },
      /**
       * [showAddres 显示地址 没有登录的情况]
       * @author luke 2018-12-13
       */
      showAddres () {
        if (this.isLogin) {
          this.isOrder = false;
        } else {
          this.updateRess = this.selAddress;
          this.isNew = false;
          this.isOrder = false;
        }
      },
      /**
       * [cancelRess 关闭]
       * @author luke 2018-12-19
       */
      cancelRess () {
        this.isNew = true;
        this.isAdd = false;
        this.dialogVisible = false;
        this.updateRess = '';
      },
      /**
       * [clickAddress 登录之后选择地址]
       * @author luke 2018-12-17
       */
      clickAddress (item) {
        console.log(item);
        this.isSelect = item.id;
        // 设置email
        this.selAddress = item;
        this.selAddress.email = this.email;
        this.selAddress.country = item.countryCode;
        this.selAddress.region = item.regionCode;
        // 获取税费
        this.getOrderTax();
      },
      /**
       * [clickCont 下一步]
       * @author luke 2018-12-19
       */
      clickCont () {
        this.isOrder = true;
        this.$seoFn.onCheckoutOption(2, 'checkoutOption');
      },
      /**
       * [setCoupon 设置地址]
       * @author luke 2018-12-17
       */
      setCoupon () {
        if (this.$common.isNull(this.couponCode)) {
          return false;
        }
        this.isTips = false;
        let obj = {
          api: 'getCouponCode',
          data: {
            token: this.userAuthToken,
            couponCode: this.couponCode,
            subTotal: this.shoppingCart.totalAmount
          }
        };
        this.$store.dispatch('FETCH_GET_ALL', obj).then(json => {
          let data = json.payload.data;
          if (data === null) {
            // setCoupon
            this.isTips = true;
            return false;
          }
          this.isCoupon = true;
          this.couponName = data.couponName;
          this.directDiscount = data.directDiscount / 100;
          this.promotionType = 1;
          // 获取价格
          var totPrice = 0;
          var discount = 1;
          for (let i = 0; i < this.shoppingCart.productList.length; i++) {
            let ths = this.shoppingCart.productList[i];
            let qty = ths.productQty;
            let price = ths.price;
            if (this.directDiscount !== '') {
              discount = this.$common.toDecimal(1 - this.directDiscount);
            }
            totPrice += this.$common.toDecimal(price * discount) * qty;
            ths.discountPrice = this.$common.toDecimal(price * discount);
          }
          this.couponAmount = this.$common.toDecimal(this.shoppingCart.totalAmount - totPrice);
          // 获取税率
          this.getOrderTax();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /**
       * [removeCoupon 取消优惠券]
       * @author luke 2018-12-17
       */
      removeCoupon () {
        this.isCoupon = false;
        // 清空优惠码
        this.couponCode = '';
        this.directDiscount = 0.00;
        this.promotionType = '';
        this.couponAmount = 0.00;
        // 获取税率
        this.getOrderTax();
      },
      isLength (val) {
        return val && val.length > 0
      }
    }
  }
</script>
<style lang='less' scoped >
  .shopping-order-pay {
    width: 100%;
    background: #FAFAFA;
    .shopping-step{
      background-color: #FFF;
      margin-bottom: 20px;
      padding: 0 150px;
    }
    .order-pay-edit{
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      .slide-left {
        width: 850px;
        display: inline-block;
      }
      .box-address {
        padding: 0px 0px 10px 0px;
        width: 100%;
        .title{
          background: #666666;
          height: 60px;
          line-height: 60px;
          font-family: SFCompactDisplay-Regular;
          font-size: 20px;
          color: #FFFFFF;
          padding-left: 20px;
        }
        .active {
          background: #fff;
          color: #000;
          border-bottom: 1px solid #eee;
        }
        .box-list {
          background: #FFFFFF;
          padding: 20px;
          text-align: center;
          .list {
            display: flex;
            text-align: left;
            flex-wrap: wrap;
            .item{
              padding: 20px;
              background: #FFFFFF;
              border: 1px dotted #EEEEEE;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #333333;
              line-height: 20px;
              width: 397px;
              margin-right: 15px;
              margin-bottom: 15px;
              cursor: pointer;
              min-height: 175px;
              transition: all .2s linear;
              transform: translate3d(0, -2px, 0);
              .desc {
                border-top: 1px solid #EEEEEE;
                margin-top: 6px;
                padding-top: 6px;
              }
              .add-icon {
                border: 1px solid #E0E0E0;
                padding: 11px;
                width: 44px;
                height: 44px;
                line-height: 22px;
                margin: 0 auto;
                border-radius: 50%;
                margin-top: 7%;
                i {
                  font-size: 20px;
                  text-align: center;
                  color: #979797;
                }
              }
              .text {
                text-align: center;
                font-family: SFCompactDisplay-Regular;
                font-size: 14px;
                color: #333333;
                line-height: 20px;
              }
              .abs-op {
                position: absolute;
                right: 20px;
                bottom: 20px;
                display: none;
                i {
                  width: 16px;
                  margin-right: 15px;
                  color: #666666;
                  &:hover{
                  color: #13bed3;
                  }
                  &:last-child {
                    margin-right: 0px;
                  }
                }
              }
              &:hover{
                border: 1px solid transparent;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                .abs-op {
                  display: block;
                }
              }
              &:nth-child(2n) {
                margin-right: 0px;
              }
            }
            .active {
              border: 1px solid transparent;
              border-image-slice: 1;
            }
          }
          .check-address{
            margin-top: 20px;width: 180px;max-height: 45px;
          }
        }
        .detail {
          font-family: SFCompactDisplay-Regular;
          background: #FFFFFF;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          text-align: left;
          position: relative;
          .desc{
            color: #666666;
            line-height: 20px;
          }
          .abs-edit{
            position: absolute;
            top: 20px;
            right: 20px;
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: @base-color;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
      .pay-methods {
        width: 100%;
        .title {
          font-family: SFCompactDisplay-Regular;
          font-size: 20px;
          height: 60px;
          line-height: 60px;
          padding-left: 20px;
          background: #fff;
          color: #000;
          border-bottom: 1px solid #eee;
        }
        .bg-ddd {
          background: #ddd;
        }
        .box-list {
          padding: 20px;
          background: #FFFFFF;
          .item {
            position: relative;
            padding: 20px;
            .right-block {
              position: absolute;
              top: 32px;
              right: 30px;
            }
            .sub-title{
              font-size: 16px;
              line-height: 22px;
            }
            p {
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #666666;
              line-height: 20px;
            }
          }
          .desc {
            font-family: SFCompactDisplay-Regular;
            font-size: 12px;
            color: #999999;
            margin-top: 10px;
          }

        }
      }
      .btn-gray {
        background: #DDDDDD;
        border-radius: 22px;
        margin-top: 35px;
        border: 0px;
        color: #fff;
        &:hover{
          box-shadow: 0 8px 24px #DDDDDD;
        }
      }
    }
    .order-pay-summary{
      margin-left: 20px;
    }
  }
</style>

<style lang='less'>
  .dialog-ress{
    .el-dialog--center .el-dialog__body {
      padding-top: 0px;
    }
  }
  .error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
  .el-dialog__header {
    .el-dialog__title{
      font-family: SFCompactDisplay-Thin;
      font-size: 32px;
      color: #666666;
      padding-top: 10px;
    }
  }
  .box-code {
    .el-input__inner {
      height: 32px;
    }
  }
</style>

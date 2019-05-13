<template>
  <div class="shopping-order-pay center-main">
    <shopping-step :active="2" class="shopping-step"></shopping-step>
    <div class="order-pay-edit">
      <div class="slide-left ">
        <!-- 第一步 地址 -->
        <div class="box-address">
          <div class="title"  v-bind:class="{ 'active' : isOrder }">1.Shipping Address</div>
          <!-- 未登录的地址优化 -->
          <shipping-address  @newAddress="showAddress" v-if="!isLogin" v-show="!isNew" @cancelAddress="cancelRess" :updateRess="updateRess" :emailLock='emailLock'></shipping-address>
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
            <vava-button v-if="inAddressList.length > 0" style="margin-top: 20px;width: 180px;" @click="clickCont" class="bg-gradient">
              Continue
            </vava-button>
            <!-- 没有显示地址的情况 -->
            <vava-button v-else style="margin-top: 20px;width: 180px;" class="btn-gray">Continue</vava-button>
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
      <order-summary class="order-pay-summary"></order-summary>
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
      isLogin () {
        return false
      },
      totalPrice () {
        let total = this.$utils.toDecimal(Number(this.cartList.totalAmount) + this.objTax.tax - this.couponAmount);
        return total;
      }
    },
    data () {
      return {
        shoppingCart: [],
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
        cartList: {productList: []}
      }
    },
    mounted () {
      // await this.$store.dispatch('fetchIsLogin');
      // this.userAuthToken = this.$cookie.get('userAuthToken');
      // this.init()
    },
    beforeMount () {
      console.log(this.$utils)
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
    },
    methods: {
      async showAddress (form) {
        // 登陆了才保存地址
        if (this.isLogin) {
          form.active = 0;
          // 保存地址
          await this.saveAddress(form);
          // 添加进去
          if (this.isAdd) {
            // 等于‘’ 等于新增
            // if (form.id === '' || form.id === undefined || form.id === null) {
            //   this.inAddressList.push(form);
            // }
            this.dialogVisible = false;
            this.isAdd = false;
          }
          await this.getInAddress();
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
      /**
       * [saveAddress 登陆之后要保存地址]
       * @author luke 2018-12-14
       */
      async saveAddress (form) {
        form.userAuthToken = this.userAuthToken;
        let api = 'editAddress'
        if (form.id === '' || form.id === undefined || form.id === null) {
          api = 'addAddress'
        }
        let obj = {
          api: api,
          data: form
        }
        await this.$store.dispatch('FETCH_POST_ALL', obj);
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
        for (let i = 0; i < this.cartList.productList.length; i++) {
          let ths = this.cartList.productList[i];
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
          api: 'getOrderTax',
          data: {
            'brand': 'rp',
            'lang': 'en',
            'items': productList,
            'rqShopOrderAddress': this.selAddress
          }
        }
        let taxList = await this.$store.dispatch('FETCH_POST_ALL', obj);
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
        let account = await this.$store.dispatch('FETCH_POST_ALL', accountObj)
        this.userAuthToken = account.payload.data.userAuthToken;
      },
      /**
       * [saveOrder 根据地址保存订单]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      async saveOrder () {
        // 获取商品信息列表
        let productList = [];
        for (let i = 0; i < this.cartList.productList.length; i++) {
          let ths = this.cartList.productList[i];
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
          api: 'saveOrder',
          data: {
            'brand': 'rp',
            'lang': 'en',
            'orderCurrencyCode': 'US',
            'orderSource': 'RAVPower',
            'purchaseType': '0',
            'couponCode': coupon,
            'amountTotal': this.cartList.totalAmount,
            'qtyTotal': this.cartList.totalNum,
            'qtyItem': productList.length,
            'items': productList,
            'userAuthToken': this.userAuthToken,
            "rqShopOrderAddress": this.selAddress
          }
        }

        let orderList = await this.$store.dispatch('FETCH_POST_ALL', obj).catch(error => {
          this.fullscreenLoading = false
          this.$message.error(error && error.message || 'Server Error' )
        })
        if (!(orderList.resCode === 200 || orderList.code === 200)) {
          this.fullscreenLoading = false
          this.$message.error(orderList.resDes || orderList.message)
        }
        return orderList.resCode === 200 || orderList.code === 200 ? orderList.payload.data.orderList[0] : false
      },
      /**
       * [palpal 支付页面]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      palpal (orderList) {
        // 提交给pp支付
        let arrExList = [];
        for(let i = 0 ; i < this.cartList.productList.length; i++){
          let orderItemExList = this.cartList.productList[i];
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
            'subTotal': this.cartList.totalAmount,
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
        this.$store.dispatch('FETCH_POST_ALL', pObj).then(json => {
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
        let pList = this.cartList.productList;
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
      /**
       * [pay 最终支付]
       * @author luke 2018-12-13
       */
      async pay () {
        // 没有登录获取token
        if (!this.isLogin) {
          await this.getAccountToken();
        }
        // loading
        this.fullscreenLoading = true;

        // 获取订单信息
        let orderList = await this.saveOrder();
        this.$seoFn.onCheckoutOption(3, 'Pay');
        // 提交给pp支付并跳转
        if (orderList) this.palpal(orderList);

      },
      /**
       * [init 初始化方法]
       * @author luke 2018-12-07
       * @return {[type]} [description]
       */
      init () {
        if (this.isLogin) {
          // 获取登录用户的地址
          this.getInAddress();
          this.email = this.userList.email;
        } else {
          if (this.$route.query.email) {
            this.email = this.$route.query.email;
            this.emailLock = true
          }
        }
      },
      /**
       * [getInAddress 获取登陆]
       * @author luke 2018-12-15
       */
      getInAddress () {
        // 获取地址列表
        let obj = {
          api: 'getAddressList',
          data: {
            userAuthToken: this.userAuthToken
          }
        }
        let ths = this;
        this.$store.dispatch('FETCH_ADDRESS_ALL', obj).then(json => {
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
          this.$message.error(error);
        });
      },
      /**
       * [getCart 获取购物车数据]
       * @author luke 2018-12-07
       */
      getCart () {
        let obj = {
          api: 'getCartList',
          data: {
            token: this.userAuthToken
          }
        };
        this.$store.dispatch('fetchGetAll', obj).then(json => {
          this.cartList.productList = json.brandShopCartItems;
          this.cartList.totalAmount = json.brandShopCart[0].amountTotal;
          this.cartList.totalNum = json.brandShopCart[0].qtyTotal
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
        // 获取新的地址
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
            subTotal: this.cartList.totalAmount
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
          for (let i = 0; i < this.cartList.productList.length; i++) {
            let ths = this.cartList.productList[i];
            let qty = ths.productQty;
            let price = ths.price;
            if (this.directDiscount !== '') {
              discount = this.$common.toDecimal(1 - this.directDiscount);
            }
            totPrice += this.$common.toDecimal(price * discount) * qty;
            ths.discountPrice = this.$common.toDecimal(price * discount);
          }
          this.couponAmount = this.$common.toDecimal(this.cartList.totalAmount - totPrice);
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
      padding: 0 11vw;
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
            color: #13BED3;
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

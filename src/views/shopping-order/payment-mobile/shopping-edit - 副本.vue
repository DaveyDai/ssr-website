<template>
  <div>
    <div class="pay">
      <!-- 头部 -->
      <div class="bread-self" >
        <!-- class： bg-gradient(成功)  fail(失败) -->
        <div class="item24 bg-gradient">
          <p>Order Info<span></span></p>
        </div>
        <div class="item24">
          <p>Payment<span></span></p>
        </div>
        <div class="item24">
          <p>Confirmation<span></span></p>
        </div>
      </div>
      <!-- 左边列表 -->
      <div class='pay-wrap'>
        <div class="slide-left">
          <!-- 第一步 地址 -->
          <div class="box-address">
            <div class="title">
              Shipping Address
            </div>
            <!-- 未登录且无地址 -->
            <div class="pay-title" v-if="!hasAddress">
              <a class='infoA' @click="goDetail" v-loading="isLoadingAddr"><i class='el-icon-circle-plus-outline'></i>Add a new address</a>
            </div>
            <!-- 当前地址信息展示 -->
            <div class="addrInfo" v-else @click="changeAddr(selAddress)">
              <p class="name">{{ selAddress.firstName }} {{ selAddress.lastName }}</p>
              <p>{{ email }}</p>
              <div class="desc">
                <p>{{ selAddress.address1 }} {{ selAddress.address2 }}</p>
                <p> {{ selAddress.city }}, {{ selAddress.regionCode }} {{ selAddress.postcode }}</p>
                <p> {{ selAddress.countryCode }}</p>
                <p> Phone: {{selAddress.telephone}}</p>
              </div>
              <a class="changeAddr">
                <i class="el-icon-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- 右边 -->
        <div class="slide-right">
          <!-- 地址块 -->
          <div class="title" >
            <div class="left">
              <p class="name">Order Summary</p>
              <!-- <span>shipping by Amazon</span> -->
            </div>
            <div class="right-num">
              <span>{{ cartList.totalNum }}</span> item{{ cartList.totalNum > 1 ? 's' : ''}}
            </div>
          </div>
          <!-- 产品列表 -->
          <shopping-detail @cartListChange="cartListChange" :allowEdit="allowEdit" :showNum="showNum" @refreshCart="refresh" ></shopping-detail>
          <div class="coupon-box" v-if="false">
            <router-link class="coupon-box-wrap spaceBetween" tag="a" to="/pay-coupon">
              <p class="box-title spaceBetween">
                <strong>Coupon Code</strong>
                <span>(Optional)</span>
              </p>
              <p class="codeDesc spaceBetween">
                <span class="noCoupon" v-if="!couponInfo.couponName">None</span>
                <span class="topicColor oneLine" v-else>{{couponInfo.couponName}}</span>
                <i class="icon icon-right-slide"></i>
              </p>
            </router-link>
          </div>
          <div class="total-detail">
            <div class="item">
              <label>Subtotal: </label>
              <span>${{ cartList.totalAmount }}</span>
            </div>
            <div class="item">
              <label>Shipping: </label>
              <span>$0.00</span>
            </div>

            <div class="item" v-if="couponInfo.couponName">
              <label style="width: 40%;">Coupon Amount: </label>
              <span style="width: 60%;color: #00c8a8;">
                -${{ couponAmount }}
              </span>
            </div>
            <div class="item">
              <label>Taxes: </label>
              <span>${{ objTax.tax }}</span>
            </div>
            <div class="item totalPrice">
              <label>Order Total: </label>
              <span class="price">${{ totalPrice }}</span>
            </div>
            <!-- 支付方式 -->
            <div class="pay-methods" ref="payMethods">
              <div class="title">Select Payment Methods</div>
              <div class="box-list">
                <!-- pp支付 -->
                <div :class="{item: true, rel: true, active: hasPayType}" @click="hasPayType = !hasPayType">
                  <p class="sub-title">PayPal</p>
                  <div class="right-block">
                    <img src="@/assets/images/shopping/paypal.png">
                  </div>
                  <i class="iconfont icon-xuanzhongjiaobiao"></i>
                </div>
              </div>
            </div>

            <!-- 优惠码 -->

            <!--  -->
            <div class="placeOrder" style='padding: 0 15px;'>
              <vava-button type="primary" style="width: 100%;margin-top: 20px;"
                @click="noPay"
                class="bg-gradient" round v-if="!(cartList.productList.length > 0 && hasAddress && hasPayType)">
                Place Order
              </vava-button>

              <vava-button v-else type="primary" style="width: 100%;margin-top: 20px;"
                class="bg-gradient" round  @click="pay" v-loading.fullscreen.lock="fullscreenLoading">
                Place Order
              </vava-button>
              <p class="tips">Please allow 3-5 business days for shipping.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ShoppingDetail from './cartList.vue'
  export default {
    components: { ShoppingDetail },
    computed: {
      isLogin () {
        // if (this.userList && this.userList.accountId !== undefined) {
        //   return true;
        // }
        return false
      },
      /**
       * [totalPrice 总价格]
       * @author luke 2018-12-13
       */
      totalPrice () {
        // let total = this.$common.toDecimal(Number(this.cartList.totalAmount) + this.objTax.tax - this.couponAmount);
        return '';
      },
      // 是否有地址
      hasAddress () {
        const selAddr = JSON.stringify(this.selAddress)
        return this.selAddress && selAddr !== '{}' && selAddr !== ''
      }
    },
    filter() {
    },
    // 定义变量
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
        selAddress: {}, // 选中的地址列表，当前购物选定的地址
        inAddressList: [], // 地址列表
        selectId: -1, // 登录状态下，从地址列表选择的地址的数据id
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
        showNum: 2, // 购物车默认显示的数量
        hasPayType: true,
        allowEdit: false, // 购物车列表是否允许编辑
        isLoadingAddr: false, // 是否正在加载地址
        cartList: {productList: []},
        couponInfo: {}
      }
    },
    beforeMount () {
      console.log(this.$utils)
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
    },
    mounted: async function () {
      // const query = this.$route.query
      // if (query && query.selectId) {
      //   this.selectId = Number(query.selectId)
      // }
      // await this.$store.dispatch('fetchIsLogin');
      // this.userAuthToken = this.$cookie.get('userAuthToken');
      // // 初始化方法
      // this.init();
      // this.setCoupon();
      // this.$cookie.delete('currentAddrId')
    },
    watch: {
      // cartList(val, oldVal) {
      //   if (oldVal.productList.length === 0 && val.productList.length > 0) {
      //     this.getOrderTax();
      //   } else if (oldVal.productList.length === 0 && val.productList.length === 0) {
      //     this.$router.push("/carts/")
      //   }
      // }
    },
    // 方法
    methods: {
      // 购物车数据变化时
      cartListChange(cartList) {
        if (JSON.stringify(this.couponInfo) !== '{}' && this.couponInfo.couponName) {
          this.setCoupon();
        } else {
          this.getOrderTax();
        }
      },
      // 跟改地址
      changeAddr(selAddress) {
        if (this.isLogin) {
          /**设置cookie记录当前使用的地址的id */
          if (selAddress && selAddress.id > -1) {
            this.$cookie.set('currentAddrId', selAddress.id, {expires: '1D'})
          }
          this.$router.push('/pay-addresslist')
        } else {
          const str = `/pay-addressdetail?email=${this.$route.query.email || ''}`
          this.$router.push(str)
        }
      },
      // 跳转到地址编辑页面
      goDetail() {
        if (!this.isLogin) {
          const str = `/pay-addressdetail?email=${this.$route.query.email || ''}`
          this.$router.push(str)
        } else {
          this.$router.push('/pay-addressdetail')
        }
      },
      /**
       * [refresh 刷新购物车]
       * @author luke 2018-12-07
       */
      refresh () {
        window.eventBus.$emit('refreshCart', true);
        this.loading = false;
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
        if (productList.length > 0 && JSON.stringify(this.selAddress) !== '{}' && JSON.stringify(this.selAddress) !== '') {
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
        }
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
            'accountEmail': this.$route.query.email || this.selAddress.email,
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
        // 先保存订单然后调用支付按钮
        let obj = {
          api: 'saveOrder',
          data: {
            'brand': 'rp',
            'lang': 'en',
            'orderCurrencyCode': 'US',
            'orderSource': 'RAVPower',
            'purchaseType': '1',
            'couponCode': this.couponInfo.couponCode || '',
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
            'variant': orderItemExList.colorId || '',
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
            'successUrl': url + '/pay-result-success/',
            'cancelUrl': url + '/pay-result-fail/',
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
        this.$store.dispatch('FETCH_POST_ALL', pObj).then(json => {
          let data = json.payload.data
          if (data) {
            // window.open(data.approvalUrl);
            pObj.orderNo = orderList.orderNo;
            // 20190123
            pObj.userEmail = this.email
            window.localStorage.setItem('paymentData', JSON.stringify(pObj));
            console.log(data.approvalUrl);
            window.location.href = data.approvalUrl;
          } else if (json.resCode === 40000) {
            this.fullscreenLoading = false
            this.$message.error(json.resDes)
          }
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
      },
      /**
       * [clearCarts 清空购物车]
       * @author luke 2019-01-03
       */
      async clearCarts () {
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
          this.$vueOnToast.pop('error', error)
        });
      },
      noPay() {
        // !(cartList.productList.length > 0 && hasAddress && hasPayType) {}
        if (!this.hasAddress) {
          this.$vueOnToast.pop('warning', 'Please add your shipping address.')
          if (document.documentElement) {
            document.documentElement.scrollTop = 0;
          } else {
            document.body.scrollTop = 0
          }
          return ;
        }
        // if (this.cartList.productList.length < 1) {
        //   this.$vueOnToast.pop('warning', 'Please add your shipping address.')
        //   return ;
        // }
        if (!this.hasPayType) {
          this.$vueOnToast.pop('warning', 'Please select payment methods.')
          if (document.documentElement) {
            document.documentElement.scrollTop = this.$refs.payMethods.offsetTop - 44;
          } else {
            document.body.scrollTop = this.$refs.payMethods.offsetTop - 44;
          }
          return ;
        }
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
        // place order 按钮
        this.$seoFn.onCheckoutOption(3, 'Pay');
        // 提交给pp支付并跳转
        if (orderList) this.palpal(orderList);
        // orderList.userAuthToken = this.userAuthToken;
        // window.localStorage.setItem('orderList', JSON.stringify(orderList));

      },
      /**
       * [init 初始化方法]
       * @author luke 2018-12-07
       * @return {[type]} [description]
       */
      async init () {
        await this.getInAddress();
        if (this.isLogin) {
          // 获取登录用户的地址
          this.email = this.userList.email;
        } else {
          this.email = this.$route.query.email;
        }
      },
      /**
       * [getInAddress 获取登陆]
       * @author luke 2018-12-15
       */
      async getInAddress () {
        if (this.isLogin) {
          this.isLoadingAddr = true
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
            if (Array.isArray(this.inAddressList) && this.inAddressList.length > 0) {
              // 已经有选中的地址则用选中的地址，没有选中的地址的话则选用1.默认地址 2.地址列表第一条
              if (Number(this.selectId) > -1) {
                const selectedAddr = this.inAddressList.filter(item => item.id === this.selectId)
                this.selAddress = selectedAddr[0]
              } else {
                // 获取默认地址作为当前购买使用的地址
                const defaultAddr = this.inAddressList.filter(item => item.active && item.active === 1)
                if (defaultAddr.length > 0) {
                  // 有默认地址
                  this.selAddress = defaultAddr[0]
                } else {
                  // 无默认地址， 默认选中第一个地址
                  this.selAddress = this.inAddressList[0];
                }
                this.selectId = this.selAddress.id;
              }
              // 获取税费
              this.selAddress.country = this.selAddress.countryCode;
              this.selAddress.region = this.selAddress.regionCode;
              this.selAddress.email = this.userList.email;
              ths.getOrderTax();
            }
            this.isLoadingAddr = false
          }).catch(error => {
            this.isLoadingAddr = false
            this.$vueOnToast.pop('error', error)
          });
        } else {

          let addrInfo = JSON.parse(localStorage.getItem('currentAddrInfo')) || {}
          // 获取税费
          addrInfo.countryCode = this.selAddress.country;
          addrInfo.regionCode = this.selAddress.region;
          addrInfo.email = this.email ? this.email : addrInfo.email;
          console.log(addrInfo)
          this.selAddress = addrInfo
          this.getOrderTax();
        }
      },
      /**
       * [getCart 获取购物车数据]
       * @author luke 2018-12-07
       */
      // getCart () {
      //   let obj = {
      //     api: 'getCartList',
      //     data: {
      //       token: this.userAuthToken
      //     }
      //   };
      //   this.$store.dispatch('fetchGetAll', obj).then(json => {
      //     this.cartList.productList = json.brandShopCartItems;
      //     this.cartList.totalAmount = json.brandShopCart[0].amountTotal;
      //     this.cartList.totalNum = json.brandShopCart[0].qtyTotal
      //     this.loading = false;
      //   }).catch(error => {
      //     this.$vueOnToast.pop('error', error)
      //   });
      // },
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
       * 选取code码之后进行新一轮价格计算
       * @author luke 2018-12-17
       */
      setCoupon () {
        if (JSON.stringify(this.couponInfo) !== '{}' && this.couponInfo.couponName) {
          this.couponName = this.couponInfo.couponName;
          this.directDiscount = this.couponInfo.directDiscount;
          this.promotionType = this.couponInfo.promotionType;
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
        }
      },
      isLength (val) {
        return val && val.length > 0
      }
    }
  }
</script>
<style lang='less' scoped>
  .pay {
    width: 100%;
    background: #F2f2f2;
    .pay-wrap{
      .title{
        background: #FFFFFF;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333333;
        padding: 0 15px;
        margin-top: 10px;
        border-bottom: 1px solid #f5f5f5;
      }
      .box-address {
        padding: 0px 0px 10px 0px;
        width: 100%;
        .pay-title{
          margin: 10px 15px;
          background-color: white;
          border: 1px dashed #E0E0E0;
          .infoA{
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #666666;
            line-height: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            }
          i {
            margin-right: 8px;
            font-size: 24px;
          }
        }
        .addrInfo {
          font-family: SFCompactDisplay-Regular;
          background: #FFFFFF;
          padding: 10px 15px;
          font-family: SFCompactDisplay-Regular;
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          position: relative;
          .name{
            font-size: 14px;
            color: #333333;
          }
          .desc{
            color: #666666;
            line-height: 20px;
          }
          .changeAddr{
            padding: 15px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            i{
              font-size: 18px;
              color: #999999;
            }
          }
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
              border: 1px solid #EEEEEE;
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
                  cursor: pointer;
                  display: inline-block;
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
                border-image: linear-gradient(125deg, #c8eb91 10%, #13bed3 100%);
                border-image-slice: 1;
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
              border-image: linear-gradient(125deg, #c8eb91 10%, #13bed3 100%);
              border-image-slice: 1;
            }
          }
        }
      }
      .pay-methods {
        margin-bottom: 10px;
        .box-list{
          .item{
            padding: 0 15px;
            height: 60px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            background-color: white;
            border: 1px solid #EEEEEE;
            margin-top: -1px;
            i.iconfont{
              position: absolute;
              bottom: -8px;
              right: -12px;
              font-size: 26px;
              color: #6446be;
              display: none;
            }
            .right-block{
              img{
                width: 96px;
              }
            }
            &.active{
              border: 1px solid #6446be;
              overflow: hidden;
              i.iconfont{
                display: block;
              }
            }
          }
        }
      }

      .slide-right {
        vertical-align: top;
        .title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .right-num {
            width: 20%;
            display: inline-block;
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #151515;
            text-align: right;
            line-height: 60px;
            span {
              font-size: 16px;
              color: #333333;
            }
          }
        }
        .total-detail {
          padding: 20px 0;
          font-size: 14px;
          color: #666666;
          .item {
            padding: 0 15px;
            label {
              width: 30%;
              text-align: left;
              font-size: 14px;
              color: #666666;
              display: inline-block;
              line-height: 18px
            }
            span{
              width: 70%;
              color: #333333;
              text-align: right;
              display: inline-block;
            }
            &.totalPrice{
              margin-top: 8px;
              .price{
                font-size: 20px;
                color: #333333;
                text-align: right;
              }
            }
          }
          .box-total {
            margin-top: 20px;
            label {
              font-size: 16px;
              color: #333333;
              width: 30%;
              text-align: left;
              display: inline-block;
            }
            .price {
              font-size: 24px;
              color: #333333;
              width: 70%;
              display: inline-block;
              text-align: right;
            }
          }
          .tips {
            margin-top: 10px;
            font-family: SFCompactDisplay-Regular;
            font-size: 12px;
            color: #999999;
            text-align: center;
          }
        }
        .coupon-box {
          margin-top: 10px;
          .coupon-box-wrap{
            width: 100%;
            padding: 0 15px;
            height: 40px;
            background-color: white;
            .box-title{
              strong{
                font-size: 16px;
                color: #333333;
                font-weight: normal;
              }
              span{
                font-size: 12px;
                color: #999999;
                text-align: right;
                margin-left: 9px;
                display: inline-block;
              }
            }
            .codeDesc{
              align-items: end;
              span{
                font-family: SFCompactDisplay-Regular;
                font-size: 12px;
                color: #666666;
                text-align: right;
                max-width: 120px;
              }
              .topicColor{
                color: #6446be;
              }
              i{
                font-size: 14px;
                color:  #999999;
                margin-left: 8px;
              }
            }
          }

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
  /*购物车导航面包屑*/
  .bread-self{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .item24{
      flex: 1;
      height: 24px;
      line-height: 24px;
      background-color:  #E0E0E0;
      position: relative;
      text-align: center;
      font-family: SFCompactDisplay-Regular;
      font-size: 12px;
      color: #666666;
      &.bg-gradient{
        color: white;
        background-color: @base-color;
        span{
          z-index: 2;
          border-left-color: @active-color;
        }
      }
      &.fail{
        background-color: #FF9B1F;
        color: white;
        span{
          z-index: 2;
          border-left-color: #FF9B1F;
        }
      }
      span{
        display: block;
        position: absolute;
        right: -13px;
        top: 0;
        border-left: 13px solid  #E0E0E0;
        border-top: 12px solid transparent; 
        border-right: 0 solid transparent; 
        border-bottom: 12px solid transparent; 
      }
      &:nth-last-child(1){
        span{
          display: none;
        }
      }
    }
  }
  .spaceBetween {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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

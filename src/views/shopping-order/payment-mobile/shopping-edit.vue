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
              <a class='infoA' @click="goDetail"><i class='el-icon-circle-plus-outline'></i>Add a new address</a>
            </div>
            <!-- 当前地址信息展示 -->
            <div class="addrInfo" v-else @click="goDetail">
              <p class="name">{{ selAddress.firstName }} {{ selAddress.lastName }}</p>
              <p>{{ selAddress.notificationEmail }}</p>
              <div class="desc">
                <p>{{ selAddress.address1 }} {{ selAddress.address2 }}</p>
                <p>{{ selAddress.city }}, {{ selAddress.regionCode }} {{ selAddress.postcode }}</p>
                <p>{{ selAddress.countryCode }}</p>
                <p>Phone: {{ selAddress.telephone }}</p>
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
              <span>{{ shoppingCart.totalNum }}</span> item{{ shoppingCart.totalNum > 1 ? 's' : ''}}
            </div>
          </div>
          <!-- 产品列表 -->
          <shopping-detail :order-taxes="orderTaxes" ></shopping-detail>
          <!-- 优惠码 -->
          <!-- <div class="coupon-box" v-if="false">
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
          </div> -->
          <div class="total-detail">
            <div class="item">
              <label>Subtotal: </label>
              <span>${{ shoppingCart.totalAmount }}</span>
            </div>
            <div class="item">
              <label>Shipping: </label>
              <span>$0.00</span>
            </div>

            <!-- <div class="item" v-if="couponInfo.couponName">
              <label style="width: 40%;">Coupon Amount: </label>
              <span style="width: 60%;color: #00c8a8;">
                -${{ couponAmount }}
              </span>
            </div> -->

            <div class="item">
              <label>Taxes: </label>
              <span>${{ orderTaxes }}</span>
            </div>
            <div class="item totalPrice">
              <label>Order Total: </label>
              <span class="price">${{ totalAmount }}</span>
            </div>
            <!-- 支付方式 -->
            <div class="pay-methods" ref="payMethods">
              <div class="title">Select Payment Methods</div>
              <div class="box-list">
                <!-- pp支付 -->
                <div :class="{item: true, rel: true, active: true}" @click="isGoPay = !isGoPay">
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
            <div class="placeOrder" style='padding: 0 15px; text-align: center;'>
              <!-- <vava-button type="primary" style="width: 100%;margin-top: 20px;" class="bg-gradient" round  :disable="!isActive" @click="saveOrder" v-loading.fullscreen.lock="fullscreenLoading">
                Place Order
              </vava-button> -->
              <vava-button :disable="!isGoPay" @click="saveOrder" v-loading.fullscreen.lock="fullscreenLoading">PLACE ORDER</vava-button>
              <p class="tips">*Currently we only support payment via PayPal, but will add more methods in the future.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { invokeGetShoppingCart } from '@/api/invoke.js'
  import ShoppingDetail from './cartList.vue'
  export default {
    components: { ShoppingDetail },
    computed: {
      shoppingCart () { // 购物车列表(最终需要支付的)
        return this.$utils.calculationCart(this.$store.state.shoppingCart.productList, this.$store.state.shoppingCart.shoppingCartId, true)
      },
      totalAmount () { // 计算结算总金额 = 订单金额 + 税费 - 优惠码优惠金额
        return this.$utils.toDecimal(Number(this.shoppingCart.totalAmount) + this.orderTaxes - this.couponAmount)
      },
      // 是否有地址
      hasAddress () {
        const selAddr = JSON.stringify(this.selAddress)
        return this.selAddress && selAddr !== '{}' && selAddr !== '' && this.selAddress.firstName
      }
    },
    // 定义变量
    data () {
      return {
        selAddressUuid: '',
        couponInfo: {},
        couponAmount: 0, // 优惠码优惠金额
        orderTaxes: 0, // 订单税费
        selAddress: {}, // 选中的地址列表
        inAddressList: [], // 登陆状态下的地址列表
        isGoPay: false, // 是否可以下订单
        fullscreenLoading: false,
        isLogin: false, // 是否登陆
      }
    },
    beforeMount () {
      let accountName = ''
      if (typeof window !== 'undefined' && window && window.sessionStorage) {
        accountName = sessionStorage.getItem('accountName')
      }
      this.selAddress.notificationEmail = this.$route.query.email || (this.shoppingCart && this.shoppingCart.payEmail) || (this.$store.state.accountData && this.$store.state.accountData.emailAddress) || accountName || ''
      
      // 如果登陆就获取地址列表 未登陆直接显示地址编辑表单
      if (this.$cookies.get('token')) {
         this.isLogin = true
         this.getInAddress()
      } else {
        this.selAddress = this.$store.state.selAddress
        if (this.hasAddress) {
          this.getOrderTax()
        }
      }
      const query = this.$route.query
      if (query && query.addressUuid) {
        this.selAddressUuid = query.addressUuid
      }
    },
    // 方法
    methods: {
      getInAddress (isNoDefault) { // 获取地址列表 只有在登陆状态下 进入页面的时候调用
        this.$store.dispatch('postFetch', {api: 'findAddressInfoListVo', data: {pageNo: 1, pageSize: 20, condition: {}}}).then(data => {
          this.inAddressList = data.records
          this.$store.commit('setInAddressList', this.inAddressList) // 保存地址列表
          if (this.selAddressUuid) {
            const selectedAddr = this.inAddressList.filter(item => item.addressUuid === this.selAddressUuid)
            this.selAddress = selectedAddr[0]
            this.$store.commit('setSelAddress', this.selAddress) // 保存选中的地址
            this.getOrderTax() // 根据地址获取税费
          } else {
            if (!isNoDefault && this.inAddressList && this.inAddressList.length > 0) {
              this.selAddress = this.inAddressList[0] // 默认选中第一个地址
              this.$store.commit('setSelAddress', this.selAddress) // 保存选中的地址
              this.getOrderTax() // 根据地址获取税费
            }
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      // 跳转到地址编辑页面
      goDetail () {
        if (this.inAddressList && this.inAddressList.length > 0) {
          this.$router.push('/pay-addresslist')
        } else {
          if (!this.isLogin) {
            const str = `/pay-addressdetail?email=${this.$route.query.email || ''}`
            this.$router.push(str)
          } else {
            this.$router.push('/pay-addressdetail')
          }
        }
      },
      getOrderTax () { // 根据地址获取税费
        let taxesParam = {
          orderAddressBo: this.selAddress, // 当前选择的地址
          cartInfoBos: this.shoppingCart.productList, // 商品列表
          email: this.selAddress.notificationEmail, // 账户邮箱（地址编辑里面的）
          shopCartId: this.shoppingCart.shoppingCartId, // 购物车ID
          useLogin: !!this.$cookies.get('token'), // 是否登陆
          paymentMethod: 0,
          source: 0
        }
        this.$store.dispatch('postFetch', {api: 'getOrderInfoPriceVo', data: taxesParam}).then(data => {
          this.isGoPay = true // 可以支付了
          this.orderTaxes = data.amount // 订单税费
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      // 下单
      saveOrder (shoppingData) { // shoppingData 下单结算商品数据及总金额等
        this.fullscreenLoading = true
        let orderData = {
          orderAddressBo: this.selAddress, // 当前选择的地址
          cartInfoBos: this.shoppingCart.productList, // 商品列表
          email: this.selAddress.notificationEmail, // 账户邮箱（地址编辑里面的）
          shopCartId: this.shoppingCart.shoppingCartId, // 购物车ID
          useLogin: !!this.$cookies.get('token'), // 是否登陆购买
          paymentMethod: 1, // 支付方式(1-paypal)
          source: Number(this.$store.state.mediaDevices) // 下单来源(0-pc 1-h5)
        }
        console.log('下单参数：', shoppingData)
        // 用户下单
        this.$store.dispatch('postFetch', {api: 'submitOrderInfo', data: orderData}).then(data => { // 调用下单接口
          // this.$seoFn.onCheckoutOption(3, 'Pay')
          this.payPalpal(data.orderNo, orderData.email) // 下单成功后调用PP支付
        }).catch(error => {
          this.fullscreenLoading = false
          this.$utils.showErrorMes(this, error)
        })
      },
      clearAddr () {
        this.inAddressList = []
        this.selAddress = {}
        this.selAddressUuid = ''
      },
      clearCarts () { // 清空购物车 直接刷新购物车列表
        invokeGetShoppingCart(this)
      },
      payPalpal (orderNo, email) { // 提交给pp支付
        this.$store.dispatch('postFetch', {api: 'paypalOrder', data: { orderNo, email }}).then(data => {
          this.clearCarts() // 清空购物车
          this.clearAddr()
          window.location.href = data.successUrl
        }).catch(error => {
          this.$message.error(error)
        })
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

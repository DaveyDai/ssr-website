<template>
  <div class="shopping-order-pay center-main" v-loading.lock="fullscreenLoading">
    <shopping-step :active="2" class="shopping-step"></shopping-step>
    <div class="order-pay-edit">
      <div class="slide-left ">
        <!-- 第一步 地址 -->
        <div class="box-address">
          <div class="title"  v-bind:class="{ 'active' : isGoPay }">1.Shipping Address</div>
          <!-- 地址选择好之后折叠内容展示 -->
          <div class="detail" v-if="isGoPay">
            <p>{{ selAddress.firstName }} {{ selAddress.lastName }}</p>
            <p>{{ selAddress.notificationEmail }}</p>
            <div class="desc">
              <p>{{ selAddress.address1 }} {{ selAddress.address2 }}</p>
              <p> {{ selAddress.city }}, {{ selAddress.regionCode }} {{ selAddress.postcode }}</p>
              <p> {{ selAddress.countryCode }}</p>
              <p> Phone: {{selAddress.telephone}}</p>
            </div>
          </div>
        </div>
        <!-- 第二步  2.Payment Methods-->
        <div class="pay-methods">
          <div class="title"  v-bind:class="{ 'bg-ddd' : !isGoPay }" >2.Payment Methods</div>
          <div class="box-list" v-if="isGoPay">
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
      <order-summary class="order-pay-summary" :isActive="isGoPay" isPay @click="saveOrder" :subtotal="subtotal" :order-taxes="orderTaxes" :order-total="orderTotal" :product-list="productList" ></order-summary>
    </div>
  </div>
</template>
<script>
  import ShippingAddress  from './shipping-address.vue'
  import OrderSummary from './pay-order-summary.vue'
  import ShoppingStep from './shopping-step.vue'
  export default {
    components: { ShoppingStep, ShippingAddress, OrderSummary },
    data () {
      return {
        subtotal: 0, // 订单总额小计
        orderTotal: 0, // 订单总金额(付款的最终价格)
        orderTaxes: 0, // 订单税费
        productList: [], // 产品列表
        selAddress: {}, // 选中的地址列表
        isGoPay: true, // 是否可以下订单
        fullscreenLoading: false
      }
    },
    beforeMount () {
      // let query = this.$router.query
      // this.getOrderDetail(query.orderNo, query.email)
      this.getOrderDetail('10111129591347557171200', '519678181@qq.com')
    },
    methods: {
      getOrderDetail (orderNo, email) {
        let orderData = {
          orderNo: orderNo,
          email: email
        }
        this.$store.dispatch('postFetch', {api: 'getOrderDetail', data: orderData}).then(data => { // 调用下单接口
          this.subtotal = data.orderDetailVo.subtotalPriceTotal
          this.orderTotal = data.orderDetailVo.orderTotal
          this.orderTaxes = data.orderDetailVo.taxPriceTotal
          this.productList = data.orderItemVos
          this.selAddress = data.orderAddressBo
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      // 下单
      saveOrder () { // shoppingData 下单结算商品数据及总金额等
        this.fullscreenLoading = true
        let orderData = {
          orderAddressBo: this.selAddress, // 当前选择的地址
          cartInfoBos: this.productList, // 商品列表
          email: this.selAddress.notificationEmail, // 账户邮箱（地址编辑里面的）
          useLogin: !!this.$cookies.get('token'), // 是否登陆购买
          paymentMethod: 1, // 支付方式(1-paypal)
          source: Number(this.$store.state.mediaDevices) // 下单来源(0-pc 1-h5)
        }
        // 用户下单
        this.$store.dispatch('postFetch', {api: 'submitOrderInfo', data: orderData}).then(data => { // 调用下单接口
          this.payPalpal(data.orderNo, orderData.email) // 下单成功后调用PP支付
        }).catch(error => {
          this.fullscreenLoading = false
          this.$utils.showErrorMes(this, error)
        })
      },
      payPalpal (orderNo, email) { // 提交给pp支付
        this.$store.dispatch('postFetch', {api: 'paypalOrder', data: { orderNo, email }}).then(data => {
          window.location.href = data.successUrl
        }).catch(error => {
          this.$message.error(error)
        })
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

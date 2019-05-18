<template>
  <div class="pay-reslut">
    <!-- PC端支付结果 -->
    <div class="payment-result" v-if="!$store.state.mediaDevices" v-loading="loading">
      <shopping-step :active="orderStatus?3:4" class="shopping-step"></shopping-step>
      <!-- 正文提示 -->
      <div class="box-main center-main">
        <div v-if="orderStatus">
          <i class="el-icon-success icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div class="result-buttons">
            <vava-button class="pay-resullt-button" noActive @click="continueBuy">Continue to Buy</vava-button>
            <vava-button class="pay-resullt-button" @click="toOrderDetails">Order Details</vava-button>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-if="!orderStatus">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <div class="result-buttons">
            <vava-button class="pay-resullt-button" noActive @click="toOrderDetails">Order Details</vava-button>
            <vava-button class="pay-resullt-button" @click="getPayOrder">Try Again</vava-button>
          </div>
          <p class="tip">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
        </div>
      </div>
    </div>
    <!-- 移动端支付结果 -->
    <div class="payment-result-mobile" v-else v-loading="loading">
      <!-- 头部 -->
      <div class="bread-self">
        <!-- class： bg-gradient(成功)  fail(失败) -->
        <div class="item24 bg-gradient">
          <p>Order Info<span></span></p>
        </div>
        <div :class="{'item24': true, 'fail': !orderStatus, 'bg-gradient': orderStatus}">
          <p>Payment<span></span></p>
        </div>
        <div :class="{'item24': true, 'bg-gradient': orderStatus}">
          <p>Confirmation<span></span></p>
        </div>
      </div>
      <!-- 正文提示 -->
      <div class="box-main">
        <div v-if="orderStatus" v-show="!loading">
          <i class="el-icon-success icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div class='operateWrap'>
            <vava-button class="pay-resullt-button" noActive @click="continueBuy">Continue to Buy</vava-button>
            <vava-button class="pay-resullt-button" @click="toOrderDetails">Order Details</vava-button>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-else v-show="!loading">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <p class="desc">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
          <div class='operateWrap'>
            <vava-button class="pay-resullt-button" noActive @click="toOrderDetails">Order Details</vava-button>
            <vava-button class="pay-resullt-button" @click="getPayOrder">Try Again</vava-button>
          </div>
        </div>
      </div>
      <!-- <el-dialog title="Select Payment Methods" :visible.sync="dialogTableVisible" v-loading="isLoadingPay">
        <div class='pay-type'>
          <div :class="{'pay-type-item': true, 'active': selectPay}" @click="repay">
            <p class="sub-title">PayPal</p>
            <div class="right-block">
              <img src="@/assets/images/shopping/paypal.png">
            </div>
          </div>
        </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
  import ShoppingStep from './payment-pc/shopping-step.vue'
  export default {
    components: { ShoppingStep },
    computed: {
    },
    // 定义变量
    data () {
      return {
        orderStatus: false, // 订单支付结果状态 false支付失败 true支付成功
        loading: false,
        ordderDetails: {
          orderNo: '', // 订单号
          email: '' // 邮箱
        }
      }
    },
    // 引入组件
    props: {},
    mounted () {
      this.ordderDetails = {orderNo: this.$route.query.order_no, email: this.$route.query.email}
      // 根据订单号查询支付结果
      this.getPayResultStatus()
    },
    methods: {
      getPayResultStatus () { // 查询支付结果
        this.loading = true
        this.$store.dispatch('postFetch', {api: 'checkCompletePay', data: this.ordderDetails}).then(data => {
          this.orderStatus = data.paySuccess
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$utils.showErrorMes(this, error)
        })
      },
      getPayOrder (orderNo, email) { // 提交给pp支付
        this.loading = true
        this.$store.dispatch('postFetch', {api: 'paypalOrder', data: { orderNo: this.ordderDetails.orderNo, email: this.ordderDetails.email }}).then(data => {
          window.location.href = data.successUrl
        }).catch(error => {
          this.loading = false
          this.$utils.showErrorMes(this, error)
        })
      },
      toOrderDetails () { // 跳转到订单详情
        this.$router.push({path: '/view-details', query: this.ordderDetails})
      },
      continueBuy () {
        this.$router.push('/')
      }
    }
  }
</script>
<style lang='less' scoped >
  .payment-result{
    padding-bottom: 30px;
    background: #FAFAFA;
    min-height: 500px;
    .shopping-step{
      background-color: #FFF;
    }
    .box-main{
      text-align: center;
      margin-top: 80px;
      .icon {
        width: 64px;
        color: #14cd7c;
        font-size: 64px;
      }
      .icon-warn {
        color: #FF9500;
        width: 64px;
        background-color: #FFF;
        font-size: 64px;
      }
      .title{
        font-family: SFCompactDisplay-Medium;
        font-size: 20px;
        color: #333333;
        text-align: center;
        margin-bottom: 4px;
        margin-top: 4px;
        margin-bottom: 15px;
      }
      .desc {
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #333333;
        text-align: center;
      }
      .btnWrap{
        border-radius: 20px;
        width: 153px;
        height: 38px;
        padding: 1px;
        margin: 0 auto;
        box-sizing: border-box;
        display: inline-block;
        .btn-buy {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: #fff;
        }
      }
      .tip{
        font-family: AvenirNext-Medium;
        font-size: 16px;
        color: #666666;
        margin-top: 24px;
      }
    }
    .result-buttons{
      margin-top: 30px;
      .pay-resullt-button{
        width: 15.6vw;
        min-width: 150px;
        min-height: 35px;
        &:nth-child(1){
          margin-right: 20px;
        }
      }
    }

  }
</style>
<style lang='less' scoped>
  .payment-result-mobile{
    padding: 0 0px 140px 0px;
    background: #FAFAFA;
    min-height: 500px;
    .box-main{
      text-align: center;
      margin-top: 90px;
      .icon {
        width: 62px;
        color: #14cd7c;
        font-size: 62px;
      }
      .icon-warn {
        color: #FF9500;
        width: 62px;
        font-size: 62px;
      }
      .title {
        font-family: SFCompactDisplay-Medium;
        font-size: 20px;
        color: #333333;
        text-align: center;
        margin-top: 16px;
        margin-bottom: 10px;
      }
      .desc {
        font-family: SFCompactDisplay-Regular;
        font-size: 14px;
        color: #999999;
        text-align: center;
        padding: 0 36px;
      }
      .operateWrap{
        margin-top: 200px;
        padding: 0 28px;
        .pay-resullt-button{
          width: 90%;
          max-width: 400px;
          &:nth-child(1){
            margin-bottom: 20px;
          }
        }
      }
    }
    .pay-type{
      .pay-type-item {
        padding: 0 15px;
        height: 40px;
        margin: 15px 0 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #E0E0E0;
        &.active{
          border-color: #00C1D6; 
        }
        .right-block{
          img{
            width: 64px;
          }
        }
      }
    }
  }
</style>
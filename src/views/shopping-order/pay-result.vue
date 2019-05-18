<template>
  <div class="pay-reslut">
    <!-- PC端支付结果 -->
    <div class="payment-result" v-if="!$store.state.mediaDevices" v-loading="loading">
      <shopping-step :active="3" class="shopping-step"></shopping-step>
      <!-- 正文提示 -->
      <div class="box-main center-main">
        <div v-if="orderStatus" v-show="!loading">
          <i class="el-icon-success icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div class="result-buttons">
            <vava-button class="pay-resullt-button" noActive>Continue to Buy</vava-button>
            <vava-button class="pay-resullt-button">Order Details</vava-button>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-if="!orderStatus" v-show="!loading">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <div class="result-buttons">
            <vava-button class="pay-resullt-button" noActive>Continue to Buy</vava-button>
            <vava-button class="pay-resullt-button">Order Details</vava-button>
          </div>
          <p class="tip">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
        </div>
      </div>
      <img :src="url" style="width:1px;height: 1px;">
    </div>
    <!-- 移动端支付结果 -->
    <div class="payment-result-mobile" v-else v-loading="loading">
      <!-- 头部 -->
      <div class="bread-self" v-if="finishLoading">
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
      <div class="box-main" v-if="finishLoading">
        <div v-if="orderStatus" v-show="!loading">
          <i class="el-icon-circle-check icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div class='operateWrap'>
            <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
              <vava-button class="bg40 bg-gradient" round  style="width: 100%;margin-bottom: 16px;">Order Details</vava-button>
            </a>
            <div class="btnWrap">
              <a href="/c/wireless-chargers.html" alt="Wireless Chargers">
                <vava-button class="btn-buy btn40" round>Continue to Buy</vava-button>
              </a>
            </div>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-if="!orderStatus" v-show="!loading">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <p class="desc">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
          <div class='operateWrap'>
            <div class="btnWrap">
              <vava-button class="bg40 bg-gradient" round @click="dialogTableVisible = true" style="width: 100%;margin-bottom: 16px;">Try Again</vava-button>
              <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
                <vava-button class="btn-buy btn40" round>Order Details</vava-button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="Select Payment Methods" :visible.sync="dialogTableVisible" v-loading="isLoadingPay">
        <div class='pay-type'>
          <div :class="{'pay-type-item': true, 'active': selectPay}" @click="repay">
            <p class="sub-title">PayPal</p>
            <div class="right-block">
              <img src="@/assets/images/shopping/paypal.png">
            </div>
          </div>
        </div>
      </el-dialog>
      <img :src="url" style="width:1px;height: 1px;">
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
        orderNo: '' // 订单号
      }
    },
    // 引入组件
    props: {},
    mounted () {
      // 根据订单号查询支付结果
    },
    methods: {
      getPayResultStatus () { // 查询支付结果

      },
      getPayOrder () { // 失败情况下 获取订单号继续支付

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
        background-color: #FFF;
        color: #00C1D4;
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
    margin-top: 44px;
    padding: 0 0px 140px 0px;
    background: #FAFAFA;
    min-height: 500px;
    .box-main{
      text-align: center;
      margin-top: 90px;
      .icon {
        width: 62px;
        color: #00C1D6;
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
        .btnWrap{
          width: 100%;
          .btn-buy {
            width: 100%;
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
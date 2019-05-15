<template>
  <div class="support-feedback">
    <div class="support-feedback-home">
      <img class="support-feedback-banner" src="/static/website-imgages/support/User Feedback.jpg" alt="">
      <div class="support-feedback-submit" v-show="(!accountData.emailAddress&&isShowView) || (!orderInfo.productTitle)">
        <div v-show="!accountData.emailAddress&&isShowView" class="feedback-sign-in">
          <vava-button class="feedback-submit-button" @click="loginRoute">SIGN IN</vava-button>
          <p>To tell us about the problem with a product</p>
          <div class="feedback-submit-line"><span></span><p>or</p><span></span></div>
        </div>
        <div class="feedback-input-order" v-show="!orderInfo.productTitle">
          <vava-input v-model="feedbackNumber" class="feedback-input" :readonly="$bar?$bar.show:false" :error="isNotExist"></vava-input>
          <p v-show="!isNotExist">Enter the order number of a product</p>
          <p v-show="isNotExist" class="feedback-submit-error">{{notExistMessage}}</p>
          <vava-button class="feedback-submit-button" @click="submitfeedback">ENTER</vava-button>
        </div>
      </div>
    </div>
    <feedback-success v-if="feedbackSuccess" :feedback-data="orderInfo" @click="changeItem"></feedback-success>
  </div>
</template>

<script>
  import feedbackSuccess from './feedback-success.vue'
  export default {
    components: { feedbackSuccess },
    data () {
      return {
        feedbackNumber: '', // 111-2195004-7470646
        feedbackSuccess: false,
        isNotExist: false, // 订单错误状态是否显示
        notExistMessage: 'Sorry, this order number does not exist, please try again.',
        isShowView: false, // 处理登录状态下刷新页面显示变动问题
        orderInfo: {}
      }
    },
    computed: {
      accountData () {
        return this.$store.state.accountData
      }
    },
    beforeMount () {
      if (this.accountData.emailAddress) { // 如果已经登录直接显示反馈信息
        this.feedbackSuccess = true
      } else if (this.$route.query.redirect === '/login' || this.$cookies.get('token')) { // 判断是否是重新登录跳转过来的 或者已经登录刷新页面
        this.fecthAccount(true)
      } else {
        this.isShowView = true
      }
    },
    methods: {
      submitfeedback () {
        if (!this.feedbackNumber) {
          this.isNotExist = false
          this.$utils.message('Please enter the order number of a product.')
          return
        }
        if (this.$bar.show) return // 防止重复点击提交
        this.$bar.start()
        this.$store.dispatch('getByUrl', {api: 'queryErpOrder', data: this.feedbackNumber}).then(data => { // 先查询erp是否有该订单
          this.isNotExist = false
          this.feedbackSuccess = true
          data.orderNumber = this.feedbackNumber
          data.purchasedDate = data.purchasedDate ? this.$utils.formatDate(new Date(data.purchasedDate.replace(/\-/g, '/')), 'MM/dd/yyyy') : ''
          this.orderInfo = data
          this.$bar.finish()
        }).catch(error => {
          this.notExistMessage = error && error.code === 14101 ? error.message : 'Sorry, this order number does not exist, please try again.'
          this.isNotExist = true
          this.$bar.finish()
        })
      },
      loginRoute () {
        this.$cookies.get('token') ? this.fecthAccount() : this.$router.push('/login?redirect=/support/feedback')
      },
      fecthAccount (isLogin) {
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'getMemberInfo'}).then(data => {
          this.$bar.finish()
          this.$store.commit('setAccountData', JSON.parse(JSON.stringify(data)))
          this.feedbackSuccess = this.isShowView = true
        }).catch(error => {
          this.$bar.finish()
          if ((error.code === 14006 || error.code === 14000) && !isLogin) {
            this.$utils.message('Plases login')
            this.$router.push('/login')
            this.$cookies.set('token', '')
          }
          this.isShowView = true
        })
      },
      changeItem () {
        this.orderInfo = {}
      }
    }
  }
</script>
<style lang="less" scoped>
  .support-feedback{
    width: 100%;
    font-size: 0;
    .support-feedback-banner{
      width: 100%;
    }
    .support-feedback-submit{
      width: 100%;
      padding: 6.25vw 3vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .feedback-sign-in, .feedback-input-order{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .feedback-submit-line{
        width: 45.1vw;
        min-width: 280px;
        height: 1vw;
        margin: 1.625vw 0 3.125vw 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        p{margin: 0;}
        span{
          display: inline-block;
          width: 45%;
          height: 0.052vw;
          background-color: #e2e2e2;
        }
      }
      p{
        font-size: 1.56vw;
        color: @base-icon-color;
        text-align: center;
        margin: 1.5vw 0;
      }
      p.feedback-submit-error{
        color: #D27460;
      }
      .feedback-input{
        width: 20.8vw;
        min-width: 250px;
        min-height: 35px;
        input{min-height: 35px;text-align: center;}
      }
    }
  }
  @media (max-width: 1250px) {
    .support-feedback{
      .support-feedback-submit .feedback-submit-line{
        span{height: 1px;}
      }
    }
  }
  @media (max-width: 800px) {
    .support-feedback{
      .support-feedback-submit{
        padding: 7.55vw 3vw;
        p{font-size: 12.5px;margin: 15px 0;}
        .feedback-submit-line{
          margin: 15px 0 25px 0;
          p{font-size: 12.5px;}
        }
      }
    }
  }
  @media (max-width: 600px) {
    .support-feedback{
      .support-feedback-submit{
        padding: 7.55vw 3vw;
        p{font-size: 12px;}
        .feedback-submit-line p{font-size: 12px;}
      }
    }
  }
</style>


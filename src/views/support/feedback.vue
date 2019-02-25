<template>
  <div class="support-feedback">
    <div class="support-feedback-home">
      <img class="support-feedback-banner" src="/static/website-imgages/support/User Feedback.jpg" alt="">
      <div class="support-feedback-submit">
        <vava-button class="feedback-submit-button" @click="submitfeedback">SIGN IN</vava-button>
        <p>To tell us about the problem with a product</p>
        <div class="feedback-submit-line"><span></span><p>or</p><span></span></div>
        <vava-input v-model="feedbackNumber" class="feedback-input"></vava-input>
        <p>Enter the serial number of a product</p>
        <vava-button class="feedback-submit-button" @click="submitfeedback">ENTER</vava-button>
      </div>
    </div>
    <feedback-success v-if="feedbackSuccess"></feedback-success>
  </div>
</template>

<script>
  import feedbackSuccess from './feedback-success.vue'
  export default {
    components: { feedbackSuccess },
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('support', route.params.pId)
      // return store.dispatch('queryCategory', {api: 'signIn', cId: route.params.cId})
    },
    data () {
      return {
        feedbackNumber: '12456765324321',
        feedbackSuccess: false
      }
    },
    methods: {
      submitfeedback () {
        this.$bar.start()
        setTimeout(() => {
          this.feedbackSuccess = true
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        }, 200)
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


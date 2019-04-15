<template>
  <div class="vava-subscribe">
    <h5>SUBSCRIBE TO VAVA</h5>
    <p>Get the latest VAVA news, giveaways, and helpful tips!</p>
    <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" @click="enterEmail" v-model="subscribeParam.sendToEmail" maxlength="200"></vava-email-input>
    <div class="subscribe-madia-icon">
      <i @click="openMedia('https://www.facebook.com/letsvava')" class="icon icon-facebook"></i>
      <i @click="openMedia('https://twitter.com/letsvava')" class="icon icon-twitter"></i>
      <i @click="openMedia('https://www.instagram.com/letsvava')" class="icon icon-instagram"></i>
      <!-- <i @click="openMedia('https://www.youtube.com/channel/UCQHsAs7QINSKNqOS5DtrcXQ')" class="icon icon-youtube"></i> -->
      <!-- <i class="icon icon-facebook"></i><i class="icon icon-twitter"></i><i class="icon icon-instagram"></i> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'VavaSubscribe',
    componentName: 'VavaSubscribe',
    data () {
      return {
        subscribeParam: {
          sendToEmail: '',
          type: 3,
          sourceCode: this.$route.meta.sourceCode || 'SUB_OTHER_SOURCE'
        }
      }
    },
    methods: {
      enterEmail () {
        if (!this.$utils.trim(this.subscribeParam.sendToEmail)) {
          this.$utils.message('Please enter your Email address.')
          return
        }
        if (!this.$utils.validateEmail(this.subscribeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        this.$store.dispatch('emailSubscribe', this.subscribeParam).then(data => {
          this.$utils.message('Subscribe Success.')
          this.subscribeParam.sendToEmail = ''
        }).catch(error => {
          this.$utils.message(error.message)
        })
      },
      openMedia (path) {
        window.open(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-subscribe{
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5.2vw 0;
    color: @base-font-color;
    background: url(/src/assets/images/subscribe-back.jpg) no-repeat;
    background-size: 100% 100%;
    h5{font-size: 2vw;margin-bottom: 0.2vw;}
    p{font-size: 1.3vw;margin: 1.6vw 0;padding: 0 10px; text-align: center;}
    .subscribe-input{
      width: 21vw;
      height: 3.125vw;
      input{
        font-size: 1.3vw;
        background-color: #FFF;
        color: @base-font-color;
        padding-right: 20%;
      }
      input::placeholder{color: #999;font-size: 1vw;}
      .vava-email-input-icon{
        width: 19%;
        .icon{color: @base-font-color;}
      }
    }
    .subscribe-madia-icon{
      margin-top: 1.7vw;
      padding-top: 10px;
      i{margin: 0 1.75vw;font-size: 1.7vw;cursor: pointer;color: @base-font-color;}
      i:hover{color: @base-button-back;}
    }
  }
  @media (max-width: 1400px) {
    .vava-subscribe{
      .subscribe-input{height: 43px;}
      .subscribe-madia-icon{
        i{font-size: 26px;}
      }
    }
  }
  @media (max-width: 1124px) {
    .vava-subscribe{
      h5{font-size: 22px;margin-bottom: 3px;}
      p{font-size: 14px;margin: 18px 0;}
      .subscribe-input{
        input{font-size: 16px;}
        input::placeholder{font-size: 15px;}
      }
    }
  }
  @media (max-width: 500px) {
    .vava-subscribe{
      h5{font-size: 20px;}
      p{font-size: 12px;}
      .subscribe-input{
        height: 40px;
        // input{padding-right: 13%;}
        // input::placeholder{font-size: 14px;}
        .vava-common-input-icon{
          width: 12%;
        }
      }
      .subscribe-madia-icon{
        margin: 20px 0;
        i{margin: 0 15px;}
      }
    }
  }
  @media (max-width: 375px) {
    .vava-subscribe{
      .subscribe-input{
        width: 70%;
        input{padding-right: 13%;}
        // input::placeholder{font-size: 12px;}
        .vava-common-input-icon{
          width: 12%;
        }
      }
    }
  }
</style>

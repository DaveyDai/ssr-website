<template>
  <div class="forgot-password">
    <h5>Forgot Password ?</h5>
    <p v-show="!verificationShow" class="forgot-password-message">Enter your email below and we will send you reset instructions via email.</p>
    <vava-input v-show="!verificationShow" v-model="sendCodeParam.sendToEmail" class="forgot-password-input" placeholder="Email Address" maxlength="200"></vava-input>
    <!-- 邮箱验证码输入框 -->
    <div v-if="verificationShow" class="create-input-email">
      <p>Please enter the code from the email we just sent you below:</p>
      <input v-model="createPram.verificationCode" maxlength="6" type="text">
      <count-time ref="countTime" @click="sendCode"></count-time>
    </div>
    <!-- 密码 -->
    <vava-input v-if="verificationShow" v-model="createPram.password" type="password" maxlength="50" class="forgot-password-input" placeholder="Password"></vava-input>
    <!-- 再次输入密码 -->
    <vava-input v-if="verificationShow" v-model="confirmPassword" type="password" maxlength="50" class="forgot-password-input" style="margin-top: 0;" placeholder="Confirm Password"></vava-input>
    <vava-button v-if="!verificationShow" @click="sendCode">NEXT</vava-button>
    <vava-button v-if="verificationShow" @click="forgotPassword">RESET MY PASSWORD</vava-button>
    <p class="forgotpaw-option-account">Or <span @click="routerLink('/create-account')">Create a new account</span>  |  <span @click="routerLink('/login')">Sign in</span>?</p>
  </div>
</template>

<script>
  import CountTime from '@/components/count-time.vue'
  export default {
    components: { CountTime },
    data () {
      return {
        verificationShow: false,
        sendCodeParam: {
          sendToEmail: '',
          type: 2
        },
        createPram: {
          emailAddress: '', // 邮箱地址
          verificationCode: '', // 验证码
          password: '', // 用户密码
          type: 0
        },
        confirmPassword: ''
      }
    },
    methods: {
      sendCode () {
        if (!this.$utils.validateEmail(this.sendCodeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'sendEmail', data: this.sendCodeParam}).then(data => {
          this.$bar.finish()
          this.verificationShow = true
          this.$nextTick(() => {
            this.$refs.countTime.startTimeOut()
          })
        }).catch(error => {
          this.$utils.message(error.status && error.status === 403 ? error.message : 'The system is busy. Please try to refresh it.')
          this.$bar.finish()
        })
      },
      forgotPassword () {
        if (!this.$utils.validateEmail(this.sendCodeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        if (!this.$utils.trim(this.createPram.password)) {
          this.$utils.message('The password is incorrect.')
          return
        }
        if (this.$utils.trim(this.createPram.password).length < 6) {
          this.$utils.message('Password must not be less than 6 characters.')
          return
        }
        if (this.$utils.trim(this.createPram.password) !== this.$utils.trim(this.confirmPassword)) {
          this.$utils.message('The Confirm Password is incorrect.')
          return
        }
        if (!this.$utils.trim(this.createPram.verificationCode)) {
          this.$utils.message('Please enter the mailbox verification code.')
          return
        }
        if (this.$utils.trim(this.createPram.verificationCode).length !== 6) {
          this.$utils.message('Please enter 6 character validation code.')
          return
        }
        this.$bar.start()
        this.createPram.emailAddress = this.sendCodeParam.sendToEmail
        this.$store.dispatch('postFetch', {api: 'forgotPassword', data: this.createPram}).then(data => {
          this.$bar.finish()
          this.$router.push('/login')
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .forgot-password{
    min-height: 45vw;
    padding: 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h5{
      font-size: 2.6vw;
      color: @base-font-color;
      margin-bottom: 2vw;
    }
    .forgot-password-message{
      font-size: 0.84vw;
      color: @font-back-color;
      width: 18.95vw;
      min-width: 280px;
      line-height: 1.5;
    }
    .create-input-email{
      width: 26vw;
      min-width: 290px;
      text-align: center;
      p{
        font-size: 0.85vw;
        color: @base-font-color;
        text-align: center;
      }
      input{
        width: 10.4vw;
        height: 3.125vw;
        min-width: 150px;
        min-height: 40px;
        line-height: 1;
        border-radius: 5vw;
        border: 0.052vw solid @base-button-back;
        background: rgba(98, 68, 187, 0.2);
        margin: 1vw 0;
        font-size: 1vw;
        text-align: center;
        color: @base-color;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type="number"]{
        -moz-appearance: textfield;
      }
    }
    .forgot-password-input{
      width: 20.84vw;
      min-width: 280px;
      height: 3.125vw;
      margin: 2vw 0;
      input{
        padding: 0 3vw;
      }
    }
    .forgotpaw-option-account{
      margin: 1.04vw 0;
      font-size: 0.84vw;
      color: @font-back-color;
      span{
        color: @base-font-color;
        cursor: pointer;
      }
      span:hover{
        color: @base-button-back;
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 1350px) {
    .forgot-password{
      h5{
        font-size: 35px;
        margin-bottom: 27px;
      }
      .forgot-password-message{
        padding: 0 10px;
        font-size: 12px;
      }
      .create-input-email{
        p{
          font-size: 12px;
        }
        input{
          border: 1px solid @base-button-back;
          border-radius: 50px;
          font-size: 13.5px;
          margin: 10px 0;
        }
      }
      .forgot-password-input{
        margin: 30px 0;
        input{
          padding: 0 40px;
        }
      }
      .forgotpaw-option-account{
        margin: 15px 0;
        font-size: 12px;
      }
    }
  }
  @media (max-width: 500px) {
    .forgot-password{
      h5{font-size: 24px;}
      padding-top: 40px;
    }
  }
</style>

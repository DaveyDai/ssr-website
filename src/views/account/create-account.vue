<template>
  <div class="create-account">
    <h5>CREATE ACCOUNT</h5>
    <!-- 邮箱地址 -->
    <vava-input v-if="!verificationShow" maxlength="100" v-model="sendCodeParam.sendToEmail" class="create-account-input" placeholder="Email Address"></vava-input>
    <!-- 邮箱验证码输入框 -->
    <div v-if="verificationShow" class="create-input-email">
      <p>Please enter the code from the email we just sent you below:</p>
      <input v-model="createPram.verificationCode" maxlength="6" type="text">
      <count-time ref="countTime"></count-time>
    </div>
    <!-- 密码 -->
    <vava-input v-if="verificationShow" v-model="createPram.password" type="password" maxlength="50" class="create-account-input" placeholder="Password"></vava-input>
    <!-- 再次输入密码 -->
    <vava-input v-if="verificationShow" v-model="confirmPassword" type="password" maxlength="50" class="create-account-input" placeholder="Confirm Password"></vava-input>
    <!-- 发送邮箱验证码按钮 -->
    <vava-button v-if="!verificationShow" class="create-account-button" @click="sendCode">SEND CODE</vava-button>
    <!-- 勾选法律文件信息 -->
    <vava-checkbox v-model="checkAgree" class="create-check">
      <p>I agree to the <span @click="routerLink('/support/terms-conditions', true)">Terms and Conditions</span> end <span @click="routerLink('/support/private-policy', true)">Privacy Policy</span>.</p>
    </vava-checkbox>
    <!-- 是否订阅 -->
    <vava-checkbox v-model="createPram.subscribeEmail" class="create-check create-remember-check">I agree to receive email notifications about the latest VAVA news, giveaways and tips.</vava-checkbox>
    <!-- 创建账户 -->
    <vava-button v-if="verificationShow" class="create-account-button" @click="createAccount">CREATE ACCOUNT</vava-button>
    <!-- 其他操作 -->
    <p class="create-option-account">Or <span @click="routerLink('/login')">Sign in</span>    as existing customer</p>
  </div>
</template>

<script>
  import CountTime from '@/components/count-time.vue'
  export default {
    components: { CountTime },
    data () {
      return {
        verificationShow: false, // 显示输入验证码界面
        checkAgree: false, // 是否同意法律文件
        sendCodeParam: {
          sendToEmail: '',
          type: 1
        },
        createPram: {
          emailAddress: '', // 注册邮件
          verificationCode: '', // 验证码
          subscribeEmail: true, // 是否订阅
          password: '', // 用户密码
          type: 0
        },
        confirmPassword: '' //  重复密码
      }
    },
    mounted () {
    },
    methods: {
      sendCode () {
        if (!this.$utils.validateEmail(this.sendCodeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        if (!this.checkAgree) {
          this.$utils.message('Please agree to the Terms and Conditions end Privacy Policy.')
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
          this.$utils.message(error.message)
          this.$bar.finish()
        })
      },
      createAccount () {
        if (!this.$utils.validateEmail(this.sendCodeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        if (!this.$utils.trim(this.createPram.password)) {
          this.$utils.message('The password is incorrect.')
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
        if (!this.checkAgree) {
          this.$utils.message('Please agree to the Terms and Conditions end Privacy Policy.')
          return
        }
        this.$bar.start()
        this.createPram.emailAddress = this.sendCodeParam.sendToEmail
        this.$store.dispatch('postFetch', {api: 'userRegister', data: this.createPram}).then(data => {
          this.loginCheckData({userName: this.createPram.emailAddress, password: this.createPram.password})
        }).catch(error => {
          this.$bar.finish()
          this.$utils.message(error.message)
        })
      },
      loginCheckData (loginParam) {
        this.$store.dispatch('postFetch', {api: 'signIn', data: loginParam}).then(data => {
          this.$bar.finish()
          this.$store.commit('setToken', data.data.token)
          this.routerLink('/account')
        }).catch(error => {
          this.$utils.message(error.message)
          this.$bar.finish()
        })
      },
      routerLink (path, isOpen) {
        isOpen ? window.open(path) : this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .create-account{
    padding: 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 70%;
    h5{
      font-size: 2.6vw;
      color: @base-font-color;
      margin-bottom: 2vw;
    }
    .create-account-input{
      width: 20.84vw;
      min-width: 280px;
      height: 3.125vw;
      margin: 1.04vw 0;
      input{
        padding: 0 3vw;
      }
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
    .create-account-button{
      margin: 1vw 0;
    }
    .create-check{
      margin: 1.04vw 3vw;
      font-size: 0.84vw;
      width: 20.84vw;
      min-width: 290px;
      padding: 0 10px;
      color: @base-font-color;
      p{
        color: @un-font-color;
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
    .create-remember-check{
      color: @un-font-color;
      margin-top: 0;
      margin-bottom: 2vw;
    }
    .create-option-account{
      margin: 1.04vw 0;
      font-size: 0.84vw;
      color: @un-font-color;
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
    .create-account{
      h5{
        font-size: 35px;
        margin-bottom: 27px;
      }
      .create-account-input{
        margin: 14px 0;
        input{
          padding: 0 40px;
        }
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
      .create-account-button{
        margin: 13px 0;
      }
      .create-check{
        font-size: 12px;
      }
      .create-remember-check{
        margin-bottom: 25px;
      }
      .create-option-account{
        margin: 15px 0;
        font-size: 12px;
      }
    }
  }
  @media (max-width: 500px) {
    .create-account{
      padding: 40px 0;
      h5{font-size: 24px;}
      .create-check{
        margin-top: 10px;
      }
    }
  }
</style>

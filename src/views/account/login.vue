<template>
  <div class="vava-login-in">
    <h5>SIGN IN</h5>
    <vava-input class="login-input" placeholder="Email Address"></vava-input>
    <vava-input class="login-input" placeholder="Password"></vava-input>
    <!-- I agree to the Terms and Conditions and Privacy Policy. -->
    <vava-checkbox v-model="checkAgree" class="login-check"><p>I agree to the <span>Terms and Conditions</span> end <span>Privacy Policy</span>.</p></vava-checkbox>
    <vava-checkbox v-model="remember" class="login-check login-remember-check">Remember me</vava-checkbox>
    <vava-button class="login-button" :button-click="loginCheckData">SIGN IN</vava-button>
    <p class="login-option-account">Or <span @click="routerLink('/create-account')">Create a new account</span>  |  <span @click="routerLink('/forgot-password')">Forgot password</span>?</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        checkAgree: false,
        remember: true
      }
    },
    mounted () {
    },
    methods: {
      loginCheckData () {
        this.$message('This email address does not exist.')
        this.$message('The password is incorrect.')
      },
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-login-in{
    padding: 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    h5{
      font-size: 2.6vw;
      color: @base-font-color;
      margin-bottom: 2vw;
    }
    .login-input{
      width: 20.84vw;
      min-width: 280px;
      height: 3.125vw;
      margin: 1.04vw 0;
      input{
        padding: 0 3vw;
      }
    }
    .login-check{
      margin: 1.04vw 3vw;
      font-size: 0.84vw;
      width: 20.84vw;
      min-width: 280px;
      padding: 0 10px;
      color: @base-font-color;
      p{
        color: @button-un-color;
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
    .login-remember-check{
      color: @font-back-color;
      margin-top: 0;
      margin-bottom: 2vw;
    }
    .login-option-account{
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
    .vava-login-in{
      h5{
        font-size: 35px;
        margin-bottom: 27px;
      }
      .login-input{
        margin: 14px 0;
        input{
          padding: 0 40px;
        }
      }
      .login-check{
        font-size: 12px;
      }
      .login-remember-check{
        margin-bottom: 25px;
      }
      .login-option-account{
        margin: 15px 0;
        font-size: 12px;
      }
    }
  }
  @media (max-width: 500px) {
    .vava-login-in{
      h5{font-size: 24px;}
      padding: 40px 0;
      .login-check{
        margin-top: 10px;
      }
    }
  }
</style>

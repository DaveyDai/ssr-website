<template>
  <div class="forgot-password">
    <h5>Forgot Password ?</h5>
    <p class="forgot-password-message">Enter your email below and we will send you reset instructions via email.</p>
    <vava-input class="forgot-password-input" placeholder="Email Address"></vava-input>
    <!-- <vava-input class="forgot-password-input" placeholder="Password"></vava-input> -->
    <vava-button :button-click="loginCheckData">RESET MY PASSWORD</vava-button>
    <p class="forgotpaw-option-account">Or <span @click="routerLink('/create-account')">Create a new account</span>  |  <span @click="routerLink('/login')">Sign in</span>?</p>
  </div>
</template>

<script>
  import VavaInput from '@/components/vava-input.vue'
  import VavaButton from '@/components/vava-button.vue'
  import VavaCheckbox from '@/components/checkbox.vue'
  export default {
    components: { VavaInput, VavaButton, VavaCheckbox },
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
  .forgot-password{
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

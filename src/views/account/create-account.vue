<template>
  <div class="create-account">
    <h5>CREATE ACCOUNT</h5>
    <vava-input v-if="!verificationShow" class="create-account-input" placeholder="Email Address"></vava-input>
    <div v-if="verificationShow" class="create-input-email">
      <p>Please enter the code from the email we just sent you below:</p>
      <input maxlength="6" type="number">
      <count-time ref="countTime"></count-time>
    </div>
    <vava-input v-if="verificationShow" class="create-account-input" placeholder="Password"></vava-input>
    <vava-input v-if="verificationShow" class="create-account-input" placeholder="Confirm Password"></vava-input>
    <vava-button v-if="!verificationShow" class="create-account-button" :button-click="sendCode">SEND CODE</vava-button>
    <vava-checkbox v-model="checkAgree" class="create-check"><p>I agree to the <span>Terms and Conditions</span> end <span>Privacy Policy</span>.</p></vava-checkbox>
    <vava-checkbox v-model="agreeNews" class="create-check create-remember-check">I agree to receive email notifications about the latest VAVA news, giveaways and tips.</vava-checkbox>
    <vava-button v-if="verificationShow" class="create-account-button" :button-click="createCheckData">CREATE ACCOUNT</vava-button>
    <p class="create-option-account">Or <span @click="routerLink('/login')">Sign in</span>    as existing customer</p>
  </div>
</template>

<script>
  import VavaInput from '@/components/vava-input.vue'
  import VavaButton from '@/components/vava-button.vue'
  import VavaCheckbox from '@/components/checkbox.vue'
  import CountTime from '@/components/count-time.vue'
  export default {
    components: { VavaInput, VavaButton, VavaCheckbox, CountTime },
    data () {
      return {
        verificationShow: false,
        checkAgree: false,
        agreeNews: true
      }
    },
    mounted () {
    },
    methods: {
      sendCode () {
        this.verificationShow = true
        this.$nextTick(() => {
          this.$refs.countTime.startTimeOut()
        })
      },
      createCheckData () {
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
  .create-account{
    padding: 5vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    .create-remember-check{
      color: @font-back-color;
      margin-top: 0;
      margin-bottom: 2vw;
    }
    .create-option-account{
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

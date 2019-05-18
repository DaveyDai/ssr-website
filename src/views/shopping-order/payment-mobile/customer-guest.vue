<template>
  <!-- 购物车内游客填邮箱页 -->
  <div class="slide-unlogin">
    <h3 class="title">
      <i class="icon icon-right-slide expand" @click='goBack'></i>
      <span>Please enter your notification email</span>
    </h3>
    <el-form :model="unSign"  :rules="rules" ref="unSign" class="ruleForm">
      <el-form-item prop="email">
        <el-input  class="login-input" placeholder="Email Address" v-model="unSign.email"></el-input>
      </el-form-item>
    </el-form>
    <vava-button class="bg-gradient" round @click="guestLogin">Next</vava-button>
    <p class='orPart'>
      <span>or</span>
    </p>
    <a class='signInA' href="/login">Sign In</a>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        unSign: { email: '' },
        rules: {
          email: [
            { required: true, message: 'Please enter the Email'},
            { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
          ]
        },
        userAuthToken: ''
      }
    },
    methods: {
      guestLogin () {
        this.$refs['unSign'].validate((valid) => {
          if (valid) {
            let accountData = { emailAddress: this.unSign.email }
            this.$store.commit('setAccountData', accountData)
            this.$router.push('/pay-m/?email=' + this.unSign.email) // 跳转支付页面
          }
        })
      },
      goBack() { // 返回上一级
        this.$router.push('/shopping-cart')
      }
    },
  }
</script>

<style lang="less" scoped>
  .slide-unlogin {
    background: #FFFFFF;
    padding: 0 15px 30px;
    margin-right: 20px;
    .title{
      font-family: avenir-next-regular;
      font-size: 16px;
      color: #333333;
      text-align: center;
      margin: 10px 0 20px;
      font-weight: normal;
      position: relative;
      span{
        display: inline-block;
        margin-top: 70px;
        color: #666;
      }
      i.expand{
        position: absolute;
        left: 0;
        top: 0;
        color: #999999;
        font-size: 18px;
        transform: rotate(180deg);
      }
    }
    .orPart{
      border-top: 1px solid #eeeeee;
      position:relative;
      margin: 25px 0 22px;
      span{
        font-family: avenir-next-regular;
        font-size: 14px;
        color: #999999;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 34px;
        text-align: center;
        background-color: white;
      }
    }
    .signInA{
      font-family: avenir-next-regular;
      font-size: 16px;
      color: @base-color;
      text-align: center;
      display: block;
    }

  }
</style>
<style lang="less">
.slide-unlogin{
  .el-form-item{
    margin-bottom: 16px;
  }
  .vava-button{
    font-size: 16px;
    width: 100%;
    margin-top: 10px;
  }
}
</style>
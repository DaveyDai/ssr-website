<template>
   <div class='cartsLogin'>
    <!-- 登录界面 -->
    <div class="slide-login">
      <h3 class="title">
        <i class="icon icon-right-slide expand" @click='goBack'></i>
        <span>Sign In</span>
      </h3>
      <el-form :model="sign" ref="sign" class="demo-ruleForm">
        <el-form-item
          prop="userName"
          :rules="[
            { required: true, message: 'Please enter the Email'},
            { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input type="email" class="login-input" placeholder="Email Address" v-model="sign.userName"></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          :rules="[
            { required: true, message: 'Please enter the password'}
          ]"
        >
          <el-input type="password" class="login-input" placeholder="Password" v-model="sign.password"></el-input>
        </el-form-item>
      </el-form>
      <vava-button type="primary" class="bg-gradient" @click="login"  style="width: 100%;margin-bottom: 15px;">Sign In</vava-button>
      <div class="box-tip">
        <a href="/create-account?redirect=pay-m" alt="sign up">
          <span class="sign">Sign up</span>
        </a>
        <a href="/forgot-password?redirect=pay-m">
          <span class="account">Forgot your password?</span>
        </a>
      </div>
      <!-- <social-login @loginSuccess='loginSuccess'></social-login> -->
    </div>
  </div>
</template>

<script>
  // import socialLogin from '@/components/social-login.vue'
  export default {
    // components: { socialLogin },
    data() {
      return {
        sign: { userName: '', password: '' }
      }
    },
    methods: {
      goBack() {
        this.$router.push('/shopping-cart')
      },
      loginSuccess() { // 第三方登陆成功
        this.$router.push('/pay-m')
      },
      login () { // 登陆
        this.$store.dispatch('postFetch', {api: 'signIn', data: this.sign}).then(data => {
          this.$store.commit('setToken', data.token)
          this.$router.push('/pay-m/?email=' + this.sign.userName)
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      }
    },
  }
</script>

<style lang="less" scoped>
.cartsLogin{
  .slide-login{
    background: #FFFFFF;
    padding: 0 15px 30px;
    .title{
      font-family: SFCompactDisplay-Regular;
      font-size: 16px;
      color: #333333;
      text-align: center;
      margin: 10px 0 20px;
      font-weight: normal;
      position: relative;
      i.expand{
        position: absolute;
        left: 0;
        top: 0;
        color: #999999;
        font-size: 18px;
        transform: rotate(180deg);
      }
    }
    .box-tip{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 15px;
      a {
        font-family: SFCompactDisplay-Regular;
        font-size: 12px;
        color: @base-color;
        text-align: right;
      }
    }
  }
}
</style>
<style lang="less">
.cartsLogin{
  .el-form-item{
    margin-bottom: 25px;
  }
  .vava-button{
    font-size: 16px;
  }
}
</style>
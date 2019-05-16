<template>
  <!-- 是否登录界面 -->
  <div class="shopping-customer-pc">
    <shopping-step :active="2"></shopping-step>
    <div class="shopping-customer-content">
      <div class="slide-list center-main">
          <!-- 登录界面 -->
         <div class="slide-login ">
            <h3 class="title">Account Checkout</h3>
            <el-form :model="loginParam" ref="sign" class="demo-ruleForm">
              <el-form-item
                prop="userName"
                :rules="[
                  { required: true, message: 'Please enter the Email'},
                  { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input type="email" class="login-input" placeholder="Email Address" v-model="loginParam.userName"></el-input>
              </el-form-item>
              <el-form-item
                prop="password"
                :rules="[
                  { required: true, message: 'Please enter the password'}
                ]"
              >
                <el-input type="password" class="login-input" placeholder="Password" v-model="loginParam.password"></el-input>
              </el-form-item>
            </el-form>
            <vava-button @click="login" style="width: 100%;margin-bottom: 22px;">LOGIN IN</vava-button>
            <div class="box-tip">
              <a href="/create-account" target="_blank" alt="sign up">
                <span class="sign">Sign up></span>
              </a>
              <span class="account" @click='dialogVisible = true'>Forgot your password?</span>
            </div>
         </div>

         <div class="box-or">
           OR
         </div>
         <!-- 未登录 -->
         <div class="slide-unlogin">
           <h3 class="title">Guest Checkout</h3>
           <el-form :model="unSign" ref="unSign" class="ruleForm">
              <el-form-item
                prop="email"
                :rules="[
                  { required: true, message: 'Please enter the Email'},
                  { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input  class="login-input" placeholder="Email Address" v-model="unSign.email"></el-input>
              </el-form-item>
          </el-form>
          <vava-button @click="guestLogin" style="width: 100%;">CONTINUE AS GUEST</vava-button>
        </div>
        <!-- 右边结算预览 -->
        <order-summary></order-summary>
      </div>
    </div>
    <!-- 忘记密码弹出框 -->
    <el-dialog :visible.sync="dialogVisible">
      <change-password @change-success="changeSuccess" isDialog></change-password>
    </el-dialog>
  </div>
</template>
<script>
  import ShoppingStep from './shopping-step.vue'
  import OrderSummary from './order-summary.vue'
  // import ChangePassword from './change-password.vue'
  import ChangePassword from '../../account/forgot-password.vue'
  export default {
    components: { ShoppingStep, OrderSummary, ChangePassword },
    computed: {
      isLogin () {
        return false
      }
    },
    data () {
      return {
        loginParam: { userName: '', password: '' },
        unSign: {email: ''},
        dialogVisible: false,
        userAuthToken: ''
      }
    },
    methods: {
      login () {
        this.$refs['sign'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('postFetch', {api: 'signIn', data: this.loginParam}).then(data => {
              this.$store.commit('setToken', data.token)
              // 登陆成功后保存用户邮箱 但是不要去刷新用户原来购物车的数据了 以免用户发现购物车结算面板不对 退出继续支付
              this.$utils.setShoppingCart(this.$store.commit, Object.assign(this.$store.state.shoppingCart, {payEmail: this.loginParam.userName}))
              this.$router.push({path: '/pay', query: {email: this.loginParam.userName}})
            }).catch(error => {
              this.$utils.showErrorMes(this, error)
            })
          }
        })
        // let data = this.sign;
        // this.$store.dispatch('fetchLogin', this.sign).then(json => {
        //   // 是否记住密码
        //   if (this.remember) {
        //     this.$cookie.set('uname', this.sign.email)
        //   }
        //   // 处理购物车逻辑
        //   this.getCart1();
        //   // 跳转首页
        //   // this.$router.push('/pay')
        // }).catch(error => {
        //   this.$message.error(error);
        // });
        // this.$store.dispatch('postFetch', {api: 'signIn', data: this.loginParam}).then(data => {
        //   this.$store.commit('setToken', data.token)
        //   this.getCart1()
        // }).catch(error => {
        //   this.$utils.showErrorMes(this, error)
        // })
      },
      guestLogin () {
        this.$refs['unSign'].validate((valid) => {
          if (valid) {
            // 跳转支付页面
            this.$utils.setShoppingCart(this.$store.commit, Object.assign(this.$store.state.shoppingCart, {payEmail: this.unSign.email}))
            this.$router.push({path: '/pay', query: {email: this.unSign.email}})
          }
        })
      },
      changeSuccess () {
        this.dialogVisible = false;
        this.$message.success('success!')
      }
    }
  }
</script>
<style lang='less' scoped >
  .shopping-customer-pc{
    min-height: auto;
    .forgot-password{
      padding-top: 0;
      .forgot-password-button, .forgot-password-input{
        height: 45px;
        max-width: 350px;
        font-size: 14px;
      }
      .create-input-email input{
        height: 45px;
      }
    }
  }
  .shopping-customer-pc .shopping-customer-content{
    padding: 20px 0px;
    background: #FAFAFA;
    .slide-list {
      display: flex;
      .slide-login{
        width: 425px;
        background: #FFFFFF;
        padding: 20px 20px 30px 20px;
        .title{
          font-family: SFCompactDisplay-Regular;
          font-size: 18px;
          font-weight:inherit;
          color: #666666;
          margin-top: 2px;
          margin-bottom: 20px;
        }
        .box-tip{
          .sign {
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #6244BB;
            cursor: pointer;
          }
          .account {
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #999999;
            float: right;
            cursor: pointer;
          }
        }
      }
      .slide-unlogin {
        width: 425px;
        background: #FFFFFF;
        padding: 20px 20px 30px 20px;
        margin-right: 20px;
        .title{
          font-family: SFCompactDisplay-Regular;
          font-size: 18px;
          font-weight: inherit;
          color: #666666;
          margin-top: 2px;
          margin-bottom: 20px;
        }
      }
      .box-or {
        Font-family: PingFangSC-Medium;
        font-size: 13px;
        font-weight: inherit;
        padding: 0px 15px;
        background: #fff;
        color: #333;
        display: flex;
        align-items: center;
        position: relative;
        &:before {
          content: "";
          display: block;
          width: 1px;
          height: 40%;
          position: absolute;
          top:0;
          left: 25px;
          background: #eee;
        }
        &:after{
          content: "";
          display: block;
          width: 1px;
          height: 40%;
          position: absolute;
          bottom:0;
          left: 25px;
          background: #eee;
        }
      }
    }
    .vava-button{
      height: 45px;
      font-size: 14px;
    }
  }
</style>

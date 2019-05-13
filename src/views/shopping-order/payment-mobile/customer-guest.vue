<template>
  <!-- 购物车内游客填邮箱页 -->
  <div class="cartsGuest">
    <div class="slide-unlogin">
      <h3 class="title">
        <i class="icon icon-right-slide expand" @click='goBack'></i>
        <span>Please enter your notification email</span>
      </h3>
      <el-form :model="unSign" ref="unSign" class="ruleForm">
        <el-form-item
          prop="email"
        >
          <el-input  class="login-input" placeholder="Email Address" v-model="unSign.email"></el-input>
        </el-form-item>

        <el-form-item>
          <vava-button type="primary" class="bg-gradient" round 
              @click="guestLogin"  style="width: 100%;">
            Next
          </vava-button>
        </el-form-item>
        <p class='orPart'>
          <span>or</span>
        </p>
        <a class='signInA' href="/carts-login">Sign In</a>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        unSign: {
          email: ''
        },
        rules: [
          { required: true, message: 'Please enter the Email'},
          { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
        ],
        userAuthToken: ''
      }
    },
    methods: {
      /**
       * [guestLogin 游客登陆]
       * @author luke 2018-12-12
       */
      guestLogin () {
        this.$refs['unSign'].validate((valid) => {
          if (valid) {
            // 跳转支付页面
            this.$router.push('/pay/?email=' + this.unSign.email);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 返回上一级
      goBack() {
        this.$router.push('/carts/')
      }
    },
  }
</script>

<style lang="less" scoped>
.cartsGuest{
  .slide-unlogin {
    background: #FFFFFF;
    padding: 0 15px 30px;
    margin-right: 20px;
    .title{
      font-family: SFCompactDisplay-Regular;
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
        font-family: SFCompactDisplay-Regular;
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
      font-family: SFCompactDisplay-Regular;
      font-size: 16px;
      color: @base-color;
      text-align: center;
      display: block;
    }
  }
}
</style>
<style lang="less">
.cartsGuest{
  .el-form-item{
    margin-bottom: 16px;
  }
  .vava-button{
    font-size: 16px;
  }
}
</style>
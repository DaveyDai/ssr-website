<template>
  <!-- 是否登录界面 -->
  <div class="shopping-customer-pc">
    <shopping-step :active="2"></shopping-step>
    <div class="shopping-customer-content">
      <div class="slide-list center-main">
          <!-- 登录界面 -->
         <div class="slide-login ">
            <h3 class="title">Account Checkout</h3>
            <el-form :model="sign" ref="sign" class="demo-ruleForm">
              <el-form-item
                prop="email"
                :rules="[
                  { required: true, message: 'Please enter the Email'},
                  { type: 'email', message: 'Please enter a valid Email', trigger: ['blur', 'change'] }
                ]"
              >
                <el-input type="email" class="login-input" placeholder="Email Address" v-model="sign.email"></el-input>
              </el-form-item>
              <el-form-item
                prop="pwd"
                :rules="[
                  { required: true, message: 'Please enter the password'}
                ]"
              >
                <el-input type="password" class="login-input" placeholder="Password" v-model="sign.pwd"></el-input>
              </el-form-item>
              <el-form-item>
                <vava-button @click="login" style="width: 100%;">LOGIN IN</vava-button>
              </el-form-item>
            </el-form>
            <div class="box-tip">
              <a href="/register" target="_blank" alt="sign up">
                <span class="sign">Sign up></span>
              </a>
              <span class="account" @click='dialogVisible = true'>
                Forgot your password?
              </span>
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
              <el-form-item>
                <vava-button @click="guestLogin" style="width: 100%;">CONTINUE AS GUEST</vava-button>
              </el-form-item>
          </el-form>
        </div>
        <!-- 右边结算预览 -->
        <order-summary></order-summary>
      </div>
    </div>
    <!-- 忘记密码弹出框 -->
    <el-dialog :visible.sync="dialogVisible" width="40%">
      <change-password @change-success='changeSuccess'></change-password>
    </el-dialog>
  </div>
</template>
<script>
  import ShoppingStep from './shopping-step.vue'
  import OrderSummary from './order-summary.vue'
  import ChangePassword from './change-password.vue'
  export default {
    components: { ShoppingStep, OrderSummary, ChangePassword },
    computed: {
      isLogin () {
        return false
      }
    },
    data () {
      return {
        cartList: {productList: []},
        sign: {email: '', pwd: ''},
        unSign: {email: ''},
        dialogVisible: false,
        userAuthToken: ''
      }
    },
    beforeMount () {
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
    },
    methods: {
      getCart1 () {
        this.userAuthToken = this.$cookie.get('userAuthToken');
        let obj = {
          api: 'getCartList',
          data: {
            token: this.userAuthToken
          }
        };
        this.$store.dispatch('fetchGetAll', obj).then(json => {
          if (json === '[]') {
            this.updateCart([]);
          } else {
            this.updateCart(json.brandShopCartItems);
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      login () {
        let data = this.sign;
        this.$store.dispatch('fetchLogin', data).then(json => {
          // 是否记住密码
          if (this.remember) {
            this.$cookie.set('uname', this.sign.email)
          }
          // 处理购物车逻辑
          this.getCart1();
          // 跳转首页
          // this.$router.push('/pay')
        }).catch(error => {
          this.$message.error(error);
        });
      },
      updateCart (pList) {
        let newArr = [];
        for (let i = 0; i < pList.length; i++) {
          let ths = pList[i];
          newArr.push({
            pid: ths.productId,
            num: 0,
            colorId: ths.colorId,
            sku: ths.sku,
            model: ths.model
          })
        }
        // 从缓存更新到购物车
        let list = JSON.parse(localStorage.getItem('shoppingCarts'));
        for (let i = 0; i < list.productList.length; i++) {
          let ths =list.productList[i];
          newArr.push({
            'pid': ths.productId,
            'colorId': ths.colorId,
            'num': ths.productQty,
            'sku': ths.sku,
            'model': ths.model
          })
        }
        let obj = {
          countryId: 1,
          brand: this.brand,
          lang: this.lang,
          items: newArr
        };
        this.$store.dispatch('UPDATE_CART_LIST', obj).then(json => {
          localStorage.removeItem('shoppingCarts');
          this.$router.push('/pay/');
        }).catch(error => {
          this.$message.error(error);
        });
      },
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
      isLength (val) {
        return val && val.length > 0
      },
      changeSuccess () {
        this.dialogVisible = false;
      },
    }
  }
</script>
<style lang='less' scoped >
  .shopping-customer-pc{
    min-height: auto;
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
            color: #13BED3;
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

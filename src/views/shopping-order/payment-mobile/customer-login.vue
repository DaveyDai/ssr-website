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
          <!-- signFn -->
          <vava-button type="primary" class="bg-gradient" round
              @click="login"  style="width: 100%;">
            Sign In
          </vava-button>
        </el-form-item>
      </el-form>
      <div class="box-tip">
        <a :href="`/register?retUrl=goPay`" alt="sign up">
          <span class="sign">Sign up</span>
        </a>
        <a href="/forget">
          <span class="account">
            Forgot your password?
          </span>
        </a>
      </div>
      <social-login @loginSuccess='loginSuccess'></social-login>
    </div>
  </div>
</template>

<script>
  import socialLogin from '@/components/social-login.vue'
  export default {
    components: { socialLogin },
    computed: {
    },
    data() {
      return {
        sign: {
          email: '',
          pwd: ''
        },
        userAuthToken: ''
      }
    },
    methods: {
      // 返回上一级
      goBack() {
        this.$router.push('/carts/')
      },
      /**
       * [三方登录成功]
       * @author napier 2019-01-16
       */
      async loginSuccess() {
        // 处理购物车逻辑
        await this.getCart1();
      },
      /**
       * [login 登陆]
       * @author napier 2019-01-03
       */
      async login () {
        let data = this.sign;
        this.$store.dispatch('fetchLogin', data).then(async json => {
          // 是否记住密码
          // if (this.remember) {
          //   this.$cookie.set('uname', this.sign.email)
          // }
          // 处理购物车逻辑
          await this.getCart1();
          // 跳转首页
          // this.$router.push('/pay')
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
      },
      /**
       * [getCart 获取购物车数据]
       * @author luke 2018-12-07
       */
      async getCart1 () {
        this.userAuthToken = this.$cookie.get('userAuthToken');
        let obj = {
          api: 'getCartList',
          data: {
            token: this.userAuthToken
          }
        };
        await this.$store.dispatch('fetchGetAll', obj).then(async (json) => {
          if (json === '[]') {
            await this.updateCart([]);
          } else {
            await this.updateCart(json.brandShopCartItems);
          }
          // 清空缓存的购物车数据
          localStorage.removeItem('shoppingCarts');
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
      },
      // 更新购物车
      async updateCart (pList) {
        let newArr1 = [];
        if (pList && Array.isArray(pList) && pList.length > 0) {
          for (let i = 0; i < pList.length; i++) {
            let ths = pList[i];
            newArr1.push({
              pid: ths.productId,
              num: 0,
              colorId: ths.colorId,
              sku: ths.sku,
              model: ths.model
            })
          }
          let obj = {
            countryId: 1,
            brand: this.brand,
            lang: this.lang,
            items: newArr1
          };
          await this.$store.dispatch('UPDATE_CART_LIST', obj)
        }
        // 从缓存更新到购物车
        let newArr2 = []
        let list = JSON.parse(localStorage.getItem('shoppingCarts'));
        console.log('list')
        console.log(list)
        if (list && list.productList && Array.isArray(list.productList) && list.productList.length > 0) {
          for (let i = 0; i < list.productList.length; i++) {
            let ths =list.productList[i];
            newArr2.push({
              'pid': ths.productId,
              'colorId': ths.colorId,
              'num': ths.productQty,
              'sku': ths.sku,
              'model': ths.model
            })
          }
        }
        let obj = {
          countryId: 1,
          brand: this.brand,
          lang: this.lang,
          items: newArr2
        };
        await this.$store.dispatch('UPDATE_CART_LIST', obj).then(json => {
          setTimeout(() => {
            this.$router.push('/pay/');
          }, 100);
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
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
    margin-bottom: 16px;
  }
  .vava-button{
    font-size: 16px;
  }
}
</style>
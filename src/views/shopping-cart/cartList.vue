<template>
  <div class="shopping">
    <div class="slide-left">
      <div class="box-title rel">
          <p>Shopping Cart</p>
          <!-- {{ getColors }} -->
          <div class="abs-update" @click="refreshCart">
            Update Shopping Cart
          </div>
      </div>
      <!-- 列表 -->
      <div class="list"> 
        <div class="item" v-for="item in cartList.productList">
          <a :href="url + '/p/' + item.urlKey + '.html'" class="name"  alt="item.productName">
            <img :src="item.imgUrl" :alt="item.productName" class="box-img" >
          </a>
          <div class="box-name">
            <a :href="url + '/p/' + item.urlKey + '.html'" class="name"  alt="item.productName">
               {{ item.productName }}
            </a>
            <span class="model">Model: {{ item.model }}</span>
            <span class="color">Color: {{ item.colorId | colorName(getColors) }}</span>
            <p class="price">${{ item.price.toFixed(2) }}</p>
          </div>
          <!-- 商品数量 -->
          <div class="num">
            <el-input-number size="mini" :min="1" :max="999" style="width: 100px;" v-model="item.productQty" @change="changeQty(item)">
            </el-input-number>
          </div>
          <!-- 总价格 -->
          <div class="total">
            ${{ (item.totalPrice || item.price * item.productQty).toFixed(2) }}
          </div>
          <div class="del" @click="delItem(item)">
            <i class="el-icon-delete"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="slide-right">
      <div class="box-title rel">
        Summary
        <div class="abs-quantity">
          {{ cartList.totalNum }} item{{ cartList.totalNum > 1 ? 's' : ''}}
        </div>
      </div>
      <!-- 明细 -->
      <div class="detail">
        <div class="item">
          <label>Subtotal:</label>
          <p>${{ Number(cartList.totalAmount).toFixed(2) }}</p>
        </div>
        <div class="item">
          <label>Shipping:</label>
          <p>$0.00</p>
        </div>
      </div>

      <!-- 结算按钮区 -->
      <div class="box-checkout">
        <div class="item">
          <label>Pre-Tax total: </label>
          <p>${{ Number(cartList.totalAmount).toFixed(2) }}</p>
        </div>
        <!-- 按钮 -->
        <el-button type="primary" class="btn-checkout" round 
         @click="checkout" >
           Proceed to Checkout
        </el-button>
        <p class="tip">*Use your coupon in the checkout process.</p>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'getColors',
        'userList',
        'brand',
        'brandId',
        'lang',
        'langId'
      ]),
      isLogin () {
        if (this.userList && this.userList.accountId) {
          return true;
        }
        return false
      }
    },
    // 定义变量
    data () {
      let url = window.location.origin;
      return {
        url
      }
    },
    // 引入组件
    props: {
      cartList: {
        type: Object,
        required: true
      }
    },
    mounted: function () {
    },
    filters: {
      // pc 分类图片
      colorName: function (cid, arr) {
        // this.getColors
        if (arr && arr.length > 0) {
          let obj = arr.filter(function (el) {
            return el.colorId === cid
          });
          return obj[0].colorName;
        }
      }
    },
    // 方法
    methods: {
      checkout () {
        // 添加购物车跳转seo 代码
        
        // 判断是否登录
        if (this.isLogin) {
          debugger
          this.$seoFn.onCheckout(this.cartList.productList, '/pay/')
        } else {
          // 没有登录的情况
          this.$seoFn.onCheckout(this.cartList.productList, '/pay-customer')
        }
      },
      /**
       * [changeQty 更新数量]
       * @author luke 2018-12-07
       */
      changeQty (item) {
        // 是否登录
        if (this.isLogin) {
          this.updateLoginCart();
        } else {
          // 没有登录的情况
          this.unloginCart();
        }
        // 追加seo 代码
        this.$seoFn.removeShopCart(item, 1);
      },
      /**
       * [delItem 删除商品]
       * @author luke 2018-12-07
       */
      delItem (item) {
        // seo 添加代码
        this.$seoFn.removeShopCart(item, item.productQty);
        // 更新购物车
        if (this.isLogin) {
          item.productQty = 0;
          this.updateLoginCart();
          this.$common.delArray(this.cartList.productList, item);
        } else {
          this.$common.delArray(this.cartList.productList, item);
          // 没有登录的情况
          this.unloginCart();
        }
      },
      /**
       * [unloginCart 没有登录购物车更新数据]
       * @author luke 2018-12-07
       */
      unloginCart () {
        let arrCart = this.cartList;
        // 总体价格
        let totalPrice = 0;
        // 清空商品数量
        arrCart.totalNum = 0;
        for (let i = 0; i < arrCart.productList.length; i++) {
          let ths = arrCart.productList[i];
          // 设置总价格
          if (ths.productQty > 1) {
            totalPrice += ths.price * ths.productQty;
          } else {
            totalPrice += ths.price;
          }
          // 设置数量
          arrCart.totalNum += Number(ths.productQty);
        }
        arrCart.totalAmount = totalPrice.toFixed(2);
        localStorage.setItem('shoppingCarts', JSON.stringify(arrCart));
      },
      /**
       * [updateLoginCart 更新购物车]
       * @author luke 2018-12-07
       */
      updateLoginCart () {
        let pList = this.cartList.productList;
        let newArr = [];
        for (var i = 0; i < pList.length; i++) {
          let ths = pList[i];
          newArr.push({
            pid: ths.productId,
            num: ths.productQty,
            colorId: ths.colorId,
            sku: ths.sku,
            model: ths.model
          })
        }
       
        let obj = {
          countryId: 1,
          brand: this.brand,
          lang: this.lang,
          items: newArr
        };
        this.$store.dispatch('UPDATE_CART_LIST', obj).then(json => {
          console.log(json);
          this.$emit('refreshCart', true);
        }).catch(error => {
          this.$message.error(error);
        });
      },
      refreshCart () {
        this.$emit('refreshCart', true);
      }
    },
    components: {
    }
  }
</script>
<style lang='less' >
  .shopping {
    display: flex;
    min-height: 300px;
    padding: 20px 0px;
    .slide-left{
      width: 850px;
      margin-right: 20px;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      .box-title{
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #EEEEEE;
        padding: 0px 20px;
        font-family: SFCompactDisplay-Regular;
        font-size: 20px;
        color: #333333;
        .abs-update {
          font-size: 14px;
          color: #13BED3;
          text-align: right;
          position: absolute;
          right: 20px;
          top: 0px;
          cursor: pointer;
        }
      }
      .list {
        .item{
          display: flex;
          padding: 10px 20px;
          border-bottom: 1px solid #EEEEEE;
          .box-img {
            width: 120px;
            height: 120px;
          }
          .box-name {
            padding: 10px 10px 10px 10px;
            font-family: SFCompactDisplay-Regular;
            line-height: 20px;
            width: 360px;
            .name {
              font-size: 16px;
              color: #333333;
              &:hover{
                color: #13BED3
              }
            }
            .model, .color {
              font-size: 14px;
              color: #666666;
              display: block;
            }
            .price {
              margin-top: 10px;
              font-size: 16px;
              color: #333333;

            }
          }
          .num {
            height: 120px;
            width: 100px;
            line-height: 120px;
            margin: 0px 10px;
          }
          .total{
            height: 120px;
            line-height: 120px;
            margin: 0px 10px;
            font-size: 16px;
            color: #666666;
            width: 130px;
            text-align: center;
            display: inline-block;
          }
          .del {
            line-height: 120px;
            margin: 0px 4px 0px 20px;
            color: #666666;
            cursor: pointer;
            i {
              &:hover{
                color: #13BED3;
              }
            }
          }
          &:last-child {
            border: 0px;
          }
        }
      }
    }
    .slide-right{
        width: 330px;
        background: #FFFFFF;
        border: 1px solid #EEEEEE;
        .box-title{
          height: 60px;
          line-height: 60px;
          font-family: SFCompactDisplay-Regular;
          font-size: 20px;
          color: #333333;
          padding: 0px 20px;
          border-bottom: 1px solid #EEEEEE;
          .abs-quantity {
            font-size: 14px;
            color: #13BED3;
            text-align: right;
            position: absolute;
            right: 20px;
            top: 0px;
          }
        }
        .detail{
          padding: 20px;
          border-bottom: 1px solid #EEEEEE;
          .item{
            display: flex;
            line-height: 20px;
            label {
              width: 30%;
              text-align: left;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #666666;
            }
            p{
              width: 70%;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #333333;
              text-align: right;
            }
          }
        }
        .box-checkout{
          padding: 20px;
          text-align: center;
          .item{
            display: flex;
            line-height: 20px;
            label {
              width: 30%;
              text-align: left;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #666666;
            }
            p{
              width: 70%;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #333333;
              text-align: right;
            }
          }
          .tip {
            font-family: SFCompactDisplay-Regular;
            font-size: 12px;
            color: #999999;
            text-align: center;
            margin-top: 10px;
          }
          .btn-checkout{
            background-image: linear-gradient(-125deg, rgb(19, 190, 211) 0%, rgb(200, 235, 145) 100%);
            border: 0px;
            font-size: 16px;
            background-color: inherit;
            border-radius: 20px;
            transition: all .3s;
            width: 100%;
            margin-top: 40px;
            &:hover{
              box-shadow: 0 8px 24px #00c6cd38;
            }
          }

        }
    }
  }
</style>

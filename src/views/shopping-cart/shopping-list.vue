<template>
  <div class="shopping-list">
    <!-- 左边产品详情 -->
    <div class="shopping-slide-left">
      <!-- 头部 -->
      <div class="shopping-box-title">
        <span>Shopping Cart</span><span class="updata-shopping" @click="reData">Update Shopping Cart</span><span class="updata-shopping-item">{{shoppingCart.productList.length}} items</span>
      </div>
      <!-- 商品列表 -->
      <li class="product-list-li" :class="{'is-disabled': !item.state}" v-for="(item, index) of shoppingCart.productList" :key="index">
        <vava-checkbox round v-model="item.isSelect" @change="removeShop" :disable="!item.state"></vava-checkbox>
        <div class="li-product-img"><img :src="item.skuProductMainUrl" alt=""></div>
        <div class="li-product-name">
          <p class="product-d-title" :title="item.productName">{{item.shortName}}</p>
          <p class="product-d-model">Model: {{item.model}}</p>
          <p class="product-d-color">Color: {{item.colourCode}}</p>
          <p class="product-d-price">${{item.sellPrice}}<span>${{item.listingPrice}}</span></p>
        </div>
        <div class="li-product-number">
          <el-input-number v-model="item.totalQtyOrdered" :disabled="!item.state" :min="1" :max="999" @change="updateShoppingCart(item)"></el-input-number>
        </div>
        <div class="li-product-right">
          <div class="li-product-total">${{(item.totalQtyOrdered * item.sellPrice).toFixed(2)}}</div>
          <i class="li-product-delete el-icon-delete" @click="deleteShoppingData(item, index)"></i>
        </div>
      </li>
    </div>
    <!-- 右边结算预览 -->
    <div class="shopping-slide-right">
      <div class="shopping-box-title">
        <span>Summary</span><span class="shopping-items">{{shoppingCart.productList.length}} item</span>
      </div>
      <div class="shopping-right-subtotal">
        <li><span>Subtotal: </span><span class="right-subtotal-price">${{shoppingCart.totalAmount}}</span></li>
        <li><span>Shipping: </span><span class="right-subtotal-price">$0.00</span></li>
      </div>
      <div class="shopping-box-title pretax-total">
        <span>Pre-Tax total: </span><span class="shopping-items">${{shoppingCart.totalAmount}}</span>
      </div>
      <div class="checkout-button"><vava-button class="button-standard no-wrap" @click="cartCheckOut">Proceed to Checkout</vava-button></div>
      <p class="use-coupon-tips">*Use your coupon in the next step.</p>
    </div>
    <div class="shopping-lit-footer">
      <span class="pretax-total-price">Pre-Tax total: <em>${{shoppingCart.totalAmount}}</em></span>
      <vava-button class="cart-check-out no-wrap">Check Out</vava-button>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      shoppingCart () { // 购物车列表
        return this.$store.state.shoppingCart
      }
    },
    data () {
      return {
        totalQtyOrdered: ''
      }
    },
    methods: {
      cartCheckOut () {
        this.$router.push(this.$cookies.get('token') ? '/pay' : '/shopping-customer')
      },
      upShoppingTotal (item) { // 改变商品数量
        this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(this.shoppingCart.productList, this.shoppingCart.shoppingCartId))
      },
      updateShoppingCart (item) {
        this.$cookies.get('token') ? this.shoppingCartAdd(item) : this.shoppingCartAddById(item)
      },
      shoppingCartAddById (item) { 
        // 获得购物车ID后 根据购物车ID添加数据
        let editParam = {
          productSkuId: item.productSkuId, 
          totalQtyOrdered: item.totalQtyOrdered, 
          source: 2
        }
        this.$store.dispatch('postByUrl', {api: 'editShopCartNl', bodyData: editParam, data: '?shopCartId=' + this.$store.state.shoppingCart.shoppingCartId}).then(data => {
          if (!this.$store.state.shoppingCart.shoppingCartId) {
            let cartData = {shoppingCartId: data.shopCartId}
            this.$store.commit('setShoppingCart', cartData)
          }
          this.getShoppingCart()
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      shoppingCartAdd (item) { // 添加购物车 (编辑购物车接口最好改一下 post请求不要用URL拼接参数)
        let editParam = {
          productSkuId: item.productSkuId,
          totalQtyOrdered: item.totalQtyOrdered,
          source: 0
        }
        this.$store.dispatch('postFetch', {api: 'editShopCart', data: editParam}).then(data => {
          this.getShoppingCart()
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      // 获取购物车列表
      getShoppingCart () {
        if (this.$cookies.get('token')) {
          // 获取登录用户购物车列表
          this.$store.dispatch('postFetch', {api: 'getShopCartList', data: {pageNo: 1, pageSize: 100, condition: {}}}).then(data => {
            this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(data.records)) // 保存购物车信息到本地和store
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        } else {
          // 获取购物车列表， 未登陆时根据购物车ID
          if (this.$store.state.shoppingCart.shoppingCartId) {
            this.$store.dispatch('postByUrl', {api: 'getShopCartListNl', data: this.shoppingCart.shoppingCartId}).then(data => {
              this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(data, this.$store.state.shoppingCart.shoppingCartId)) // 保存购物车信息到本地和store
            }).catch(error => {
              this.$utils.showErrorMes(this, error)
            })
          }
        }
      },
      // 删除购物车列表
      deleteShoppingData (item, index) {
        if (this.$cookies.get('token')) {
          // 删除登录用户购物车
          this.$store.dispatch('postFetch', { api: 'deleteShopCart', data: [item.productSkuId] }).then(data => {
            this.shoppingCart.productList.splice(index, 1)
            this.upShoppingTotal()
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        } else {
          // 删除未登录用户购物车
          this.$store.dispatch('postByUrl', { api: 'deleteShopCartNl', bodyData: [item.productSkuId], data: this.$store.state.shoppingCart.shoppingCartId }).then(data => {
            this.shoppingCart.productList.splice(index, 1)
            this.upShoppingTotal()
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        }
      },
      removeShop () { // 取消购买
        this.upShoppingTotal()
      },
      reData () { // 刷新购物车
        this.$emit('refresh')
      }
    }
  }
</script>
<style lang="less" scoped>
  .shopping-list{
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    .shopping-slide-left{
      margin-top: 24px;
      margin-bottom: 40px;
      width: 57.3vw;
      min-width: 700px;
      background-color: #FFF;
      .shopping-box-title{
        width: 100%;
        height: 4.16vw;
        min-height: 60px;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-family: 'avenir-next-demi';
          font-size: 1.25vw;
          color: #333333;
        }
        span.updata-shopping, span.updata-shopping-item{
          font-family: 'avenir-next-regular';
          font-size: 0.73vw;
          color: #5D45B4;
          cursor: pointer;
        }
        span.updata-shopping-item{
          display: none;
          color: #333333;
        }
      }
      .product-list-li{
        position: relative;
        border-top: 1px solid #EEE;
        padding: 0.83vw 24px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .li-product-img{
          margin-right: 1.04vw;
          img{
            width: 8.07vw;
            height: 8.07vw;
            min-width: 80px;
            min-height: 80px;
          }
        }
        .li-product-name{
          line-height: 1.8;
          max-width: 35%;
          .product-d-title{
            font-family: 'avenir-next-demi';
            font-size: 0.9375vw;
            color: #333333;
            line-height: 1.3;
            margin-bottom: .5vw;
            word-break: break-all;
            cursor: pointer;
            &:hover{
              color: @base-color;
            }
          }
          .product-d-model, .product-d-color{
            font-size: 0.73vw;
            color: #666;
            // span{
            //   font-family: 'avenir-next-demi';
            //   margin-left: 0.73vw;
            //   color: #D0021B;
            // }
            white-space: nowrap;
          }
          .product-d-price{
            font-size: 1.15vw;
            color: #333333;
            margin-top: 10px;
            span{
              margin-left: 1vw;
              font-size: 0.83vw;
              color: #666;
              text-decoration: line-through;
            }
          }
        }
        .li-product-number{
          margin: 0 2.6vw;
          min-width: 100px;
        }
        .li-product-right{
          position: absolute;
          top: 50%;
          right: 2.8vw;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          .li-product-total{
            font-size: 1.04vw;
            color: #333;
          }
          .li-product-delete{
            margin-left: 2.5vw;
            font-size: 1.2vw;
            cursor: pointer;
          }
        }
      }
      .is-disabled{
        .li-product-img, .li-product-name, .li-product-number, .vava-checkbox, .li-product-total{
          opacity: 0.4;
        }
      }
    }
    .shopping-slide-right{
      margin-top: 24px;
      margin-bottom: 40px;
      margin-left: 1.04vw;
      width: 24vw;
      background-color: #FFF;
      .shopping-box-title{
        padding: 0 24px;
        width: 100%;
        height: 4.16vw;
        min-height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-family: 'avenir-next-demi';
          font-size: 1.25vw;
          color: #333333;
        }
        span.shopping-items{
          font-size: 0.83vw;
        }
      }
      .shopping-right-subtotal{
        border-top: 1px solid #EEEEEE;
        border-bottom: 1px solid #EEEEEE;
        padding: 1vw 24px;
        line-height: 1.8;
        min-height: 65px;
        li{
          display: flex;
          justify-content: space-between;
          font-size: 0.83vw;
          color: #666;
          .right-subtotal-price{
            color: #333;
            font-size: 0.73vw;
            font-family: 'avenir-next-demi';
          }
        }

      }
      .pretax-total{
        span{font-size: 0.9375vw;}
        span.shopping-items{
          font-size: 1.25vw;
        }
      }
      .checkout-button{
        margin-top: 1vw;
        width: 100%;
        padding: 0 24px;
        .button-standard{
          width: 100%;
          text-align: center;
          padding: 0;
        }
      }
      .use-coupon-tips{
        margin-top: 16px;
        font-size: 0.73vw;
        color: #999;
        padding-left: 40px;
      }
    }
    .shopping-lit-footer{
      display: none;
    }
  }
  @media (max-width: 1450px){
    .shopping-list{
      .shopping-slide-left{
        .shopping-box-title{
          span{
            font-size: 18px;
          }
          span.updata-shopping{
            font-size: 12px;
          }
        }
        .product-list-li{
          .li-product-name{
            .product-d-title{
              font-size: 13px;
            }
            .product-d-model, .product-d-color{
              font-size: 12px;
              span{
                margin-left: 12px;
              }
            }
            .product-d-price{
              font-size: 16px;
              span{
                font-size: 13px;
              }
            }
          }
          .li-product-right .li-product-total{
            font-size: 15px;
          }
          .li-product-right .li-product-delete{
            font-size: 17px;
          }
        }
      }
      .shopping-slide-right{
        .shopping-box-title{
          span{
            font-size: 18px;
          }
          span.shopping-items{
            font-size: 12px;
          }
        }
        .shopping-right-subtotal{
          li{
            font-size: 13px;
            .right-subtotal-price{
              font-size: 12px;
            }
          }

        }
        .pretax-total{
          span{font-size: 13.5px;}
          span.shopping-items{
            font-size: 18px;
          }
        }
        .use-coupon-tips{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 1350px) {
    .shopping-list{
      .shopping-slide-left{
        .shopping-box-title{
          padding: 0 20px;
        }
        .product-list-li{
          padding: 10px 20px;
        }
      }
      .shopping-slide-right{
        .shopping-box-title{
          padding: 0 20px;
        }
        .shopping-right-subtotal{
          padding: 1vw 20px;
        }
        .pretax-total{
          padding: 0 20px;
        }
        .checkout-button{
          padding: 0 20px;
        }
        .use-coupon-tips{
          padding-left: 25px;
        }
      }
    }
  }
  @media (max-width: 980px) {
    .shopping-list{
      .shopping-slide-left{
        min-width: 630px;
        .shopping-box-title{
          padding: 0 10px;
        }
        .product-list-li{
          padding: 10px 10px;
          .li-product-number{
            margin: 0 1.5vw;
          }
          .is-round .vava-checkbox-select{
            margin-right: 10px;
          }
          .li-product-delete{
            right: 2vw;
          }
        }
      }
      .shopping-slide-right{
        min-width: 200px;
        .shopping-box-title{
          padding: 0 10px;
        }
        .shopping-right-subtotal{
          padding: 0 10px;
        }
        .pretax-total{
          padding: 0 10px;
        }
        .checkout-button{
          padding: 0 10px;
        }
        .use-coupon-tips{
          padding-left: 20px;
        }
      }
    }
  }
  @media (max-width: 875px) {
    .shopping-list{
      padding-bottom: 60px;
      .shopping-slide-left{
        min-width: 600px;
        width: 90%;
        .shopping-box-title{
          padding: 0 10px;
          span{
            font-size: 18px;
          }
          span.updata-shopping{
            display: none;
          }
          span.updata-shopping-item{
            display: inline-block;
            font-size: 13px;
          }
        }
        .product-list-li{
          padding: 10px 10px;
          .is-round .vava-checkbox-select{
            margin-right: 10px;
          }
          .li-product-name{
            line-height: 1.4;
            .product-d-title{
              font-size: 13px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .product-d-model, .product-d-color{
              font-size: 12px;
              span{
                margin-left: 12px;
              }
            }
            .product-d-price{
              font-size: 16px;
              span{
                font-size: 13px;
              }
            }
          }
        }
      }
      .shopping-slide-right{
        display: none;
      }
      .shopping-lit-footer{
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 199;
        width: 100%;
        height: 60px;
        background-color: #FFF;
        padding: 0 3%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .pretax-total-price{
          font-family: SFCompactDisplay-Regular;
          font-size: 14px;
          color: #666;
          display: flex;
          align-items: center;
          em{
            font-size: 18px;
            color: #333;
            margin-left: 5px;
          }
        }
      }
    }
  }
  @media (max-width: 650px) {
    .shopping-list{
      .shopping-slide-left{
        min-width: 320px;
        width: 95%;
        .shopping-box-title{
          span{
            font-size: 18px;
          }
        }
        .product-list-li{
          padding: 10px 10px;
          .is-round .vava-checkbox-select{
            margin-right: 10px;
          }
          .li-product-name{
            .product-d-title{
              font-size: 13px;
              margin-bottom: 6px
            }
            .product-d-model, .product-d-color{
              font-size: 12px;
              span{
                margin-left: 12px;
              }
            }
            .product-d-price{
              font-size: 14px;
              span{
                font-size: 12px;
              }
            }
          }
          .li-product-number{
            position: absolute;
            bottom: 10px;
            right: 10px;
            min-width: 80px;
          }
          .li-product-right .li-product-total{
            font-size: 13px;
          }
          .li-product-right .li-product-delete{
            margin-left: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 400px) {
    .shopping-list .shopping-slide-left .product-list-li .li-product-right{
      top: 10px;
      transform: translateY(0);
      .li-product-delete{
        margin-left: 10px;
      }
    }
  }
  @media (max-width: 360px) {
    .shopping-list .shopping-slide-left .product-list-li .li-product-right .li-product-total{
      display: none;
    }
  }
</style>

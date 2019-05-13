<template>
  <div class="shopping-order-summary">
    <div class="box-title rel">
      Order Summary
      <div class="abs-quantity">
        {{ cartList.totalNum }} item{{ cartList.totalNum > 1 ? 's' : ''}}
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="product-list">
      <div class="item" v-for="(item,index) in cartList.productList" :key="index">
        <img :src="item.imgUrl" :alt="item.productName" >
        <div class="right-desc">
          <span class="name">{{ item.productName }}</span>
          <div class="box-price">
            <p class="price">${{ item.price.toFixed(2) }}<span>X</span><em>{{ item.productQty }}</em></p>
            <p class="total">${{ (item.totalPrice || item.price * item.productQty).toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 明细 -->
    <div class="detail">
      <div class="item">
        <label>Subtotal:</label>
        <p>${{ cartList.totalAmount }}</p>
      </div>
      <div class="item">
        <label>Shipping:</label>
        <p>$0.00</p>
      </div>
    </div>
    <!-- 结算按钮区 -->
    <div class="box-checkout">
      <div class="item">
        <label>Order Total:</label>
        <p>${{ cartList.totalAmount }}</p>
      </div>
      <vava-button style="width: 100%;margin: 27px 0;" disable>PLACE ORDER</vava-button>
      <p class="tip">*Use your coupon in the next step.</p>
    </div>

  </div>
</template>
<script>
  export default {
    data () {
      return {
        cartList: {productList: []}
      }
    },
    beforeMount () {
      this.cartList = JSON.parse(window.localStorage.getItem('shoppingCarts') || {})
    }
  }
</script>
<style lang="less" scoped>
  .shopping-order-summary{
    position: relative;
    width: 330px;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    .box-title{
      height: 60px;
      line-height: 60px;
      font-family: AvenirNext-Medium;
      font-size: 18px;
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
        cursor: pointer;
      }
    }
    .detail{
      padding: 20px;
      .item{
        display: flex;
        justify-content: space-between;
        line-height: 24px;
        label {
          text-align: left;
          font-size: 14px;
          font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #666666;
        }
        p{
          font-family: 'avenir-next-demi';
          font-size: 14px;
          color: #333333;
          text-align: right;
        }
      }
    }
    .box-checkout{
      padding: 20px;
      text-align: center;
      padding-top: 0px;
      .item{
        display: flex;
        line-height: 22px;
        justify-content: space-between;
        font-family: AvenirNext-Medium;
        label {
          font-size: 16px;
          color: #666666;
        }
        p{
          font-size: 22px;
          color: #333333;
        }
      }
      .tip {
        font-family: SFCompactDisplay-Regular;
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-top: 10px;
      }
      .btn-gray {
        background: #DDDDDD;
        border-radius: 22px;
        margin-top: 35px;
        border: 0px;
        width: 100%;
        &:hover{
          box-shadow: 0 8px 24px #DDDDDD;
        }
      }
    }
    .product-list {
      padding: 0 20px;
      border-bottom: 1px solid #eee;
      max-height: 320px;
      overflow: auto;
      .item {
        padding: 20px 0;
        display: flex;
        border-top: 1px solid #eee;
        img{
          width: 80px;
          height: 80px;
          flex-shrink: 0;
        }
        .right-desc {
          margin: 5px 0px;
          font-family: AvenirNext-DemiBold;
          color: #333333;
          margin-left: 8px;
          .name {
            font-family: 'avenir-next-demi';
            max-height: 36px;
            line-height: 18px;
            font-size: 14px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            &:hover{
              color: @base-color;
            }
          }
          .box-price {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            .price{
              font-family: SFCompactDisplay-Regular;
              font-size: 15px;
              color: #333;
              span{
                color: #666;
                font-size: 12px;
                margin-left: 15px;
              }
              em{
                margin-left: 3px;
                font-size: 12px;
              }
            }
            .total {
              width: 50%;
              font-family: SFCompactDisplay-Regular;
              font-size: 16px;
              color: #333333;
              text-align: right;
            }
          }
        }
        &:first-child {
          border: 0px;
        }
      }
    }
  }
</style>

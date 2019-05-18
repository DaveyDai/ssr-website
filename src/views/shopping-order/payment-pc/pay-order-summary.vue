<template>
  <div class="shopping-order-summary">
    <div class="box-title rel">
      Order Summary
      <div class="abs-quantity">
        {{ productList.length }} item{{ productList.length > 1 ? 's' : ''}}
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="product-list">
      <div class="item" v-for="(item,index) in productList" :key="index">
        <img :src="item.skuImage" :alt="item.productName" >
        <div class="right-desc">
          <span class="name" :title="item.productName">{{ item.shortName }}</span>
          <div class="box-price">
            <p class="price">${{ item.price }}<span>X</span><em>{{ item.qtyOrdered }}</em></p>
            <p class="total">${{ item.totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 明细 -->
    <div class="detail">
      <div class="item"><label>Subtotal:</label><p>${{ subtotal }}</p></div>
      <div class="item"><label>Shipping:</label><p>$0.00</p></div>
      <template v-if="isPay">
        <!-- <div class="item"><label>Coupon Amount:</label><p class="coupon-amount">-${{'0'}}</p></div> -->
        <div class="item order-taxes"><label>Taxes:</label><p>${{ orderTaxes }}</p></div>
      </template>
    </div>
    <!-- 优惠码 -->
    <!-- <div class="coupon-box">
      <p class="title">Promo Code:</p>
      <div class="box-code">
        <el-input v-model="couponCode" :disabled="isCoupon" v-bind:class="{ error : isTips }"  style="width: 182px;height: 32px;" >
        </el-input>
        <el-button class="bg-gradient ml10 btn-save"   @click="setCoupon"  v-if="!isCoupon">Apply
        </el-button>
        <el-button v-if="isCoupon" class="bg-gradient ml10 btn-save" @click="removeCoupon">Remove
        </el-button>
        <p class="tip-name" v-if="isCoupon" >{{ couponName }}</p>
        <p class="tips" v-if="isTips">coupon code is not exist</p>
      </div>
    </div> -->
    <!-- 结算按钮区 -->
    <div class="box-checkout">
      <div class="item"><label>Order Total:</label><p>${{ orderTotal }}</p></div>
      <vava-button style="width: 100%;margin: 27px 0;max-height: 45px;" :disable="!isActive" @click="placeOrder">PLACE ORDER</vava-button>
      <!-- <p class="tip">*Use your coupon in the next step.</p> -->
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      subtotal: Number,
      orderTaxes: Number,
      orderTotal: Number,
      productList: Array,
      isActive: Boolean, // 是否高亮下单结算按钮
      isPay: Boolean // 是否是支付下单结算(是的话需要显示优惠码输入和显示计算税费)
    },
    methods: {
      placeOrder () { // 下单
        if (this.isActive) { // 按钮高亮才能结算
          this.$emit('click')
        }
      }
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
        color: #151515;
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
          font-size: 16px;
          font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #666666;
        }
        p{
          font-family: 'avenir-next-demi';
          font-size: 16px;
          color: #333333;
          text-align: right;
        }
        p.coupon-amount{
          color: @base-color;
        }
      }
      .order-taxes{
        line-height: 30px;
        font-size: 18px;
        p{
          font-size: 22px;
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
          flex-grow: 1;
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

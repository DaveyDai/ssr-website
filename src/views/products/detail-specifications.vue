<template>
  <div class="product-detail-specifications">
    <div class="detail-specs-product">
      <img :src="specsData.productMainUrl" alt="">
      <p v-html="specsData.productName"></p>
    </div>
    <div class="specifications-details">
      <li v-for="(item, index) of specsData.productSpecsBos" :key="index">
        <span class="specifications-key-name">{{item.specsKey}}</span><p class="specifications-des" v-html="item.specsValue"></p>
      </li>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      specsData () {
        return this.$store.state.productDetail.specs
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail-specifications{
    width: 100%;
    background-color: #F9F9F9;
    padding: 6vw 0 10.4vw 0;
    .detail-specs-product{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 4vw;
      img{
        width: 41.67vw;
        margin-bottom: 2.08vw;
        min-width: 200px;;
      }
      p{
        text-align: center;
        font-size: 2.6vw;
        color: @base-font-color;
        font-family: 'avenir-next-demi';
        line-height: 1.3;
      }
    }
    .specifications-details{
      width: 100%;
      padding: 0 8.33vw;
      li{
        padding: 4.16vw 1vw 4.16vw 12.6vw;
        display: flex;
        flex-wrap: nowrap;
        border-top: 0.052vw solid @base-font-color;
        .specifications-key-name{
          width: 30vw;
          padding-right: 4vw;
          font-size: 2.6vw;
          color: @base-font-color;
          font-family: 'avenir-next-demi';
          flex-shrink: 0;
          line-height: 1.2;
        }
        .specifications-des{
          font-size: 1.56vw;
          line-height: 1.8;
          color: @base-font-color;
          padding-top: 0.3vw;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .product-detail-specifications{
      .specifications-details{
        li{
          padding-left: 5vw;
          .specifications-des{
            font-size: 8px;
            padding-top: 0;
          }
        }
      }
    }
  }
  @media (max-width: 500px) {
    .product-detail-specifications{
      .specifications-details{
        li{
          .specifications-des{
            line-height: 1.5;
          }
          .specifications-key-name{
            line-height: 1.3;
          }
        }
      }
    }
  }
</style>

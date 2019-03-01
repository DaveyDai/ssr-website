<template>
  <div class="product-detail-overview">
    <img v-lazy="item.overviewImageUrl" v-for="(item,index) of $store.state.productDetail.overviewData.records" :key="index">
  </div>
</template>
<style lang="less" scoped>
  .product-detail-overview{
    width: 100%;
    font-size: 0;
    img{
      width: 100%;
    }
  }
  @media (max-width: 500px) {
    .product-detail-tabs{
      justify-content: space-around;
      padding-right: 0;
      li{
        padding: 0;
        margin: 0;
      }
      li.active{
        padding: 0;
        background-color: #FFF;
        color: @base-button-back;
        &::after{
          width: 80%;
        }
      }
    }
  }
</style>

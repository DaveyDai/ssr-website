<template>
  <div class="product-detail-buynow">
    <div class="buynow-product-img">
      <vava-img-swiper :swiper-data="buyProDetail.productSkuImages"></vava-img-swiper>
      <!-- <img src="/static/product-pages/ACCESSORY/Hub-VA-DK003/Rectangle 1.png" alt=""> -->
    </div>
    <div class="buynow-content">
      <h5 :title="buynowData.productName">{{buynowData.shortName}}</h5>
      <!-- <h5><div>VAVA INTELLIGENT&nbsp;</div><div>ROBOTIC VACUUM</div></h5> -->
      <p class="product-detail-price" v-if="buyProDetail.sellPrice">{{dicTreeList[buyProDetail.districtCode]}} {{buyProDetail.sellPrice | decimalDou}}</p>
      <!-- <p class="product-Out-of-stock" v-if="!buynowData.state">Out of Stock</p> -->
      <p class="product-detail-describe" v-if="buynowData.description" v-html="buynowData.description"></p>
      <div class="product-high-light">
        <ul><li v-for="(item, index) of buynowData.highLights" :key="index" v-html="item"></li></ul>
      </div>
      <div class="product-detail-color">
        <p v-show="activeColor">Color: {{activeColor}}</p>
        <div class="color-option">
          <li
            v-for="(item, index) of buynowData.productSkuDetailBos" :key="index"
            :class="{'active': colorIndex === index}"
            @click="handlColor(index)">
            <span :style="{'background': item.colourName}"></span>
          </li>
        </div>
      </div>
      <div class="buy-now-button">
        <vava-button class="product-buy-now" v-if="buyProDetail.asin" @click="buyNow">ADD TO CART</vava-button>
        <vava-button class="product-buy-now" v-if="buyProDetail.asin" @click="buyNowAZ" noActive>BUY ON AMAZON</vava-button>
      </div>
    </div>
  </div>
</template>

<script>
  import VavaImgSwiper from '@/components/vava-swiper.vue'
  export default {
    components: { VavaImgSwiper },
    computed: {
      buynowData () {
        return this.$store.state.productDetail.buynow
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      },
      activeColor () {
        let proColor = this.$store.state.productDetail.buynow.productSkuDetailBos
        // let color = proColor&&proColor.length&&proColor[this.colorIndex].colourCode.split('_')[2] || ''
        // return color.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        return proColor[this.colorIndex].colourCode
      }
    },
    data () {
      return {
        colorIndex: 0,
        buyProDetail: {}
      }
    },
    created () {
      this.buyProDetail = this.buynowData.productSkuDetailBos[this.colorIndex] // 获取颜色对应的sku详情
    },
    methods: {
      handlColor (index) { // 选择颜色
        this.colorIndex = index
        this.buyProDetail = this.buynowData.productSkuDetailBos[index] //  获取颜色对应的sku详情
      },
      buyNowAZ () { // 去亚马逊购买
        let url = 'https://www.amazon.com/gp/product/' +
        this.buyProDetail.asin + '?keywords=' + this.buynowData.amazonKeyword
        window.open(url)
      },
      buyNow () { // 添加购物车
        
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail-buynow{
    width: 100%;
    display: flex;
    padding: 6.25vw 12.5vw 10.4vw 12.5vw;
    background-color: #FFFFFF;
    .buynow-product-img{
      margin-right: 5.2vw;
      width: 37.5vw;
      min-width: 280px;
      flex-shrink: 0;
    }
    .buynow-content{
      line-height: 1.4;
      h5{
        // max-height: 11.25vw;
        line-height: 3.75vw;
        font-size: 3.125vw;
        margin-bottom: 1vw;
        font-weight: bold;
        color: #4B4B4B;
        font-family: 'avenir-next-demi';
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 3;
        // overflow: hidden;
        // text-overflow: ellipsis;
      }
      .product-detail-price{
        font-size: 2.08vw;
        color: @base-font-color;
        padding: 1vw 0;
      }
      .product-Out-of-stock{
        font-size: 1.56vw;
        color: @base-button-back;
        font-weight: bold;
        padding-bottom: 1vw;
      }
      .product-detail-describe{
        font-size: 1.56vw;
        color: @base-font-color;
        margin-bottom: 1vw;
        max-height: 30vw;
        overflow-y: auto;
        .scroll-style();
      }
      .product-high-light{
        max-height: 30vw;
        padding-left: 20px;
        overflow-x: hidden;
        overflow-y: auto;
        .scroll-style();
        ul{
          list-style: disc;
          li{
            position: relative;
            list-style: disc;
            // list-style: inside;
            font-size: 1.04vw;
            color: @base-font-color;
            margin-bottom: 0.9vw;
            // font-family: 'avenir-next-demi';
            -webkit-overflow-scrolling: touch;
          }
        }
      }
      .product-detail-color{
        font-size: 1.56vw;
        color: @base-font-color;
        margin: 2vw 0;
        p{
          margin: 0.5vw 0;
        }
        .color-option{
          display: flex;
          flex-wrap: nowrap;
          li{
            width: 3.38vw;
            height: 3.38vw;
            min-width: 30px;
            min-height: 30px;
            border: 0.208vw solid #FFF;
            margin-right: 1vw;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-color: #f0f0f0;
            span{
              display: inline-block;
              width: 2.6vw;
              height: 2.6vw;
              min-width: 22px;
              min-height: 22px;
              box-shadow: rgba(0, 0, 0, 0.2) 0 0 1vw;
              border-radius: 50%;
            }
            transition: all 0.3s;
          }
          li.active{
            border-color: #C3C3C3;
            span{box-shadow: rgba(0, 0, 0, 0) 0 0 2vw;}
          }
        }
      }
      .buy-now-button{
        display: flex;
        flex-direction: column;
        .product-buy-now{
          margin-bottom: 2vw;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .product-detail-buynow .buynow-content .product-high-light ul li{font-size: 13px;}
  }
  @media (max-width: 920px) {
    .product-detail-buynow{
      padding: 6.25vw 5vw 10.4vw 5vw;
      .buynow-product-img{
        margin-right: 4.5vw;
      }
      .buynow-content{
        .product-detail-price{
          font-size: 19px
        }
        .product-Out-of-stock, .product-detail-describe{
          font-size: 14.3px;
        }
        .product-high-light{
          max-height: 275px;
          ul li{
            font-size: 13px;
          }
        }
        .product-detail-color p{
          font-size: 14.3px;
        }
      }
    }
  }
  @media (max-width: 600px) {
    .product-detail-buynow{
      flex-direction: column;
      padding: 0 5vw;
      .buynow-product-img{
        margin-right: 0;
        margin-bottom: 25px;
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .buynow-content{
        h5{
          max-height: none;
          line-height: 1.3;
          font-size: 17px;display: flex;
        }
        .product-high-light{
          max-height: fit-content;
          ul li{font-size: 12px;}
        }
        .product-detail-color{
          padding: 20px 0;
        }
        .buy-now-button{
          margin-bottom: 30px;
          .product-buy-now{
            padding: 0 18px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
</style>

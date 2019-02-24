<template>
  <div class="product-main">
    <img class="product-main-img" :src="categoryData&&categoryData.imgUrl||''" alt="">
    <p class="product-main-title">CHOOSE YOUR PRODUCT</p>
    <div class="product-main-content">
      <div class="product-main-products">
        <li v-for="(item, index) of imgData" :key="index">
          <img :src="item" alt="">
          <p class="main-products-title" title="VAVA USB HUB VA-DK001VAVA USB HUB VA-DK001">VAVA USB HUB VA-DK001VAVA USB HUB VA-DK001</p>
        </li>
        <li @click="routerLink('/p/999')">
          <img src="/static/vacuum/01-首图_VA-DK003.256.png" alt="">
          <p class="main-products-title" title="VAVA USB HUB VA-UC005">VAVA USB HUB VA-UC005</p>
          <p class="main-products-outof">Out of Stock</p>
        </li>
        <li>
          <img src="/static/vacuum/01-首图_VA-UC005.254.png" alt="">
          <p class="main-products-title" title="VAVA USB HUB VA-DK001">VAVA USB HUB VA-UC008</p>
          <p class="main-products-outof">Out of Stock</p>
        </li>
      </div>
    </div>
    <vava-subscribe></vava-subscribe>
  </div>
</template>

<script>
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('产品首页asyncData', route.params.cId)
      // (to.meta.scrollToTop) window.document.getElementById('app').scrollTo(0, 0)
      return store.dispatch('queryCategory', {api: 'signIn', cId: route.params.cId})
    },
    computed: {
      categoryData () {
        return this.$store.state.categoryData[this.$route.params.cId]
      }
    },
    data () {
      return {
        imgData: ['/static/vacuum/01-首图_VA-DK001.241.png','/static/vacuum/01-首图_VA-DK001.241.png','/static/vacuum/01-首图_VA-RV001.202.png']
      }
    },
    mounted () {
    },
    methods: {
      callback (e) {
      },
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-main{
    width: 100%;
    .product-main-img{
      width: 100%;
    }
    .product-main-title{
      width: 100%;
      font-size: 2.6vw;
      color: @base-font-color;
      margin: 5.2vw 0 2.08vw 0;
      text-align: center; 
    }
    .product-main-content{
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .product-main-products{
      display: flex;
      flex-wrap: wrap;
      padding: 0 5.7vw 6vw 5.7vw;
      li{
        width: 19.8vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.99vw;
        margin: 0 0.9375vw 4vw 0.9375vw;
        padding-bottom: 0.52vw;
        transition: box-shadow .3s, transform .3s;
        cursor: pointer;
        &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;transform: scale(1.1);}
        img{
          width: 100%;
          margin: 2.34vw 0;
          // min-height: 14.58vw;
        }
        .main-products-title{
          margin: 1.5vw 0 0.52vw 0;
          color: @base-font-color;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: center;
          line-height: 1.3;
          max-width: 90%;
        }
        .main-products-outof{
          color: @base-button-back;
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .product-main{
      .product-main-products{
        li{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 920px) {
    .product-main{
      .product-main-products{
        padding: 0 5.5vw 6vw 5.5vw;
      }
    }
  }
  @media (max-width: 800px) {
    .product-main{
      .product-main-products{
        padding: 0 5vw 6vw 5vw;
      }
    }
  }
  @media (max-width: 600px) {
    .product-main{
      .product-main-title{font-size: 16px;margin: 20px 0;}
      .product-main-products{
        padding: 0 5% 25px 5%;
        li{
          width: 31%;
          font-size: 10px;
        }
      }
    }
  }
  @media (max-width: 375px) {
    .product-main{
      .product-main-title{font-size: 14px;}
    }
  }
</style>

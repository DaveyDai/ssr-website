<template>
  <div class="vava-home-page">
    <div v-if="homePageData.bannerType === 0">
      <div class="home-page-banner" v-for="(item,index) of homePageData.bannerImages" :key="index">
        <img v-lazy="item.imageUrl">
      </div>
    </div>
    <vava-swiper v-else :swiper-type="0">
      <div class="swiper-slide home-page-banner" v-for="(item, index) of homePageData.bannerImages" :key="index">
        <img style="cursor: grab;" :src="item.imageUrl">
      </div>
    </vava-swiper>
    <h5 class="home-page-content-title">PRODUCTS</h5>
    <div class="home-page-products">
      <div class="home-products-left"><img v-lazy="homePageData.productImages[0]&&homePageData.productImages[0].imageUrl"></div>
      <div class="home-products-right">
        <img v-lazy="homePageData.productImages[1]&&homePageData.productImages[1].imageUrl">
        <img v-lazy="homePageData.productImages[2]&&homePageData.productImages[2].imageUrl">
        <img v-lazy="homePageData.productImages[3]&&homePageData.productImages[3].imageUrl">
        <img v-lazy="homePageData.productImages[4]&&homePageData.productImages[4].imageUrl">
      </div>
    </div>
    <h5 class="home-page-content-title home-page-content-title-sales">SOCIAL MEDIA</h5>
    <vava-swiper class="home-page-social" :swiper-type="1">
      <div class="swiper-slide" v-for="(item, index) of homePageData.socialMediaImages" :key="index">
        <img style="cursor: grab;" v-lazy="item.imageUrl">
      </div>
    </vava-swiper>
    <vava-subscribe></vava-subscribe>
  </div>
</template>

<script>
  import VavaSwiper from '@/components/img-swiper.vue'
  // import scrollReveal from '@/common/utils/scrollReveal.js'
  export default {
    components: { VavaSwiper },
    asyncData ({ store }) { // 服务端渲染页面会等待次钩子执行完成
      return new Promise((resolve, reject) => {
        store.dispatch('getFetch', {api: 'getHomePage'}).then(data => {
          store.commit('setHomePageData', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    data () {
      return {
        pageData: {bannerImages: [], productImages: [], socialMediaImages: []}
      }
    },
    computed: {
      homePageData () {
        return this.$store.state.homePageData
      }
    },
    methods: {
      callback (e) {
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-home-page{
    min-height: 70vh;
    width: 100%;
    background-color: #f5f5f5;
    .home-page-banner{
      width: 100%;
      font-size: 0;
      min-height: 46vw;
      img{width: 100%;}
    }
    .home-page-content-title{
      width: 100%;
      height: 8vw;
      line-height: 6.25vw;
      font-size: 1.98vw;
      color: @base-font-color;
      text-align: center;
      padding-top: 1.5vw;
      background-color: #f5f5f5;
    }
    .home-page-content-title-sales{background-color: #FFF;}
    .home-page-products{
      width: 100%;
      min-height: 41.6vw;
      display: flex;
      justify-content: center;
      padding-bottom: 5.2vw;
      background: linear-gradient(to top, #fcfcfc 0%, #e8e8e8 25%, #f5f5f5 100%);
      .home-products-left{
        margin-right: 1vw;
        img{width: 29.16vw;transition: box-shadow .35s, transform .35s;cursor: pointer;}
      }
      .home-products-right{
        width: 53.5vw;
        img{width: 25vw;transition: box-shadow .35s, transform .35s;cursor: pointer;}
        img:nth-child(1){margin: 0 1vw 1vw 1vw;}
        img:nth-child(2){margin: 0 0 1vw 1vw;}
        img:nth-child(3){margin: 1vw 1vw 0 1vw;}
        img:nth-child(4){margin: 1vw 0 0 1vw;}
      }
      img:hover{
        transform: scale(1.05);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1.5vw;
      }
    }
    .home-page-social{
      width: 100%;
      min-height: 19.5vw;
      .swiper-slide{
        width: 19.6vw;
        img{
          width: 19.6vw;
        }
      }
    }
  }
  @media (max-width: 1670px) {
     .vava-home-page .home-page-content-title{ font-size: 36px; }
  }
  @media (max-width: 1400px) {
     .vava-home-page .home-page-content-title{ font-size: 28px; }
  }
  @media (max-width: 800px) {
    .vava-home-page{
      .home-page-content-title{ font-size: 18px; }
      .home-page-social .swiper-slide{width: 24vw;img{width: 24vw;}}
    }
  }
  @media (max-width: 600px) {
    .vava-home-page{
      .home-page-content-title{ font-size: 16px; }
      .home-page-social .swiper-slide{width: 24vw;img{width: 24vw;}}
    }
  }
</style>

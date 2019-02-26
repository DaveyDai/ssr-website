<template>
  <div class="vava-home-page">
    <vava-swiper class="home-page-banner" :swiper-data="bannerImg" v-if="bannerType === 0"></vava-swiper>
    <div v-if="bannerType === 1">
      <div class="home-page-banner home-scroll-reveal" v-for="(item,index) of bannerImg" :key="index">
        <img :src="item">
      </div>
    </div>
    <h5 class="home-page-content-title">PRODUCTS</h5>
    <div class="home-page-products home-scroll-reveal">
      <div class="home-products-left"><img :src="'static/home-page/11.jpg'"></div>
      <div class="home-products-right">
        <img :src="'static/home-page/12.jpg'"><img :src="'static/home-page/13.jpg'">
        <img :src="'static/home-page/14.jpg'"><img :src="'static/home-page/15.jpg'">
      </div>
    </div>
    <h5 class="home-page-content-title home-page-content-title-sales home-scroll-reveal">SOCIAL MEDIA</h5>
    <vava-swiper class="home-page-social home-scroll-reveal" :swiper-data="socialImg" :swiper-op="swiperOption"></vava-swiper>
    <vava-subscribe class="home-scroll-reveal"></vava-subscribe>
  </div>
</template>

<script>
  import VavaSwiper from '@/components/img-swiper.vue'
  import scrollReveal from '@/common/utils/scrollReveal.js'
  export default {
    components: { VavaSwiper },
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('首页asyncData')
      // return store.dispatch('requestPost', 'signIn', { test: '我是测试33', time: 100 })
    },
    data () {
      return {
        bannerImg: ['/static/home-page/1.jpg', '/static/home-page/2.jpg', '/static/home-page/3.jpg'],
        socialImg: ['/static/home-page/21.jpg', '/static/home-page/22.jpg', '/static/home-page/23.jpg', '/static/home-page/24.jpg','/static/home-page/21.jpg', '/static/home-page/22.jpg', '/static/home-page/23.jpg', '/static/home-page/24.jpg'],
        bannerType: 1,
        swiperOption: { // 横向轮播图片
          freeMode: true,
          slidesPerView: 'auto',
          spaceBetween: 30, // 间隔
          breakpoints: { // 适应屏幕宽度
            1680: { spaceBetween: 25 },
            1400: { spaceBetween: 20, slidesOffsetAfter: 80 },
            1050: { spaceBetween: 10, slidesOffsetAfter: 50 },
            650: { spaceBetween: 5, slidesOffsetAfter: 30 }
          },
          slidesOffsetAfter: 100,
          speed: 1500, // 速度
          autoplay: {
            disableOnInteraction: false,
            waitForTransition: false
          },
        }
      }
    },
    created () {
    },
    mounted () {
      scrollReveal.init(this.$scrollReveal, '.home-scroll-reveal')
    },
    methods: {
      callback (e) {
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-home-page{
    .testimg{
      width: 380px;
      height: 200px;
    }
    width: 100%;
    background-color: #f5f5f5;
    .home-page-banner{
      width: 100%;
      font-size: 0;
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
      display: flex;
      justify-content: center;
      padding-bottom: 5.2vw;
      background: linear-gradient(to top, #fcfcfc 0%, #e8e8e8 25%, #f5f5f5 100%);
      .home-products-left{
        margin-right: 1vw;
        img{width: 29.16vw;transition: box-shadow .35s, transform .35s;}
      }
      .home-products-right{
        width: 53.5vw;
        img{width: 25vw;}
        img:nth-child(1){margin: 0 1vw 1vw 1vw;}
        img:nth-child(2){margin: 0 0 1vw 1vw;}
        img:nth-child(3){margin: 1vw 1vw 0 1vw;}
        img:nth-child(4){margin: 1vw 0 0 1vw;}
      }
      img:hover{
        transition: box-shadow .35s, transform .35s;
        transform: scale(1.05);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1.5vw;
      }
    }
    .home-page-social{
      width: 100%;
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

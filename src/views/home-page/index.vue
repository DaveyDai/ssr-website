<template>
  <div class="vava-home-page">
    <div v-if="homePageData.bannerType === 2">
      <div class="home-page-banner" v-for="(item,index) of homePageData.bannerImages" :key="index">
        <img v-lazy="item.imageUrl" @click="jumpUrl(item.jumpUrl)" style="cursor: pointer;">
      </div>
    </div>
    <vava-swiper v-else :swiper-type="0">
      <div class="swiper-slide home-page-banner" v-for="(item, index) of homePageData.bannerImages" :key="index">
        <img style="cursor: pointer;" :src="item.imageUrl" @click="jumpUrl(item.jumpUrl)">
      </div>
    </vava-swiper>
    <h5 class="home-page-content-title">PRODUCTS</h5>
    <div class="home-page-products">
      <!-- Robotic Vacuum.jpg -->
      <div class="home-products-left">
        <li @click="jumpUrl(homePageData.productImages.leftImges.jumpUrl)">
          <img :src="homePageData.productImages.leftImges.imageUrl"><span>SEE ALL<i class="icon icon-right-slide"></i></span>
        </li>
      </div>
      <div class="home-products-right">
        <li @click="jumpUrl(item.jumpUrl)" v-for="(item, index) of homePageData.productImages.imagesList" :key="index">
          <img :src="item.imageUrl"><span>SEE ALL<i class="icon icon-right-slide"></i></span>
        </li>
      </div>
    </div>
    <h5 class="home-page-content-title home-page-content-title-sales">SOCIAL MEDIA</h5>
    <div class="home-social-media-phone">
      <img v-lazy="item.imageUrl" v-for="(item, index) of homePageData.socialMediaImages" :key="index">
    </div>
    <vava-swiper class="home-page-social" :swiper-type="1">
      <div class="swiper-slide" v-for="(item, index) of homePageData.socialMediaImages" :key="index">
        <img style="cursor: grab;" v-lazy="item.imageUrl" @click="jumpUrl(item.jumpUrl)">
      </div>
    </vava-swiper>
    <!-- <vava-subscribe></vava-subscribe> -->
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
    computed: {
      homePageData () {
        return this.$store.state.homePageData
      }
    },
    methods: {
      jumpUrl (path) {
        if (path) window.open(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-home-page{
    min-height: 70vh;
    width: 100%;
    .home-page-banner{
      width: 100%;
      font-size: 0;
      min-height: 30vw;
      img{width: 100%;}
    }
    .home-page-content-title{
      width: 100%;
      // height: 8vw;
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
        li{
          width: 29.16vw;
          min-height: 41.6vw;
          transition: box-shadow .35s, transform .35s;
          cursor: pointer;
          img{width: 100%;transition: transform .35s;}
        }
      }
      .home-products-right{
        width: 53.5vw;
        li{
          width: 25vw;
          min-height: 19.79vw;
          transition: box-shadow .35s, transform .35s;
          cursor: pointer;
          img{width: 100%;transition: transform .3s;}
        }
        li:nth-child(1){margin: 0 1vw 1vw 1vw;}
        li:nth-child(2){margin: 0 0 1vw 1vw;}
        li:nth-child(3){margin: 1vw 1vw 0 1vw;}
        li:nth-child(4){margin: 1vw 0 0 1vw;}
      }
      li{
        display: inline-block;
        position: relative;
        font-size: 0;
        span{
          position: absolute;
          right: 5%;
          bottom: 4%;
          font-size: 0.8vw;
          color: #FFF;
          i{
            font-size: 0.6vw;
            color: #FFF;
            margin-left: 0.8vw;
          }
        }
      }
      li:hover{
        transform: scale(1.02);
        img{transform: scale(1.02);}
        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 1.5vw;
      }
    }
    .home-social-media-phone{
      width: 100%;
      margin-bottom: 5.3vw;
      font-size: 0;
      display: flex;
      flex-wrap: wrap;
      padding-left: 6.6vw;
      display: none;
      margin-top: -5px;
      img{
        width: 26.4vw;height: 26.4vw;
        margin: 1.33vw;
      }
    }
    .home-page-social{
      width: 100%;
      min-height: 19.5vw;
      .swiper-slide{
        width: 19.6vw;
        font-size: 0;
        img{
          width: 19.6vw;
        }
      }
    }
  }
  @media (max-width: 1670px) {
    .vava-home-page{
      .home-page-products li{
        span{font-size: 13.5px;i{font-size: 12px;}}
      }
    }
  }
  @media (max-width: 920px) {
    .vava-home-page{
      .home-page-products li{
        span{display: none;}
        // span{font-size: 12px;bottom:9.5px;right:9.5px;i{font-size: 11px;}}
        &:hover{
          transform: scale(1);
          img{transform: scale(1);}
          box-shadow: none;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .vava-home-page{
      .home-page-content-title{ font-size: 17px; }
      .home-page-social{
        display: none;
        .swiper-slide{width: 24vw;img{width: 24vw;}}
      }
      // .home-page-content-title-sales{}
      .home-social-media-phone{
        display: block;
      }
    }
  }
  @media (max-width: 750px) {
    .vava-home-page .home-page-content-title{ font-size: 14.9px; }
  }
  @media (max-width: 600px) {
    .vava-home-page{
      .home-page-content-title{padding-top: 17px;padding-bottom: 5px;}
      .home-page-social .swiper-slide{width: 24vw;img{width: 24vw;}}
      .home-page-products li{
        span{font-size: 8px;bottom:5px;right:5px;i{font-size: 6px;}}
      }
    }
  }
</style>

<template>
  <div class="vava-swiper">
    <div v-swiper:mySwiper="swiperOptionTop" ref="swiperTop">
      <div class="swiper-wrapper swiper-wrapper-top">
        <div class="swiper-slide" v-for="(item, index) of imgData" :key="index">
          <img :src="item.imgUrl" alt="" style="cursor: grab;">
          <!-- <img src="/static/product-pages/ACCESSORY/Hub-VA-DK003/General.jpg" alt="" style="cursor: grab;"> -->
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->
    </div>
    <div v-swiper:mySwiperThumb="thumbsOp" ref="swiperThumbs" class="vava-swiper-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :class="index === activeIndex ? 'active' : ''" v-for="(item, index) of imgData" :key="index">
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      swiperData: Array
    },
    data () {
      return {
        imgData: [],
        swiperOptionTop: {
          on: {
            slideChange: this.swiperTopClick
          }
        },
        thumbsOp: {
          slidesPerView: 'auto',  
          slideToClickedSlide: true,
          normalizeSlideIndex: false,
          on:{
            tap: this.swiperThumbsClick
          },
          freeMode: true,
          slidesPerView: 'auto',
          spaceBetween: 7, // 间隔
          // slidesOffsetAfter: 10,
          breakpoints: { // 适应屏幕宽度
            // 1680: { spaceBetween: 25 },
            // 1400: { spaceBetween: 20 },
            // 1050: { spaceBetween: 10 },
            650: { spaceBetween: 5 }
          }
        },
        activeIndex: 0
      }
    },
    watch: {
      swiperData (value) {
        this.activeIndex = 0
        this.imgData = []
        this.swiperData.forEach(item => {
          this.imgData.push({active: false, imgUrl: item})
        })
        this.mySwiper.slideToLoop(this.activeIndex, 500, false)
        this.mySwiperThumb.slideToLoop(this.activeIndex, 500, false)
      }
    },
    created () {
      this.swiperData.forEach(item => {
        this.imgData.push({active: false, imgUrl: item})
      })
    },
    methods: {
      swiperThumbsClick (event) {
        this.activeIndex = this.mySwiperThumb.activeIndex
        this.mySwiper.slideToLoop(this.activeIndex, 500, false)
      },
      swiperTopClick (event) {
        this.activeIndex = this.mySwiper.activeIndex
        this.mySwiperThumb.slideToLoop(this.activeIndex, 500, false)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-swiper{
    width: 99.9%;
    .swiper-pagination-bullet-active{
      background: #FFF;
    }
    .swiper-wrapper-top{
      img{width: 100%;}
      .swiper-slide{
        min-height: 37vw;
      }
    }
    .vava-swiper-thumbs{
      margin-top: 10px;
      margin-bottom: 5px;
      .swiper-wrapper .swiper-slide{
        width: 7vw;
        height: 7vw;
        min-width: 80px;
        min-height: 80px;
        margin: 1px;
        cursor: pointer;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .swiper-slide{
        border: 1px solid #f0f0f0;
      }
      .active {
        border: 1px solid @base-button-back;
      }
    }
  }
  .swiper-button-disabled{
    display: none;
  }
  .swiper-button-prev, .swiper-button-next{
    width: 4.5vw;
    height: 5vw;
    min-width: 30px;
    min-height: 30px;
    background-size: 60% 100%;
    background-repeat: no-repeat;
    transition: .25s all;
  }
  .swiper-button-prev {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
  }
  .swiper-button-next {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E")
  }
  .swiper-button-prev:hover{
    background-position: left;
  }
  .swiper-button-next:hover{
    background-position: right;
  }
  @media (max-width: 920px) {
    .swiper-button-prev, .swiper-button-next{
      display: none;
    }
  }
  @media (max-width: 600px) {
    .vava-swiper{
      width: 100%;
    }
  }
  
</style>

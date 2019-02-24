<template>
  <div class="vava-swiper">
    <div v-swiper:mySwiper="swiperOp || swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) of swiperData" :key="index">
          <img style="cursor: grab;" :src="item">
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev" v-if="!swiperOp"></div><!--左箭头-->
      <div class="swiper-button-next" v-if="!swiperOp"></div><!--右箭头-->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      swiperData: Array,
      swiperOp: Object
    },
    data () {
      return {
        swiperOption: {
          speed: 1000, // 过度动画时长
          effect : 'coverflow', // 切换效果 3D
          autoplay: { // 自动切换
            delay: 3000, //2秒切换一次
            waitForTransition: false
          },
          coverflowEffect: { // 切换效果配置
            depth: 500
          },
          navigation: { //  前进后退标签
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true
          },
          pagination: { // 分页指示
            el: '.swiper-pagination',
            dynamicBullets: true,
            clickable :true
          }
        }
      }
    },
    created () {
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .vava-swiper{
    width: 100%;
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
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z' fill='#FFFFFF'/></svg>")
  }
  .swiper-button-next {
    background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 44'><path d='M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z' fill='#FFFFFF'/></svg>")
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
</style>

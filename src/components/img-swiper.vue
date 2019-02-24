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
</style>

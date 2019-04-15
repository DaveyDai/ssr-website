<template>
  <div class="vava-swiper">
    <div v-swiper:mySwiper="swiperType===0?swiperOption0:swiperOption1">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev" v-if="swiperType === 1"></div>
      <div class="swiper-button-next" v-if="swiperType === 1"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      swiperType: Number
    },
    data () {
      return {
        swiperOption0: {
          speed: 1000, // 过度动画时长
          effect : 'coverflow', // 切换效果 3D
          autoplay: { // 自动切换
            delay: 3000, //2秒切换一次
            waitForTransition: false
          },
          coverflowEffect: { // 切换效果配置
            depth: 500
          },
          // navigation: { //  前进后退标签
          //   nextEl: '.swiper-button-next',
          //   prevEl: '.swiper-button-prev',
          //   hideOnClick: true
          // },
          pagination: { // 分页指示
            el: '.swiper-pagination',
            // dynamicBullets: true,
            clickable :true
          }
        },
        swiperOption1: { // 横向轮播图片
          freeMode: true,
          slidesPerView: 'auto',
          spaceBetween: 30, // 间隔
          breakpoints: { // 适应屏幕宽度
            1680: { spaceBetween: 25 },
            1400: { spaceBetween: 20 },
            1050: { spaceBetween: 10 },
            650: { spaceBetween: 5 }
          },
          // slidesOffsetAfter: 100,
          speed: 1500, // 速度
          autoplay: {
            disableOnInteraction: false,
            waitForTransition: false
          },
          navigation: { //  前进后退标签
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-swiper{
    width: 100%;
    .swiper-pagination-bullet-active{
      background: #FFF;
    }
  }
  .swiper-button-disabled{
    display: none;
  }
  .swiper-button-prev, .swiper-button-next{
    width: 2.5vw;
    height: 2vw;
    min-width: 30px;
    min-height: 30px;
    background-size: 60% 100%;
    background-repeat: no-repeat;
    transition: .25s all;
  }
  .swiper-button-prev {
    // background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIzOC44NjYiIHZpZXdCb3g9IjAgMCAyNCAzOC44NjYiPjxwYXRoIGQ9Ik0zMiwzOS44LDE3LjE2NiwyNC45MzMsMzIsMTAuMDY3LDI3LjQzMyw1LjUsOCwyNC45MzMsMjcuNDMzLDQ0LjM2NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04IC01LjUpIiBmaWxsPSIjZmZmIi8+PC9zdmc+');
  }
  .swiper-button-next {
    // background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNS4wNSIgaGVpZ2h0PSI0MC41NjciIHZpZXdCb3g9IjAgMCAyNS4wNSA0MC41NjciPjxwYXRoIGQ9Ik04LjU5LDQxLjU1LDI0LjA3MywyNi4wMzQsOC41OSwxMC41MTcsMTMuMzU3LDUuNzUsMzMuNjQsMjYuMDM0LDEzLjM1Nyw0Ni4zMTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC41OSAtNS43NSkiIGZpbGw9IiNmZmYiLz48L3N2Zz4=');
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

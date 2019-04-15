<template>
  <div class="about-us">
    <img src="/static/website-imgages/about/life-made-simple.jpg" alt="">
    <img src="/static/website-imgages/about/who-we-are.jpg" alt="">
    <img v-lazy="'/static/website-imgages/about/vava-was-born.jpg'">
    <img v-lazy="'/static/website-imgages/about/here-we-are.jpg'">
    <img v-lazy="'/static/website-imgages/about/vava-future.jpg'">
  </div>
</template>

<style lang="less" scoped>
  .about-us{
    min-height: 70%;
    font-size: 0;
    img{
      width: 100%;
      min-height: 46vw;
    }
  }
</style>

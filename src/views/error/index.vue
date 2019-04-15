<template>
  <div class="vava-website-error">
    <img src="/src/assets/images/404.jpg" alt="">
  </div>
</template>

<style lang="less" scoped>
  .vava-website-error{
    width: 100%;
    min-height: 70%;
    img{
      width: 100%;
    }
  }
  @media (max-width: 920px){
    .vava-website-error{
      height: auto;
      img{margin-top: 0;}
    }
  }
  @media (max-width: 800px){
    .vava-website-error{
      min-height: 50%!important;
    }
  }
</style>

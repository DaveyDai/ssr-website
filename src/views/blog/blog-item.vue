<template>
  <div class="blog-item">
    <div class="blog-item-img"><slot name="item-img"></slot><span v-if="label">{{label}}</span></div>
    <div class="blog-item-title"><slot name="item-title"></slot></div>
    <div class="blog-item-describe"><slot name="item-describe"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String
    }
  }
</script>

<style lang="less" scoped>
  .blog-item{
    position: relative;
    width: 100%;
    .blog-item-img{
      position: relative;
      width: 100%;
      img{
        width: 100%;
      }
      span{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .blog-item-title{

    }
  }
  .blog-img-home{
    
  }
  .blog-img-item{

  }
</style>


<template>
  <div id="app">
    <page-header v-if="!isBlogHeader"></page-header>
    <blog-header v-else></blog-header>
    <transition name="fade" mode="out-in">
      <router-view class="vava-page-content" :class="$store.state.mediaDevices ? 'is-mobile':''"></router-view>
    </transition>
    <page-footer v-if="!isBlogHeader" v-show="!isHideFooter"></page-footer>
    <blog-footer v-else></blog-footer>
    <div class="footer-reserved" v-if="!isHideFooter"><span></span><p>© 2019 VAVA All rights reserved.</p></div>
  </div>
</template>

<script>
  import { invokeGetShoppingCart } from '@/api/invoke.js'
  import PageHeader from '@/components/page-header.vue'
  import PageFooter from '@/components/page-footer.vue'
  const BlogHeader = () => import('@/components/vava-blog-header.vue') // blog-头部
  const BlogFooter = () => import('@/components/blog-page-footer.vue') // blog-尾部
  export default {
    components: { PageHeader, PageFooter, BlogHeader, BlogFooter },
    data () {
      return {
        isBlogHeader: false, // 是否显示blog页面的
        isHideFooter: false // 是否隐藏footer
      }
    },
    watch: {
      $route (route) { // 监听路由
        this.isBlogHeader = !!route.meta.blog
        this.isHideFooter = this.$route.meta.isShoppingcart && this.$store.state.mediaDevices
      }
    },
    created () {
      this.isBlogHeader = !!this.$route.meta.blog
      this.isHideFooter = this.$route.meta.isShoppingcart && this.$store.state.mediaDevices // 移动端购物时 是不显示footer的
    },
    beforeMount () { // 虽然没什么用 但还是买个保险稳妥一点  万一node端判断设备失败了呢
      this.$store.commit('setMediaDevices', this.$utils.browserRedirect())
    },
    mounted () {
      this.isHideFooter = this.$route.meta.isShoppingcart && this.$store.state.mediaDevices // 这个也是稳妥一点才加上
      invokeGetShoppingCart(this, true) // 获取购物车列表
    }
  }
</script>

<style lang="less">
  @import '~@/common/styles/base.less';
  @import '~@/common/swiper/swiper.min.less';
  #app {
    height: 100%;
    width: 100%;
    background: #FFF;
    overflow: hidden;
    padding-top: 3.658vw;
    min-width: 320px;
    .vava-page-content{
      position: relative;
      width: 100%;
      min-height: 45vw;
    }
    .footer-reserved{
      width: 100%;
      background-color: #2e1f5b;
      padding: 0.52vw 9%;
      span{
        display: inline-block;
        width: 100%;
        height: 0.052vw;
        background-color: #9691ad;
      }
      p{font-size: 0.625vw;color: #bababb;margin-top: 0.52vw;}
    }
  }
  @media (max-width: 1920px) {#app{padding-top: 70px;}}
  @media (max-width: 1660px) {#app .footer-reserved{padding: 10px 8%;span{height: 1px;}p{font-size: 12px;}}}
  @media (max-width: 920px) {#app{padding-top: 60px;}}
  @media (max-width: 800px) {#app .footer-reserved{padding: 0 20px 20px 20px;margin-top: -10px;}}
  @media (max-width: 320px) {#app{width: 320px;overflow-x: scroll;}}
</style>

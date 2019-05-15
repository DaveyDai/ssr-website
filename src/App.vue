<template>
  <div id="app">
    <page-header v-if="!isBlogHeader"></page-header>
    <blog-header v-else></blog-header>
    <transition name="fade" mode="out-in">
      <router-view class="vava-page-content" :class="isMobileShow ? 'is-mobile':''"></router-view>
    </transition>
    <page-footer v-if="!isBlogHeader" v-show="!isHideFooter"></page-footer>
    <blog-footer v-else></blog-footer>
    <div class="footer-reserved" v-if="!isHideFooter"><span></span><p>© 2019 VAVA All rights reserved.</p></div>
  </div>
</template>

<script>
  import PageHeader from '@/components/page-header.vue'
  import PageFooter from '@/components/page-footer.vue'
  const BlogHeader = () => import('@/components/vava-blog-header.vue') // blog-头部
  const BlogFooter = () => import('@/components/blog-page-footer.vue') // blog-尾部
  export default {
    components: { PageHeader, PageFooter, BlogHeader, BlogFooter },
    data () {
      return {
        isBlogHeader: false, // 是否显示blog页面的
        isHideFooter: false, // 是否隐藏footer
        isMobileShow: false // 是否响应小屏幕显示
      }
    },
    watch: {
      $route (route) { // 监听路由
        this.isBlogHeader = !!route.meta.blog
      }
    },
    created () {
      this.isBlogHeader = !!this.$route.meta.blog
    },
    mounted () {
      this.isMobileShow = this.$utils.browserRedirect() // 判断当前是否移动设备
      this.$store.commit('setMediaDevices', this.isMobileShow)
      this.isHideFooter = this.$route.meta.isShoppingcart && (this.isMobileShow || document.body.clientWidth < 875)  // 购物车页面 且是移动端设备或显示区域小于875不显示footer
      window.onresize = () => { // 监听浏览器显示区域变化
        this.isHideFooter = this.$route.meta.isShoppingcart && (document.body.clientWidth < 875 || this.isMobileShow)
      }
      this.getShoppingCart()
    },
    methods: {
      getShoppingCart () { // 获取本地缓存购物车列表
      }
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

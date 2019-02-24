<template>
  <div id="app">
    <page-header></page-header>
    <transition name="fade" mode="out-in">
      <router-view class="vava-page-content"></router-view>
    </transition>
    <page-footer></page-footer>
    <div class="footer-reserved"><span></span><p>© 2018 VAVA All rights reserved.</p></div>
  </div>
</template>

<script>
  import PageHeader from '@/components/page-header.vue'
  import PageFooter from '@/components/page-footer.vue'
  // import { mapGetters } from 'vuex'
  export default {
    // computed: { ...mapGetters(['catalogList']) },
    components: { PageHeader, PageFooter },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="less">
  @import '~@/common/styles/base.less';
  @import '/static/style/swiper.min.css';
  #app {
    position: fixed;
    width: 100vw;
    height: 100vw;
    height: 100%;
    width: 100%;
    background: #FFF;
    overflow-y:scroll;
    overflow-x:hidden;
    padding-top: 10.4vw;
    min-width: 320px;
    -webkit-overflow-scrolling: touch;
    .vava-page-content{
      position: relative;
      width: 100%;
      // min-height: 70%;
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
  .app-page-read{
    padding-top: 60px!important;
  }
  @media (max-width: 1660px) {#app .footer-reserved{padding: 10px 8%;span{height: 1px;}}}
  @media (max-width: 920px) {#app{padding-top: 60px;}}
  @media (max-width: 800px) {#app .footer-reserved{padding: 0 20px 20px 20px;margin-top: -10px;p{font-size: 12px;}}}
  @media (max-width: 320px) {
    #app{width: 320px;overflow-x: scroll;}
  }
</style>

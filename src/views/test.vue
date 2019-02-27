<!-- 404错误页面 -->
<template>
  <div class="error-conn">
  <div class="vava-product-list" @click="getStore">
    <count-time ref="countTime"></count-time>
    <div>{{$t('login.forgotPassword')}}</div>
    <div class="vava-button" @click="change('zh')">中文</div>
    <div class="vava-button" @click="change('en')">英文</div>
  </div>
<div class="icon icon-download"></div>
<div class="icon icon-close"></div>
<div class="icon icon-menu"></div>
<div class="icon icon-selected"></div>
<div class="icon icon-facebook"></div>
<div class="icon icon-turned"></div>
<div class="icon icon-down"></div>
<div class="icon icon-instagram"></div>
<div class="icon icon-log-in"></div>
<div class="icon icon-right-slide"></div>
<div class="icon icon-search"></div>
<div class="icon icon-shopping-cart"></div>
<div class="icon icon-twitter"></div>
<div class="icon icon-youtube"></div>
<div class="icon icon-account-user"></div>
<div class="icon icon-account-position"></div>
<div class="icon icon-account-card"></div>
<div class="icon icon-account-lock"></div>
  </div>
</template>
<script>
import CountTime from '@/components/count-time.vue'
  export default {
    components: { CountTime },
    computed: {
      testData () {
        return this.$store.state.testData
      }
    },
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('页面组件asyncData')
      // return store.dispatch('requestPost', 'signIn', { test: '我是测试33', time: 100 })
    },
    // 定义变量
    data () {
      return {
        loading: true,
        dateAgo: 1000
      }
    },
    // 引入组件
    props: {},
    mounted: function () {
    },
    // 方法
    methods: {
      getStore () {
        this.$store.dispatch('testData', { test: '我是测试4444', time: 500 })
      },
      startTime () {
        this.$refs.countTime.startTimeOut()
      },
      change (lang) {
        this.$i18n.locale = lang
        this.$cookies.set('language', lang)
        // this.$store.commit('setLanguage', lang)
      }
    }
  }
</script>
<style lang="less" scoped >
  .error-conn{
    .vava-product-list{
      color: @base-color;
      font-size: 10px;
      display: flex;
      .vava-button{
        height: 40px;
        padding: 0 25px;
        line-height: 36px;
        font-size: 20px;
        color: #FFF;
        background-color: @base-color;
        border-radius: 20px;
        cursor: pointer;
      }
    }
 	  width: 1200px;
 	  margin: 60px auto;
 	  text-align: center;
     margin-bottom: 100px;
     display: flex;
     flex-wrap: wrap;
 	  .icon{
       font-size: 35px;
       margin-right: 40px;
       margin-bottom: 40px;
       color: #717175
     }
  }
</style>

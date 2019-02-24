<template>
  <div class="vava-product-list" @click="getStore">
    <count-time ref="countTime"></count-time>
    <div class="vava-button" @click="startTime">开始计时</div>
    <div>{{$t('login.forgotPassword')}}</div>
    <div class="vava-button" @click="change('zh')">中文</div>
    <div class="vava-button" @click="change('en')">英文</div>
  </div>
</template>

<script>
  import ProductColor from './product-color.vue'
  import CountTime from '@/components/count-time.vue'
  export default {
    name: 'product-list',
    components: { ProductColor, CountTime },
    computed: {
      testData () {
        return this.$store.state.testData
      }
    },
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('页面组件asyncData')
      // return store.dispatch('requestPost', 'signIn', { test: '我是测试33', time: 100 })
    },
    data: () => ({
      loading: true,
      dateAgo: 1000
    }),
    created () {
    },
    mounted () {
      // this.$store.dispatch('requestPost', 'getRegister', { test: '我是测试33', time: 100 }).then(data => {
      //   console.log('成功===', data)
      // }).catch(error => {
      //   console.log('失败:', error)
      // })
    },
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
        this.$store.commit('setLanguage', lang)
      }
    }
  }
</script>

<style lang="less" scoped>
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
</style>

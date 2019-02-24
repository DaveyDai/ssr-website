<template>
  <div class="vava-product-list" @click="getStore">
    这是测试页面111------
  </div>
</template>

<script>

export default {
  name: 'product-color',
  asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
    console.log('看看这里：', 1111)
    return store.dispatch('testData', { test: '我是测试33', time: 100 })
  },
  data: () => ({
    loading: true
  }),
  created () {
  },
  mounted () {
  },
  methods: {
    getStore () {
      this.$store.dispatch('testData', { test: '我是测试4444', time: 500 })
    }
  }
}
</script>

<style lang="less" scoped>
  // .vava-product-list{
  //   color: @base-color;
  //   font-size: 50px;
  //   display: flex;
  //   box-sizing: border-box;
  // }
</style>

<template>
  <div class="product-detail">
    <detail-tabs v-model="viewIndex"></detail-tabs>
    <keep-alive>
      <component :is="filterView"></component>
    </keep-alive>
  </div>
</template>

<script>
  import DetailTabs from './detail-tabs.vue'
  import DetailOverview from './detail-overview.vue'
  import DetailSpecifications from './detail-specifications.vue'
  import DetailSupport from './detail-support.vue'
  import DetailBuynow from './detail-buynow.vue'
  export default {
    components: { DetailTabs },
    async asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('产品详情asyncData', route.params.pId)
      let param = {pageNo: 1, pageSize: 1000, condition: route.params.pId}
      let productDetail = {
        overviewData: await store.dispatch('postFetch', {api: 'getProOverview', data: param}),
        specs: await store.dispatch('getByUrl', {api: 'getProSpecs', data: route.params.pId}), // 获取产品参数数据
        support: {
          proFaq: await store.dispatch('postFetch', {api: 'getProFaq', data: param}), // 获取产品faq
          proDownload: await store.dispatch('getByUrl', {api: 'getProDownload', data: route.params.pId}) // 获取产品附件
        },
        buynow: await store.dispatch('getByUrl', {api: 'getProBuynow', data: route.params.pId}) // 获取产品buynow
      }
      return new Promise((resolve, reject) => {
        console.log('产品详情数据:', productDetail)
        store.commit('setProductDetail', productDetail)
        resolve()
      })
    },
    data () {
      return {
        viewIndex: 0,
        filterView: undefined
      }
    },
    watch: {
      viewIndex () {
        this.showView()
        window.document.getElementById('app').scrollTo(0, 0)
      }
    },
    created () {
      this.showView()
    },
    methods: {
      showView () {
        switch (this.viewIndex) {
          case 0:
            this.filterView = DetailOverview
            break
          case 1:
            this.filterView = DetailSpecifications
            break
          case 2:
            this.filterView = DetailSupport
            break
          case 3:
            this.filterView = DetailBuynow
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail{
    width: 100%;
    padding-top: 4.166vw;
    min-height: 70%;
  }
  .app-page-read .product-detail .product-detail-tabs{ top: 3.125vw; }
  @media (max-width: 1920px){
    .app-page-read .product-detail .product-detail-tabs{ top: 58px; }
  }
  @media (max-width: 1200px) {
    .product-detail{
      padding-top: 50px;
    }
  }
  @media (max-width: 920px) {
    .product-detail{
      .product-detail-tabs{
        top: 60px;
      }
    }
  }
  // @media (max-width: 800px) {
  //   .product-detail{
  //   }
  // }
  // @media (max-width: 600px) {
  //   .product-detail{
  //   }
  // }
  // @media (max-width: 374px) {
  //   .product-detail{
  //   }
  // }
</style>

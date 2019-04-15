<template>
  <div class="product-detail" :class="!(overData[0].isHidden&&overData[1].isHidden&&overData[2].isHidden)?'is-show-tabs':''">
    <detail-tabs v-if="!(overData[0].isHidden&&overData[1].isHidden&&overData[2].isHidden)" v-model="viewIndex" :over-data="overData"></detail-tabs>
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
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      let param = {pageNo: 1, pageSize: 1000, condition: route.params.pId}
      return new Promise((resolve, reject) => {
        Promise.all([
          store.dispatch('postFetch', {api: 'getProOverview', data: param}).catch(data => { console.log('Server Error', data) }), // overview数据
          store.dispatch('getByUrl', {api: 'getProSpecs', data: route.params.pId}).catch(data => { console.log('Server Error', data) }), // 获取产品参数数据
          store.dispatch('postFetch', {api: 'getProFaq', data: param}).catch(data => { console.log('Server Error', data) }), // 获取产品faq
          store.dispatch('getByUrl', {api: 'getProDownload', data: route.params.pId}).catch(data => { console.log('Server Error', data) }), // 获取产品附件
          store.dispatch('getByUrl', {api: 'getProBuynow', data: route.params.pId}).catch(data => { console.log('Server Error', data) }) // 获取产品buynow
        ]).then(result => {
          store.commit('setProductDetail', {
            overviewData: result[0] ? result[0] : {},
            specs: result[1] ? result[1] : {},
            support: { proFaq: result[2] ? result[2] : {}, proDownload: result[3] ? result[3] : {} },
            buynow: result[4] ? result[4] : {}
          })
          resolve()
        })
      })
    },
    data () {
      return {
        viewIndex: 0,
        filterView: undefined,
        overData: [{dicValue: 'OVERVIEW', isHidden: false}, {dicValue: 'SPECIFICATIONS', isHidden: false}, {dicValue: 'SUPPORT', isHidden: false}, {dicValue: 'BUY NOW', isHidden: false}]
      }
    },
    watch: {
      viewIndex () {
        this.showView()
        if (typeof window !== 'undefined') {
          window.document.getElementsByTagName('html')[0].scrollTop = 0
          try {window.scrollTo(0,0)}catch(e){console.log(e)}
        }
      }
    },
    created () {
      // 数据没有的tab不显示
      let detailData = this.$store.state.productDetail
      if (!detailData.overviewData.total) {
        this.viewIndex = 1
        this.overData[0].isHidden = true
      }
      if (!detailData.specs.productSpecsBos || detailData.specs.productSpecsBos.length === 0) {
        this.viewIndex = 3
        this.overData[1].isHidden = true
      }
      if ((!detailData.support.proDownload.productAttachmentDetailBos ||
      detailData.support.proDownload.productAttachmentDetailBos.length === 0) && !detailData.support.proFaq.total) {
        // this.viewIndex = 3
        this.overData[2].isHidden = true
      }
      if (!detailData.buynow.productSkuDetailBos || detailData.buynow.productSkuDetailBos.length === 0) {
        this.viewIndex = 0
        this.overData[3].isHidden = true
      }
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
    min-height: 80vh;
  }
  .is-show-tabs{
    padding-top: 4.166vw;
  }
  .app-page-read .product-detail .product-detail-tabs{
    background: rgba(248, 248, 248, 0.9);
    &:hover{
      background: #FFF;
    }
  }
  @media (max-width: 1200px) {
    .is-show-tabs{
      padding-top: 50px;
    }
  }
  @media (max-width: 920px) {
    .product-detail{
      .product-detail-tabs{
        top: 60px;
      }
    }
    .app-page-read .product-detail .product-detail-tabs{
      background: #FFF;
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

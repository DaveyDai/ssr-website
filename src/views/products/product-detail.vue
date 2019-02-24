<template>
  <div class="product-detail">
    <detail-tabs v-model="viewIndex"></detail-tabs>
    <keep-alive>
      <component :is="filterView" :view-data="viewData"></component>
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
      console.log('产品详情asyncData', route.params.pId)
      // return store.dispatch('queryCategory', {api: 'signIn', cId: route.params.cId})
    },
    data () {
      return {
        viewIndex: 3,
        filterView: '',
        viewData: '',
        imgData: [
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Banner.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Icon.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Comprehensive Computer.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Replace.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/General.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Technical Specifications.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Power Input.jpg',
          '/static/product-pages/ACCESSORY/Hub-VA-DK003/Notes.jpg',
        ],
        specData: {
          product: {productName: 'VAVA USB HUB<br/>VA-UC005', productImg: '/static/vacuum/01-首图_VA-UC005.254.png'},
          specDetail: [
            {specsKey: 'Dimensions', specsValue: '533 x 368 x 107 mm'},
            {specsKey: 'What’s in the Box Projection System Docking Station Ports (003)', specsValue: 'Display Type : DLP<br/>Light Source : Laser ( ALPD 3.0 )Laser ( ALPD 3.0 )Laser ( ALPD 3.0 )Laser ( ALPD 3.0 )Laser ( ALPD 3.0 )<br/>Laser Safety Class : Class 1<br/>Throw Rate : 0.233<br/>Projection Size : Up to 150”<br/>Resolution: 4K<br/>Brightness : 2000 Lumen<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;( 100%CLO / 6000 Lumen / Light Source )<br/>Luminance Uniformity : >80%<br/>Contrast Ratio : > 300:1 ( ANSI ) / >3000:1 ( FOFO )<br/>Color Gamut : Rec.709'},
            {specsKey: 'Audio', specsValue: 'Speaker : Harman / Kardon, 30 W<br/>Bluetooth In : Yes ( Connect with phones )<br/>Bluetooth Out : Yes ( Connect with BT speaker )<br/>DTS : Yes<br/>Dolby : Yes'},
            {specsKey: 'Interfaces', specsValue: 'Speaker : Harman / Kardon, 30 W<br/>Bluetooth In : Yes ( Connect with phones )<br/>Bluetooth Out : Yes ( Connect with BT speaker )<br/>DTS : Yes<br/>Dolby : Yes'}
          ]
        },
        supportData: {
          product: {productName: 'VAVA USB HUB<br/>VA-UC005', productImg: '/static/vacuum/01-首图_VA-UC005.254.png'},
          faqData: [],
          downfileData: []
        }
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
    mounted () {
    },
    methods: {
      callback (e) {
      },
      routerLink (path) {
        this.$router.push(path)
      },
      showView () {
        // this.filterView =  this.viewIndex === 0 && DetailOverview || this.viewIndex === 1 && DetailSpecifications || this.viewIndex === 2 && DetailSupport || this.viewIndex === 3 && DetailBuynow || ''
        switch (this.viewIndex) {
          case 0:
            this.viewData = this.imgData
            this.filterView = DetailOverview
            break
          case 1:
            this.viewData = this.specData
            this.filterView = DetailSpecifications
            break
          case 2:
            this.viewData = this.supportData
            this.filterView = DetailSupport
            break
          case 3:
            this.viewData = {}
            this.filterView = DetailBuynow
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail{
    padding-top: 4.166vw;
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

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
        store.commit('setProductDetail', productDetail)
        resolve()
        // store.dispatch('postFetch', {api: 'getProOverview', data: param}).then(data => { // 获取产品overview数据
        //   store.commit('setProductDetail', {key: 'overviewData', data: data.data})
        //   resolve()
        // }).catch(error => { reject(error) })
      })
    },
    data () {
      return {
        viewIndex: 2,
        filterView: undefined,
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
    computed: {
      productDetail () {
        return this.$store.state.productDetail
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
      // {"overviewData":{"pageNum":1,"pageSize":100,"size":10,"total":10,"pages":1,"startRow":1,"endRow":10,"prePage":1,"nextPage":1,"hasPreviousPage":false,"hasNextPage":false,"records":[{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/f3c9c1ccd2.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/033aa4ef1d.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/f30b5d0ba8.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/22b7b32bba.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/bc86bc58a9.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/7786eeea8e.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/c1141a45b4.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/b8794498b4.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/49906fbae9.jpg"},{"overviewImageUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/8cc8999191.jpg"}],"firstPage":true,"lastPage":true},"specs":{"productName":"ROBOTIC VACUUM","shortName":"VACUUM","productMainUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/1b4dce1b2e.png","model":"aedsffw32","productSpecsBos":[{"specsKey":"aaa","specsValue":"bbb"},{"specsKey":"ccc","specsValue":"ddd"},{"specsKey":"eee","specsValue":"fff"},{"specsKey":"ggg","specsValue":"hhh"},{"specsKey":"iii","specsValue":"yyy"}]},"support":{"proFaq":{"pageNum":1,"pageSize":100,"size":3,"total":3,"pages":1,"startRow":1,"endRow":3,"prePage":1,"nextPage":1,"hasPreviousPage":false,"hasNextPage":false,"records":[{"question":"提问1","answer":"回答1"},{"question":"提问2","answer":"回答2"},{"question":"提问3","answer":"回答3"}],"firstPage":true,"lastPage":true},"proDownload":{"productName":"ROBOTIC VACUUM","shortName":"VACUUM","productMainUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/1b4dce1b2e.png","model":"aedsffw32","productAttachmentDetailBos":[{"uuid":"bc1746c78f594280b27eac20237faa36","attachmentCode":"PRODUCT_ATTACH_FIRMWARE_V","attachmentName":"员工目标卡1","attachmentUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/file/2019/03/01/18aa5e8f5b.docx","attachmentSuffix":"docx"},{"uuid":"ba96e874496040298e7e0a40165f9fb3","attachmentCode":"PRODUCT_ATTACH_FIRMWARE_V","attachmentName":"AmazonSignController","attachmentUrl":"https://dqqvg67sziwi8.cloudfront.net/dev/file/2019/03/01/c6bb26023f.java","attachmentSuffix":"java"}]}},"buynow":{"productName":"ROBOTIC VACUUM","shortName":"VACUUM","labelCode":"","amazonKeyword":"amazonKeyword","model":"aedsffw32","highLights":["h1","h3","h4","h345","h324trefd"],"productSkuDetailBos":[{"skuId":"sku---11","colourCode":"PRODUCT_COLOUR_RED","colourName":"商品SKU红色","districtCode":"l_en","districtfName":"美国","asin":"asasd","listingPrice":123.21,"sellPrice":32.5,"productSkuImages":["https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/0b3cbbbba6.png","https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/0b3cbbbba6.png"]},{"skuId":"sku---22","colourCode":"PRODUCT_COLOUR_WHITE","colourName":"商品SKU白色","districtCode":"l_en","districtfName":"美国","asin":"asassd","listingPrice":123.21,"sellPrice":32.5,"productSkuImages":["https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/0b3cbbbba6.png","https://dqqvg67sziwi8.cloudfront.net/dev/image/2019/03/01/0b3cbbbba6.png"]}]}}
      console.log(this.productDetail)
    },
    methods: {
      async getProSpecs () {
        await store.dispatch('getByUrl', {api: 'getProSpecs', data: this.$route.params.pId}).then(data => { // 获取产品overview数据
          store.commit('setProductDetail', {key: 'specs', data: data.data})
        }).catch(error => { 
          console.log(error)
        })
      },
      routerLink (path) {
        this.$router.push(path)
      },
      showView () {
        // this.filterView =  this.viewIndex === 0 && DetailOverview || this.viewIndex === 1 && DetailSpecifications || this.viewIndex === 2 && DetailSupport || this.viewIndex === 3 && DetailBuynow || ''
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

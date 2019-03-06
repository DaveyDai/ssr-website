<template>
  <div class="blog-detail">
    <vava-swiper class="blog-detail-banner" :swiper-type="0">
      <div class="swiper-slide" v-for="(item, index) of blogData.bannerData" :key="index">
        <img @click="jumpUrl(item.jumpUrl)" style="cursor: pointer;" :src="item.imageUrl">
      </div>
    </vava-swiper>
    <blog-tabs @click="handleClick" :label-data="blogData.labelData"></blog-tabs>
    <div class="blog-detail-content">
      <blog-item class="blog-img-home" :label="item.labelCode ? dicTreeList[item.labelCode] : ''" v-for="(item, index) of blogDetailData.records" :key="index">
        <img @click="jumpUrl(item.jumpUrl)" slot="item-img" :src="item.imageUrl">
        <template slot="item-title">{{item.title}}</template>
        <template slot="item-describe">{{item.description}}</template>
      </blog-item>
    </div>
    <vava-pagination v-if="blogDetailData.total>0" class="blog-detail-pagination" :total="blogDetailData.total" :display="pageSize" :current-page="blogDetailData.pageNum" @pagechange="handleClickPage"></vava-pagination>
    <vava-subscribe class="blog-detail-subscribe"></vava-subscribe>
  </div>
</template>

<script>
  import BlogItem from './blog-item.vue'
  import BlogTabs from './blog-label-tabs.vue'
  import VavaPagination from '@/components/vava-pagination.vue'
  import VavaSwiper from '@/components/img-swiper.vue'
  import { mapGetters } from "vuex"
  export default {
    async asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      if (store.state.blogData.labelData.length === 0) {
        let labelData = await store.dispatch('postFetch', {api: 'getBlogLabel', data: {pageNo: 1, pageSize: 1000}})
        store.commit('setLabelData', labelData.records)
      }
      if (store.state.blogData.bannerData.length === 0) {
        let bannerData = await store.dispatch('getFetch', {api: 'getBlogBanner'})
        store.commit('setBannerData', bannerData.blogManagerBannerVos)
      }
      return new Promise((resolve, reject) => {
        store.dispatch('postFetch', {api: 'getBlogModule', data: {pageNo: 1, pageSize: 4, condition: route.params.label}}).then(data => {
          store.commit('setBlogDetailData', data)
          resolve()
        }).catch (error => {
          store.commit('setBlogDetailData', {})
          reject(error)
        })
      })
    },
    computed: {
      dicTreeList () {
        return this.$store.state.dicTreeList
      },
      blogDetailData () {
        return this.$store.state.blogDetailData
      },
      // ...mapGetters(["blogDetailData"])
    },
    components: { BlogItem, BlogTabs, VavaPagination, VavaSwiper },
    data () {
      return {
        blogData: this.$store.state.blogData,
        blogLabelId: this.$route.params.label,
        pageSize: 4
      }
    },
    methods: {
      handleClick (item) {
        this.blogLabelId = item.id
        this.getBlogModule(1)
      },
      getBlogModule (pageNo) {
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'getBlogModule', data: {pageNo: pageNo, pageSize: this.pageSize, condition: this.blogLabelId}}).then(data => {
          this.$store.commit('setBlogDetailData', data)
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        }).catch (error => {
          this.$store.commit('setBlogDetailData', {total: 0, records: []})
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        })
      },
      handleClickPage (page) {
        this.getBlogModule(page)
      },
      jumpUrl (path) {
        window.open(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-detail{
    width: 100%;
    .blog-detail-banner{
      width: 100%;
      font-size: 0;
      min-height: 34vw;
      img{width: 100%;}
      .swiper-pagination-bullet{background: @un-font-color;opacity: 1; margin: 0 4px;}
      .swiper-pagination-bullet-active{background: #FFF;}
      .swiper-button-prev, .swiper-button-next{display: none;}
      .swiper-pagination{width: 100%; bottom: 10px;}
    }
    .blog-detail-content{
      width: 100%;
      padding: 0 4.16vw;
    }
    .blog-detail-subscribe{
      margin-top: 6.25vw;
    }
    .blog-detail-pagination{
      margin-top: 8vw;
    }
  }
</style>


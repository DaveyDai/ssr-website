<template>
  <div class="blog-index">
    <vava-swiper class="blog-index-banner" :swiper-type="0">
      <div class="swiper-slide" v-for="(item, index) of blogData.bannerData" :key="index">
        <img @click="jumpUrl(item.jumpUrl)" style="cursor: pointer;" :src="item.imageUrl">
      </div>
    </vava-swiper>
    <blog-tabs @click="handleClick" :label-data="blogData.labelData"></blog-tabs>
    <div class="blog-index-content">
      <div v-for="(item, index) of blogData.homeData" :key="index">
        <h5 class="blog-content-title">{{item.moduleTitle}}</h5>
        <blog-item class="blog-img-home" :label="item.labelCode ? dicTreeList[item.labelCode] : ''">
          <img @click="jumpUrl(item.jumpUrl)" slot="item-img" v-lazy="item.imageUrl">
          <template slot="item-title">{{item.title}}</template>
          <template slot="item-describe">{{item.description}}</template>
        </blog-item>
        <div class="blog-index-content-li">
          <blog-item class="blog-img-item" :label="li.labelCode ? dicTreeList[li.labelCode] : ''" v-for="(li, index) of item.blogManagerModuleDetailVos" :key="index">
            <img @click="jumpUrl(li.jumpUrl)" slot="item-img" v-lazy="li.imageUrl">
            <template slot="item-title">{{li.title}}</template>
            <template slot="item-describe">{{li.description}}</template>
          </blog-item>
        </div>
      </div>
    </div>
    <vava-subscribe class="blog-index-subscribe"></vava-subscribe>
  </div>
</template>

<script>
  import BlogItem from './blog-item.vue'
  import VavaSwiper from '@/components/img-swiper.vue'
  import BlogTabs from './blog-label-tabs.vue'
  export default {
    async asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      let param = {pageNo: 1, pageSize: 1000, condition: {}}
      let blogData = {
        bannerData: await store.dispatch('getFetch', {api: 'getBlogBanner'}), // banner
        labelData: await store.dispatch('postFetch', {api: 'getBlogLabel', data: param}), // 标题
        homeData: await store.dispatch('postFetch', {api: 'getBlogHomeData', data: param}) // 分组数据
      }
      return new Promise((resolve, reject) => {
        store.commit('setBlogData', blogData)
        resolve()
      })
    },
    computed: {
      dicTreeList () {
        return this.$store.state.dicTreeList
      }
    },
    components: { BlogItem, VavaSwiper, BlogTabs },
    data () {
      return {
        blogData: this.$store.state.blogData
      }
    },
    methods: {
      handleClick (item) {
        this.$router.push('/blog/' + item.id)
      },
      jumpUrl (path) {
        window.open(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-index{
    width: 100%;
    .blog-index-banner{
      width: 100%;
      font-size: 0;
      min-height: 34vw;
      img{width: 100%;}
      .swiper-pagination-bullet{background: @un-font-color;opacity: 1;}
      .swiper-pagination-bullet-active{background: #FFF;}
      .swiper-button-prev, .swiper-button-next{display: none;}
    }
    .blog-index-content{
      width: 100%;
      padding: 0 4.16vw;
      .blog-content-title{
        text-align: center;
        font-size: 2.6vw;
        color: #4B4B4B;
        margin-top: 3.125vw;
        font-family: 'avenir-next-demi';
      }
      .blog-index-content-li{
        display: flex;
        .blog-img-item{
          margin-right: 1vw;
          margin-left: 1vw;
          &:first-child{ margin-left: 0; }
          &:last-child{ margin-right: 0; }
        }
      }
    }
    .blog-index-subscribe{
      margin-top: 6.25vw;
    }
  }
  @media (max-width:800px) {
    .blog-index{
      .blog-index-content{
        .blog-content-title{
          margin-top: 25px;
        }
      }
    }
  }
  @media (max-width:600px) {
    .blog-index{
      .blog-index-content{
        .blog-content-title{
          font-size: 15px;
        }
      }
    }
  }
</style>


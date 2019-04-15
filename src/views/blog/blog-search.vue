<template>
  <div class="blog-search">
    <div class="blog-search-results">
        <p class="search-results-keyword">Search results for: {{searchBlog.keyword}}</p>
        <div class="search-results-line"></div>
        <p class="search-results-dec" v-if="searchBlog.records.length > 0">{{searchBlog.total}} results for ‘ {{searchBlog.keyword}} ‘ found</p>
        <p class="search-results-dec" v-if="searchBlog.records.length === 0">Sorry, we couldn’t find a match for that. We suggest that you:</p>
        <div class="search-results-no" v-if="searchBlog.records.length === 0">
          <p><span></span>Please check the spelling.</p>
          <p><span></span>Please use different keywords.</p>
        </div>
    </div>
    <div class="blog-search-content">
      <!-- <blog-item  class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item> -->
      <blog-item class="blog-img-home" :label="item.labelCode ? dicTreeList[item.labelCode] : ''" v-for="(item, index) of searchBlog.records" :key="index">
        <img @click="jumpUrl(item.jumpUrl)" slot="item-img" v-lazy="item.imageUrl">
        <p slot="item-title" :title="item.title">{{item.title}}</p>
        <p slot="item-describe" :title="item.description">{{item.description}}</p>
      </blog-item>
    </div>
    <vava-pagination v-if="searchBlog.total && searchBlog.total>0" class="blog-search-pagination" :total="searchBlog.total" :display="pageSize" :current-page="searchBlog.pageNum" @pagechange="handleClickPage"></vava-pagination>
    <!-- <vava-subscribe class="blog-search-subscribe"></vava-subscribe> -->
  </div>
</template>

<script>
  import BlogItem from './blog-item.vue'
  import VavaPagination from '@/components/vava-pagination.vue'
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      return new Promise((resolve, reject) => {
        let param = {pageNo: 1, pageSize: 10, condition: route.query.keyword}
        store.dispatch('postFetch', {api: 'getBlogSearch', data: param}).then(json => { // 获取分类产品
          json.keyword = route.query.keyword
          store.commit('setSearchBlog', json)
          resolve()
        }).catch(error => {
          store.commit('setSearchBlog', {records: [], keyword: route.query.keyword})
          reject(error)
        })
      })
    },
    components: { BlogItem, VavaPagination },
    computed: {
      searchBlog () {
        return this.$store.state.searchBlog
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      }
    },
    data () {
      return {
        pageSize: 10
      }
    },
    methods: {
      getBlogSearch (pageNo) {
        this.$bar.start()
        this.$store.commit('setSearchBlog', Object.assign({}, this.searchBlog, {records: []}))
        this.$store.dispatch('postFetch', {api: 'getBlogSearch', data: {pageNo: pageNo, pageSize: this.pageSize, condition: this.$route.query.keyword}}).then(data => {
         data.keyword = this.$route.query.keyword
         this.$store.commit('setSearchBlog', data)
          if (typeof window !== 'undefined') window.document.getElementsByTagName('html')[0].scrollTop = 0
          this.$bar.finish()
        }).catch (error => {
          this.$store.commit('setSearchBlog', {total: 0, records: []})
          if (typeof window !== 'undefined') window.document.getElementsByTagName('html')[0].scrollTop = 0
          this.$bar.finish()
        })
      },
      handleClickPage (page) {
        this.getBlogSearch(page)
      },
      jumpUrl (path) {
        if (path) window.open(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-search{
    width: 100%;
    min-height: 50vw;
    .blog-search-results{
      width: 100%;
      padding: 6vw 1vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .search-results-keyword{
        font-size: 2.6vw;
        font-family: 'avenir-next-demi';
        color: #4B4B4B;
      }
      .search-results-line{
        width: 50%;
        min-width: 300px;
        height: 0.052vw;
        min-height: 1px;
        background: @un-font-color;
        margin: 2vw 0;
      }
      .search-results-dec{
        font-size: 1.56vw;
        color: @base-font-color;
      }
      .search-results-no{
        margin-top: 2vw;
        p{
          font-size: 1.56vw;
          color: @base-font-color;
          line-height: 1.4;
          display: flex;
          align-items: center;
          span{
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 0.5vw solid transparent;
            border-bottom: 0.5vw solid transparent;
            border-left: 0.5vw solid @base-button-back;
            margin-right: 1vw;
          }
        }
      }
    }
    .blog-search-content{
      width: 100%;
      padding: 0 4.16vw;
    }
    // .blog-search-subscribe{
    //   margin-top: 6.25vw;
    // }
    .blog-search-pagination{
      margin-top: 8vw;
      margin-bottom: 6.25vw;
    }
  }
  @media (max-width: 1200px){
    .blog-search .blog-search-results .search-results-no p span{
      border-width: 6px;
    }
  }
  @media (max-width: 800px){
    .blog-search{
      .blog-search-results{
        .search-results-line{
          margin: 15px 0;
        }
        .search-results-dec{
          font-size: 12px;
        }
        .search-results-no{
          margin-top: 15px;
          p{
            font-size: 12px;
          }
        }
      }
    }
  }
  @media (max-width: 600px){
    .blog-search{
      .blog-search-results{
        .search-results-keyword{
          font-size: 15px;
        }
        .search-results-line{
          margin: 15px 0;
        }
        .search-results-dec{
          font-size: 11px;
          padding: 0 10px;
          line-height: 1.4;
          text-align: center;
        }
        .search-results-no p{
          font-size: 11px;
          line-height: 2;
          span{border-width: 5px;margin-bottom: 2px;}
        }
      }
    }
  }
</style>
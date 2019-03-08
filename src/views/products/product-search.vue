<template>
  <div class="product-search">
    <div class="product-search-results">
        <p class="search-results-keyword">Search results for: {{searchProduct.keyword}}</p>
        <div class="search-results-line"></div>
        <p class="search-results-dec" v-if="searchProduct.records.length > 0">{{searchProduct.records.length}} results for ‘ {{searchProduct.keyword}} ‘ found</p>
        <p class="search-results-dec" v-if="searchProduct.records.length === 0">Sorry, we couldn’t find a match for that. We suggest that you:</p>
        <div class="search-results-no" v-if="searchProduct.records.length === 0">
          <p><span></span>Please check the spelling.</p>
          <p><span></span>Please use different keywords.</p>
        </div>
    </div>
    <div class="product-search-content">
      <div class="product-search-products">
        <li v-for="(item, index) of searchProduct.records" :key="index" @click="routerLink('/p/' + item.model)">
          <img :src="item.productMainUrl" alt="">
          <p class="main-products-title" :title="item.productName">{{item.productName}}</p>
        </li>
      </div>
    </div>
    <!-- <vava-pagination class="product-search-pagination" :total="total" :current-page='current' @pagechange="handleClickPage"></vava-pagination> -->
  </div>
</template>

<script>
  import VavaPagination from '@/components/vava-pagination.vue'
  export default {
    asyncData ({ store, route }) {
      return new Promise((resolve, reject) => {
        let param = {pageNo: 1, pageSize: 1000, condition: {searchName: route.params.keyword}}
        store.dispatch('postFetch', {api: 'getCategoryPro', data: param}).then(json => { // 获取分类产品
          console.log('搜索结果：', json)
          json.keyword = route.params.keyword
          store.commit('setSearchProduct', json)
          resolve()
        }).catch(error => {
          store.commit('setSearchProduct', {records: [], keyword: route.params.keyword})
          reject(error)
        })
      })
    },
    components: { VavaPagination },
    computed: {
      searchProduct () {
        return this.$store.state.searchProduct
      }
    },
    data () {
      return {
        bannerImg: ['/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg'],
        current: 1,
        total: 150, // 记录总条数
        resultsData: []
      }
    },
    methods: {
      routerLink (path) {
        this.$router.push(path)
      },
      handleClickPage (page) {
        console.log(page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-search{
    width: 100%;
    min-height: 70%;
    .product-search-results{
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
    .product-search-content{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      .product-search-products{
        display: flex;
        flex-wrap: wrap;
        padding: 0 5.7vw 6vw 5.7vw;
        li{
          width: 19.8vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.99vw;
          margin: 0 0.9375vw 4vw 0.9375vw;
          padding-bottom: 0.52vw;
          transition: box-shadow .3s, transform .3s;
          cursor: pointer;
          &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;transform: scale(1.05);}
          img{
            width: 100%;
            margin: 2.34vw 0;
            min-width: 19.7vw;
            min-height: 9.8vw;
          }
          .main-products-title{
            margin: 1.5vw 0 0.52vw 0;
            color: @base-font-color;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-align: center;
            line-height: 1.3;
            max-width: 90%;
          }
          .main-products-outof{
            color: @base-button-back;
          }
        }
      }
    }
    .product-search-subscribe{
      margin-top: 6.25vw;
    }
    .product-search-pagination{
      margin-top: 8vw;
    }
  }
  @media (max-width: 1200px){
    .product-search .product-search-results .search-results-no p span{
      border-width: 6px;
    }
  }
  @media (max-width: 920px) {
    .product-search .product-search-content{
      .product-search-products{
        padding: 0 5.5vw 6vw 5.5vw;
      }
    }
  }
  @media (max-width: 800px){
    .product-search{
      .product-search-results{
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
      .product-search-content{
        .product-search-products{
          padding: 0 5vw 6vw 5vw;
        }
      }
    }
  }
  @media (max-width: 600px){
    .product-search{
      .product-search-results{
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
      .product-search-content .product-search-products{
        padding: 0 5% 25px 5%;
        li{
          width: 31%;
          font-size: 10px;
        }
      }
    }
  }

</style>
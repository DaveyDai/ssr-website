<template>
  <div class="product-main">
    <img class="product-main-img" :src="categoryData.banner" alt="" v-if="categoryData.banner">
    <p class="product-main-title">CHOOSE YOUR PRODUCT</p>
    <div class="product-main-content">
      <div class="product-main-products">
        <li v-for="(item, index) of categoryData.pruductList.records" :key="index" @click="routerLink('/p/' + item.model)">
          <div class="product-li-img"><img :src="item.productMainUrl" alt=""></div>
          <p class="main-products-title" :title="item.shortName">{{item.shortName}}</p>
          <!-- <p class="main-products-outof">Out of Stock</p> -->
          <span class="products-label" v-if="item.labelCode">{{dicTreeList[item.labelCode]}}</span>
        </li>
      </div>
    </div>
    <!-- <vava-subscribe></vava-subscribe> -->
  </div>
</template>

<script>
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      return new Promise((resolve, reject) => {
        if (store.state.categoryData[route.params.cId]) {
          resolve()
        } else {
          let param = {pageNo: 1, pageSize: 100, condition: {categoryId: route.params.cId}}
          Promise.all([
            store.dispatch('getByUrl', {api: 'getCategoryBanner', data: route.params.cId}).catch(data => { console.log('Server Error', data) }), // 获取banner图
            store.dispatch('postFetch', {api: 'getCategoryPro', data: param}).catch(data => { console.log('Server Error', data) }) // 获取分类产品
          ]).then(result => {
            store.commit('setCategoryData', {cId: route.params.cId, banner: result[0] ? result[0].bannerUrl : '', pruductList: result[1] ? result[1] : {}})
            resolve()
          })
        }
      })
    },
    computed: {
      categoryData () {
        return this.$store.state.categoryData[this.$route.params.cId]
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      }
    },
    methods: {
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-main{
    width: 100%;
    min-height: 45vh;
    .product-main-img{
      width: 100%;
      min-height: 30vw;
    }
    .product-main-title{
      width: 100%;
      font-size: 2.6vw;
      color: @base-font-color;
      margin: 5.2vw 0 2.08vw 0;
      text-align: center; 
    }
    .product-main-content{
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
    .product-main-products{
      display: flex;
      flex-wrap: wrap;
      padding: 0 5.7vw 6vw 5.7vw;
      li{
        position: relative;
        width: 19.8vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.99vw;
        margin: 0 0.9375vw 4vw 0.9375vw;
        padding-bottom: 0.52vw;
        transition: box-shadow .3s, transform .3s;
        cursor: pointer;
        &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;}
        .product-li-img{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 14.5vw;
          img{
            width: 80%;
          }
        }
        .main-products-title{
          margin: 1.5vw 0 0.52vw 0;
          color: @base-font-color;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-align: center;
          max-width: 90%;
          height: 2.5vw;
          line-height: 1.25vw;
        }
        .main-products-outof{
          color: @base-button-back;
        }
        .products-label{
          position: absolute;
          top: 0.5vw;
          left: 0.5vw;
          background-color: @base-button-back;
          color: #FFF;
          padding: 0.5vw 1vw;
          font-size: 0.73vw;
          border-radius: 5vw;
          // height: 1.25vw;
          // min-height: 15px;
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .product-main{
      .product-main-products{
        li{
          font-size: 12px;
          .main-products-title{
            height: 31.25px;
            line-height: 15.625px;
          }
          .products-label{
            font-size: 9px;
          }
        }
      }
    }
  }
  @media (max-width: 920px) {
    .product-main{
      .product-main-products{
        padding: 0 5.5vw 6vw 5.5vw;
        li{margin-bottom: 40px;}
      }
    }
  }
  @media (max-width: 800px) {
    .product-main{
      .product-main-products{
        padding: 0 5vw 6vw 5vw;
        li{
          &:hover{box-shadow: none;transform: scale(1);}
          .products-label{
            font-size: 8px;
            padding: 4px 7px;
            border-radius: 0;
            padding-top: 5px;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .product-main{
      .product-main-title{font-size: 16px;margin: 20px 0;}
      .product-main-products{
        padding: 0 5% 25px 5%;
        li{
          width: 28%;
          font-size: 10px;
          margin: 0 2.4vw 40px 2.4vw;
        }
      }
    }
  }
  @media (max-width: 375px) {
    .product-main{
      .product-main-title{font-size: 14px;}
    }
  }
</style>

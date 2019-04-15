<template>
  <div class="user-manual">
    <img class="user-manual-img" src="/static/website-imgages/support/User Manual Banner.jpg">
    <p class="user-manual-title">CHOOSE YOUR PRODUCT</p>
    <div class="user-manual-content">
      <div class="user-manual-products">
        <li v-for="(item, index) of userManualData.records" :key="index" @click="showDown(item)">
          <div class="product-li-img"><img :src="item.productMainUrl" alt=""></div>
          <p class="main-products-title" :title="item.productName">{{item.shortName}}</p>
        </li>
      </div>
    </div>
	  <transition name="slide-fade">
      <down-files ref="manualDownload" :down-data="userManualDown" v-show="userManualDown.productAttachmentDetailBos.length > 0"></down-files>
    </transition>
  </div>
</template>

<script>
  import DownFiles from '@/components/down-files.vue'
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      return new Promise((resolve, reject) => {
        let param = {pageNo: 1, pageSize: 1000, condition: {}}
        store.dispatch('postFetch', {api: 'getUserManual', data: param}).then(data => { // 获取分类产品
          store.commit('setUserManual', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    components: { DownFiles },
    computed: {
      userManualData () {
        return this.$store.state.userManual
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      }
    },
    data () {
      return {
        userManualDown: {productAttachmentDetailBos: []},
        sendToEmail: ''
      }
    },
    methods: {
      queryProductList () {
        this.$bar.start()
        let param = {pageNo: 1, pageSize: 1000, condition: {}}
        this.$store.dispatch('postFetch', {api: 'getUserManual', data: param}).then(data => { // 获取分类产品
          this.$store.commit('setUserManual', data)
          this.$bar.finish()
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      showDown (item) {
        if (item.model === this.userManualDown.model) {
          let scrollTop = this.$refs.manualDownload.$el.offsetTop || document.getElementsByClassName('page-footer')[0].offsetTop
          window.document.getElementsByTagName('html')[0].scrollTop = scrollTop
          try {
            if (window.document.getElementsByTagName('html')[0].scrollTop === 0) window.scrollTo(0, scrollTop - 100)
          }catch(e){console.log(e)}
          return
        }
        // this.userManualDown = {productAttachmentDetailBos: []}
        this.sendToEmail = ''
        this.$bar.start()
        this.$store.dispatch('getByUrl', {api: 'getProDownload', data: item.model}).then(data => { // 获取产品附件
          this.userManualDown = data || {productAttachmentDetailBos: []}
          this.$nextTick(() => {
            let scrollTop = this.$refs.manualDownload.$el.offsetTop || document.getElementsByClassName('page-footer')[0].offsetTop
            window.document.getElementsByTagName('html')[0].scrollTop = scrollTop
            try {
              if (window.document.getElementsByTagName('html')[0].scrollTop === 0) window.scrollTo(0, scrollTop - 100)
            }catch(e){console.log(e)}
          })
          this.$bar.finish()
        }).catch(error => {
          console.log(error)
          if (error && error.message) this.$utils.message(error.message)
          this.$bar.finish()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .slide-fade-leave-active, .slide-fade-enter-active{
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(-100%);
    opacity: 0;
  }
  .user-manual{
    position: relative;
    width: 100%;
    min-height: 50vh;
    .user-manual-img{
      width: 100%;
    }
    .user-manual-title{
      width: 100%;
      font-size: 2.6vw;
      color: @base-font-color;
      margin: 5.2vw 0 2.08vw 0;
      text-align: center; 
    }
    .user-manual-content{
      width: 100%;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 199;
      background-color: #FFF;
    }
    // .user-manual-products{
    //   display: flex;
    //   flex-wrap: wrap;
    //   padding: 0 5.7vw 6vw 5.7vw;
    //   li{
    //     width: 19.8vw;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     font-size: 0.99vw;
    //     margin: 0 0.9375vw 3.125vw 0.9375vw;
    //     padding-bottom: 0.52vw;
    //     transition: box-shadow .3s, transform .3s;
    //     cursor: pointer;
    //     &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;transform: scale(1.05);}
    //     img{
    //       width: 100%;
    //       margin: 2.34vw 0;
    //       min-width: 19.7vw;
    //       min-height: 9.8vw;
    //     }
    //     .main-products-title{
    //       margin: 1.5vw 0 0.52vw 0;
    //       color: @base-font-color;
    //       display: -webkit-box;
    //       -webkit-box-orient: vertical;
    //       -webkit-line-clamp: 2;
    //       overflow: hidden;
    //       text-align: center;
    //       line-height: 1.3;
    //       max-width: 90%;
    //     }
    //   }
    // }
    .user-manual-products{
      display: flex;
      flex-wrap: wrap;
      padding: 0 5.7vw 6vw 5.7vw;
      li{
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
        &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;transform: scale(1.05);}
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
          height: 2.5vw;
          line-height: 1.25vw;
          max-width: 90%;
        }
        .main-products-outof{
          color: @base-button-back;
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .user-manual{
      .user-manual-products{
        li{
          font-size: 12px;
          .main-products-title{
            height: 31.25px;
            line-height: 15.625px;
          }
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .user-manual{
      .user-manual-products{
        li{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 920px) {
    .user-manual{
      .user-manual-products{
        padding: 0 5.5vw 6vw 5.5vw;
      }
    }
  }
  @media (max-width: 800px) {
    .user-manual{
      .user-manual-products{
        padding: 0 5vw 6vw 5vw;
        li:hover{
          box-shadow: none;transform: scale(1);
        }
      }
    }
  }
  @media (max-width: 600px) {
    .user-manual{
      .user-manual-title{font-size: 16px;margin: 20px 0;}
      .user-manual-products{
        padding: 0 5% 25px 5%;
        li{
          width: 28%;
          font-size: 10px;
          margin: 0 2.4vw 40px 2.4vw;
        }
      }
    }
  }
</style>

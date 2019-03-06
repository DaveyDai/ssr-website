<template>
  <div class="blog-header">
    <div :class="{'is-see-content': isSeecontent}" class="blog-header-option">
      <!-- logon -->
      <img @click="linkLogo" class="header-left-logo" :class="{'is-search': showSearch}" src="@/assets/images/logo.png">
      <!-- PC菜单 -->
      <div class="header-content">
        <nav class="header-menu" v-show="!showSearch">
          <li @click="routerLink('/blog')"><span>HOME</span><i></i></li>
        </nav>
        <!-- 搜索框 -->
        <form class="option-search-input" action="javascript:search();">
          <vava-search class="header-search" type="search" v-model="searchValue" :is-show="showSearch" @close="val => showSearch = val"></vava-search>
        </form>
      </div>
      <!-- 头部右侧按钮 -->
      <div class="header-right" :class="{'is-search': showSearch}">
        <span class="header-icon-pc icon icon-search" @click="openSearch"></span>
        <vava-country-img class="header-icon-pc" ref="vavaCountryImgPc" :click-show="showLang"></vava-country-img>
      </div>
    </div>
    <!-- 选择语言/地区 -->
    <div class="blog-header-country" ref="countryIsShow" :class="{'blog-header-country-show': countryIsShow}">
      <img @click="setCountry('l_en')" src="@/assets/images/country-icon/us.png" alt=""><img @click="setCountry('l_de')" src="@/assets/images/country-icon/germany.png" alt="">
      <img @click="setCountry('l_zh_CN')" src="@/assets/images/country-icon/china.png" alt=""><img @click="setCountry('l_jp')" src="@/assets/images/country-icon/japan.png" alt="">
    </div>
    <!-- 遮罩层 -->
    <div class="page-content-mask" @click="countryIsShow=isShowMask=false" :class="{'content-mask-show': isShowMask}"></div>
  </div>
</template>

<script>
  import VavaSearch from '@/components/vava-search.vue'
  import VavaCountryImg from '@/components/vava-country-img.vue'
  export default {
    components: { VavaSearch, VavaCountryImg },
    data () {
      return {
      	isShowMask: false, // 是否显示遮罩层
        countryIsShow: false, // 是否显示国家
        isSeecontent: false, // 是否阅读模式
        showSearch: false,
        menuList: [],
        searchValue: ''
      }
    },
    watch: {
      isShowMask (newValue) {
        document.getElementById('app').style.overflowY = newValue ? 'hidden' : 'scroll'
      }
    },
    mounted () {
      this.$nextTick(() => {
        document.getElementById('app').addEventListener("scroll", e => {
          this.isSeecontent = e.target.scrollTop > 10
          e.target.className = this.isSeecontent ? 'app-page-read' : ''
        })
        window.search = () => {
          this.startSearch()
        }
      })
    },
    methods: {
      linkLogo () {
        window.location.href = '/'
      },
      setHeaderPanel () { // 头部面板切换操作（防止重叠显示）
        
      },
      closeMask () {
        this.countryIsShow = this.isShowMask = false
      },
      openSearch () {
        console.log('打开搜索')
        this.countryIsShow = this.isShowMask = false
        this.showSearch = !this.showSearch
      },
      routerLink (path) {
        this.showSearch = this.countryIsShow = this.isShowMask = false
        this.$router.push(path)
        // window.document.getElementById('app').scrollTo(0, 0)
      },
      setCountry (type) { // 设置语言/地区
        this.$refs.vavaCountryImgPc.setCountry(type)
        this.showLang()
      },
      showLang () {
        this.showSearch = false
        this.isShowMask = this.countryIsShow = !this.countryIsShow
      },
      startSearch () {
        console.log(111, this.searchValue)
        // this.$router.push('/blog/search/' + this.$refs.blogSearch.searchValue)
      }
    }
  }
</script>

<style lang="less" scoped>
  @icon-size: 1.45vw;
  .blog-header{
    position: fixed;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: 1000;
    .blog-header-option{
      width: 100%;
      height: 10.4vw;
      transition: height .25s, background .25s;
      overflow: hidden;
      text-align: center;
      display: flex;
      align-items: center;
      background-color: #FFF;
      min-width: 280px;
      position: relative;
      z-index: 1001;
      .header-left-logo{
        height: 3.125vw;
        width: 12.5vw;
        margin-left: 5vw;
        margin-right: 1.2vw;
        cursor: pointer;
        transition: all 0.25s;
      }
      .phone-header-icon{
        margin-left: 4vw;
        font-size: 24px;
        cursor: pointer;
        display: none;
        &:hover{color: @base-color;}
      }
      .header-content{
        position: relative;
        height: 2.8vw;
        margin-top: 0.26vw;
        min-height: 45px;
        display: flex;
        align-items: center;
        .header-menu{
          display: flex;
          flex-wrap: nowrap;
          font-size: 0.95vw;
          padding-top: 0.8vw;
          li{
            color: @base-font-color;
            cursor: pointer;
            padding: 0 1vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            span{white-space: nowrap;}
            i{
              display: inline-block;
              height: 0.11vw;
              width: 0;
              background-color: @base-color;
              border-radius: 50px;
              transition: width .5s;
              margin-top: 0.5vw;
            }
          }
          li:hover{
            color: @base-color;
            i{width: 80%;}
          }
        }
        .header-search{
          position: absolute;
          top: 0;
          left: 2vw;
          width: 60vw;
          height: 100%;
        }
      }
      .header-right{
        display: flex;
        flex-wrap: nowrap;
        position: absolute;
        right: 5.4%;
        span{font-size: @icon-size; color: @base-icon-color; margin: 0 0.88vw; cursor: pointer;transition: all .5s;}
        span:hover{
          color: @base-color;
        }
        .phone-header-icon{display: none;}
      }
    }
    .is-see-content{
      height: 3.125vw;
      min-height: 60px;
      box-shadow: 0 0 15px rgba(0,0,0,.15);
      background: rgba(255, 255, 255, 0.4);
      .header-left-logo{
        height: 1.56vw;
        width: 6.25vw;
      }
      .header-content{
        height: 2vw;
        // min-height: 40px;
        .header-search{
          width: 55vw;
          input{font-size: 1vw;}
        }
        .header-menu{padding-top: 0.4vw;li{color: @base-font-color;}}
      }
      &:hover{
        background: #FFF;
        .header-content .header-menu li{color: @base-font-color;}
      }
    }
    .blog-header-country{
      position: relative;
      overflow: hidden;
      height: 0;
      width: 100%;
      background-color: #FFF;
      transition: .35s height ease-out;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      img{
        width: 4.427vw;
        height: 3.125vw;
        margin: 0 2.6vw;
        box-shadow: rgba(0, 0, 0, 0.2) 0.2vw 0.2vw 0.8vw;
        cursor: pointer;
      }
      img:hover{box-shadow: rgba(0, 0, 0, 0.4) 0 0 1vw;}
    }
    .blog-header-country-show{height: 5.2vw;}
    .page-content-mask{
    	position: absolute;
    	top: 0;
      width: 0;
      height: 0;
      opacity: 0;
      background: #000;
      transition: .35s opacity ease-out;
    }
    .content-mask-show{width: 100vw;height: 100vh;opacity: .6;}
  }
  @media (max-width: 1678px) { // 1680
    .blog-header{
      .blog-header-option{
        .header-content .header-menu{
          li{i{height: 2px;}}
        }
      }
      .is-see-content{
        .header-content{
          .header-search{
            input{font-size: 18px;}
          }
        }
        .header-left-logo{
          width: 108px;
          height: 27px;
        }
      }
      .blog-header-country{
        img{width: 74px;height: 52.5px;margin: 0 35px;}
      }
      .blog-header-country-show{height: 87.5px;}
    }
  }
  @media (max-width: 1450px) {
    .blog-header{
      .blog-header-option{
        .header-content .header-menu{
          li{padding: 0 0.8vw;}
          font-size: 14px;
        }
        .header-right{
          right: 3.8%;
          span{font-size: 21px;}
        }
      }
      .blog-header-country{
        img{width: 60px;height: 42px;margin: 0 25px;}
      }
      .blog-header-country-show{height: 73px;}
    }
  }
  @media (max-width: 1150px) {
    .blog-header .blog-header-option{
      .header-content .header-menu{
        margin-left: 10px;
        font-size: 13px;
      }
      .header-left-logo{margin-left: 3vw;}
      .header-right span{margin: 0 10px;}
    }
    .blog-header .is-see-content .header-left-logo{
      width: 84px;
      height: 21px;
    }
  }
  @media (max-width: 920px) {
    .blog-header{top: -1px;}
    .blog-header .blog-header-option .header-content .header-search{
      height: 40px!important;
      width: 60vw!important;
      input{border-radius: 30px;}
    }
  }
  @media (max-width: 800px) {
    .blog-header .blog-header-option{
      .header-content .header-menu{
        padding-top: 5px;
        font-size: 13px;
      }
      .header-left-logo{margin-left: 3vw;}
    }
    .blog-header .blog-header-option{
      height: 60px;
      .header-left-logo{
        width: 84px;
        height: 21px;
      }
    }
    .blog-header .blog-header-option .header-content .header-search{
      input{border-radius: 30px;padding: 0 35px 0 20px;border-width: 1px;font-size: 18px;}
      span{
        width: 35px;
        i{font-size: 16px;}
      }
    }
  }
  @media (max-width: 600px) {
    .blog-header .blog-header-option{
      .is-search{
        display: none;
      }
      .header-content .header-search{
        height: 40px!important;
        width: 90vw!important;
        input{border-radius: 30px;}
        position: fixed;
        top: 10px;
        z-index: 999;
      }
    }
  }
</style>

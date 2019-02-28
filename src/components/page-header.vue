<template>
  <div class="page-header">
    <div :class="{'is-see-content': isSeecontent}" class="page-header-option">
      <!-- 移动端头部左侧按钮 -->
      <div class="phone-header-icon icon icon-menu" v-if="!isShowPhoneMenu" @click="setHeaderPanel(1, true)"></div>
      <div class="phone-header-icon icon icon-close" v-if="isShowPhoneMenu" @click="setHeaderPanel(1, false)"></div>
      <!-- logon -->
      <img @click="linkLogo" class="header-left-logo" src="@/assets/images/logo.png">
      <!-- PC菜单 -->
      <div class="header-content">
        <nav class="header-menu" v-show="!showSearch">
          <li v-for="(item, index) of categoryList" :key="index" @click="routerLink('/c/' + item.id)"><span>{{item.categoryName}}</span><i></i></li>
          <li @click="routerLink('/support')"><span>SUPPORT</span><i></i></li><li><span>ABOUT</span><i></i></li>
        </nav>
        <!-- 搜索框 -->
        <vava-search class="header-search" v-model="showSearch"></vava-search>
      </div>
      <!-- 头部右侧按钮 -->
      <div class="header-right">
        <span class="header-icon-pc icon icon-search" @click="openSearch"></span>
        <span @click="routerLink('/account')" class="header-icon-pc icon icon-log-in"></span>
        <vava-country-img class="header-icon-pc" ref="vavaCountryImgPc" @click="setHeaderPanel"></vava-country-img>
        <span @click="setHeaderPanel(2)" class="phone-header-icon icon icon-turned"></span>
      </div>
    </div>
    <!-- 选择语言/地区 -->
    <div class="page-header-country" ref="countryIsShow" :class="{'page-header-country-show': countryIsShow}">
      <img @click="setCountry('en')" src="@/assets/images/country-icon/us.png" alt=""><img @click="setCountry('ge')" src="@/assets/images/country-icon/germany.png" alt="">
      <img @click="setCountry('zh')" src="@/assets/images/country-icon/china.png" alt=""><img @click="setCountry('jp')" src="@/assets/images/country-icon/japan.png" alt="">
    </div>
    <!--移动端菜单选择面板-->
	  <transition name="menu-fade">
	    <div v-show="isShowPhoneMenu" ref="phoneMenu" class="header-phone-menu header-collapse">
	    	<vava-collapse-item v-for="(item, index) of categoryList" :key="index">
          <span slot="titleContent" class="header-collapse-title" @click="routerLink('/c/' + item.id)">{{item.categoryName}}</span>
        </vava-collapse-item>
	    	<vava-collapse-item><span slot="titleContent" class="header-collapse-title" @click="routerLink('/support')">SUPPORT</span></vava-collapse-item>
	    	<vava-collapse-item><span slot="titleContent" class="header-collapse-title">ABOUT</span></vava-collapse-item>
	    </div>
	  </transition>
	  <!-- 移动端右侧菜单面板 -->
	  <transition name="menu-fade">
	    <div v-show="isShowPhoneOption" ref="phoneOption" class="header-phone-menu header-collapse">
        <div class="phone-option-search"><input type="text"><span class="icon icon-search"></span><vava-button class="search-button">Search</vava-button></div>
	    	<vava-collapse-item>
	    		<span slot="leftIcon" class="icon icon-log-in collapse-title-left"></span>
	    		<span slot="titleContent" @click="routerLink('/account')">{{accountName}}</span>
	    	</vava-collapse-item>
	    	<vava-collapse-item :title-click="showLang">
          <vava-country-img slot="leftIcon" class="collapse-title-left" ref="vavaCountryImgPhone" @click="setHeaderPanel"></vava-country-img>
	    		<span slot="titleContent">LANGUAGE</span>
	    	</vava-collapse-item>
	    </div>
	  </transition>
    <!-- 遮罩层 -->
    <div class="page-content-mask" @click="isShowPhoneOption=isShowPhoneMenu=countryIsShow=isShowMask=false" :class="{'content-mask-show': isShowMask}"></div>
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
        isShowPhoneMenu: false, // 移动端菜单
        isShowPhoneOption: false, // 移动端菜单右边下拉
        showSearch: false,
        menuList: []
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      },
      accountName () {
        return (this.$store.state.accountData.firstName || this.$store.state.accountData.lastName)
        ? `${this.$store.state.accountData.firstName}  ${this.$store.state.accountData.lastName}`
        : (this.$store.state.accountData.emailAddress || 'SIGN IN')
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
      })
    },
    methods: {
      linkLogo () {
        window.location.href = '/'
      },
      setHeaderPanel (type, status) { // 头部面板切换操作（防止重叠显示）
        switch (type) {
          case 1:
            this.$refs.countryIsShow.style.display = this.$refs.phoneOption.style.display = 'none'
            this.isShowPhoneOption = this.countryIsShow = false
            this.isShowMask = this.isShowPhoneMenu = status
            break
          case 2:
            this.$refs.countryIsShow.style.display = this.$refs.phoneMenu.style.display = 'none'
            this.isShowPhoneMenu = this.countryIsShow = false
            this.isShowMask = this.isShowPhoneOption = !this.isShowPhoneOption
            break
          case 3:
            this.$refs.phoneOption.style.display = this.$refs.phoneMenu.style.display = 'none'
            this.$refs.countryIsShow.style.display = 'flex'
            this.isShowPhoneMenu = this.isShowPhoneOption = false
            this.isShowMask = this.countryIsShow = !this.countryIsShow
            break
        }
      },
      closeMask () {
        this.isShowPhoneOption = this.isShowPhoneMenu = this.countryIsShow = this.isShowMask = false
      },
      openSearch () {
        console.log('打开搜索')
        this.showSearch = !this.showSearch
      },
      routerLink (path) {
        this.isShowPhoneOption = this.isShowPhoneMenu = this.isShowMask = false
        this.$router.push(path)
        // window.document.getElementById('app').scrollTo(0, 0)
      },
      setCountry (type) { // 设置语言/地区
        this.$refs.vavaCountryImgPc.setCountry(type)
        this.$refs.vavaCountryImgPhone.setCountry(type)
        this.showLang()
      },
      showLang () {
        this.setHeaderPanel(3)
      	console.log('显示语言地区选择')
      }
    }
  }
</script>

<style lang="less" scoped>
  @icon-size: 1.45vw;
	.menu-fade-enter-active,.menu-fade-leave-active{
	  transition: all .2s ease-in;
	}
	.menu-fade-enter, .menu-fade-leave-to{
	  transform: translateY(-100%);
	}
  .page-header{
    position: fixed;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    z-index: 1000;
    .page-header-option{
      width: 100%;
      height: 10.4vw;
      transition: height .25s, opacity .25s;
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
            height: 1.3vw;
            justify-content: space-between;
            align-items: center;
            span{white-space: nowrap;}
            i{
              display: inline-block;
              height: 0.11vw;
              width: 0;
              background-color: @base-color;
              border-radius: 50px;
              transition: width .5s;
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
      .header-left-logo{
        height: 1.56vw;
        width: 6.25vw;
      }
      .header-content{
        height: 2vw;
        min-height: 40px;
        .header-search{
          width: 55vw;
          input{font-size: 1vw;}
        }
        .header-menu{padding-top: 0.4vw;}
      }
      &:hover{opacity: 1;}
    }
    .page-header-country{
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
    .page-header-country-show{height: 5.2vw;}
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
    .header-collapse{
    	position: relative;
    	width: 100%;
    	background-color: @base-back-color;
    	padding: 20px 20px 0 20px;
    	z-index: 1000;
    	.collapse-title-left{
    		margin: 0 20px;
        font-size: 21px;
        color: #FFF;
        width: 21px;
        height: 21px;
    	}
    	.header-collapse-title{
    		width: 100%;
    		text-align: center;
      }
      .phone-option-search{
        position: relative;
        width: 100%;
        height: 80px;
        color: #FFF;
        position: relative;
        border-top: 1px solid #FFF;
        display: flex;
        align-items: center;
        input{
          font-size: 20px;
          height: 40px;
          border-radius: 30px;
          width: 70%;
          padding: 0 20px 0 40px;
          background-color: @base-back-color;
          border: 1px solid #FFF;
          color: #FFF;
        }
        span{
          position: absolute;
          left: 12px;
          font-size: 18px;
          color: #FFF;
        }
        .search-button{
          height: 40px;
          width: 25%;
          border: 1px solid #FFF;
          margin-left: 5%;
          background-color: @base-back-color;
        }
      }
    }
  }
  @media (max-width: 1678px) { // 1680
    .page-header{
      .page-header-option{
        .header-content .header-menu{
          li{height: 21px;i{height: 2px;}}
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
      .page-header-country{
        img{width: 74px;height: 52.5px;margin: 0 35px;}
      }
      .page-header-country-show{height: 87.5px;}
    }
  }
  @media (max-width: 1450px) {
    .page-header{
      .page-header-option{
        .header-content .header-menu{
          li{padding: 0 0.8vw;}
          font-size: 14px;
        }
        .header-right{
          right: 3.8%;
          span{font-size: 21px;}
        }
      }
      .page-header-country{
        img{width: 60px;height: 42px;margin: 0 25px;}
      }
      .page-header-country-show{height: 73px;}
    }
  }
  @media (max-width: 1150px) {
    .page-header .page-header-option{
      .header-content .header-menu{
        font-size: 13px;
      }
      .header-left-logo{margin-left: 3vw;}
      .header-right span{margin: 0 10px;}
    }
    .page-header .is-see-content .header-left-logo{
      width: 84px;
      height: 21px;
    }
  }
  @media (max-width: 1000px) {
    .page-header .page-header-option .header-content .header-menu{font-size: 12px;}
  }
  @media (max-width: 920px) {
    .page-header{
      top: -1px;
      .page-header-option{
        height: 60px;
        .header-left-logo{
          height: 20px;
          width: 80px;
          margin: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }
        .header-content .header-menu{
          display: none;
        }
        .header-right{
          right: 4%;
          .phone-header-icon{font-size: 21px!important;}
          .header-icon-pc{display: none;}
        }
      }
      .phone-header-icon{display: block!important;font-size: 18px!important;}
      .is-see-content{opacity: 1;}
      .page-header-country{
        img{width: 50px;height: 35px;margin: 0 10px;}
      }
      .page-header-country-show{height: 50px;}
    }
  }
  @media (max-width: 500px) {
    .page-header{
      .page-header-option{
        .header-right{span{margin: 0 5px;}}
      }
      .page-header-country{
        img{width: 42px;height: 30px;margin: 0 5px;}
      }
    }
    .page-header .header-collapse .phone-option-search{
      height: 60px;
      .search-button{ height: 35px; width: 20%;font-size: 14px;padding: 0;}
      input{ height: 35px; width: 75%;}
    }
  }
  @media (max-width: 375px) {
    .page-header .page-header-option .header-right span{margin: 0 3px;}
  }
  @media (max-width: 359px) {
    .page-header .header-collapse .phone-option-search .search-button{ display: none;}
    .page-header .header-collapse .phone-option-search input{ width: 100%;}
  }
</style>

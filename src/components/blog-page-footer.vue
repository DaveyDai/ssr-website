<template>
  <div class="blog-footer">
    <div class="footer-pc">
      <div class="blog-footer-left">
        <div class="left-footer-column">
          <h5>@ 2019 VAVA BLOG</h5>
        </div>
        <div class="left-footer-column">
          <h5>SOCIAL MEDIA</h5>
          <div class="footer-right-media">
            <i @click="openMedia('https://www.facebook.com/letsvava')" class="icon icon-facebook"></i>
            <i @click="openMedia('https://twitter.com/letsvava')" class="icon icon-twitter"></i>
            <i @click="openMedia('https://www.instagram.com/letsvava')" class="icon icon-instagram"></i>
            <i @click="openMedia('https://www.youtube.com/channel/UCQHsAs7QINSKNqOS5DtrcXQ')" class="icon icon-youtube"></i>
          </div>
        </div>
      </div>
      <div class="footer-conter-line"></div>
      <div class="blog-footer-right">
        <h5>SUBSCRIBE</h5>
        <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" @click="enterEmail" v-model="subscribeParam.sendToEmail" maxlength="200"></vava-email-input>
      </div>
    </div>
    <div class="footer-phone">
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SUBSCRIBE</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li>
          <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" @click="enterEmail" v-model="subscribeParam.sendToEmail" maxlength="200"></vava-email-input>
        </li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SOCIAL MEDIA</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li class="phone-media-icon">
          <i @click="openMedia('https://www.facebook.com/letsvava')" class="icon icon-facebook"></i>
          <i @click="openMedia('https://twitter.com/letsvava')" class="icon icon-twitter"></i>
          <i @click="openMedia('https://www.instagram.com/letsvava')" class="icon icon-instagram"></i>
          <i @click="openMedia('https://www.youtube.com/channel/UCQHsAs7QINSKNqOS5DtrcXQ')" class="icon icon-youtube"></i>
        </li>
      </vava-collapse-item>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subscribeParam: {
          sendToEmail: '',
          type: 3,
          sourceCode: this.$route.meta.sourceCode || 'SUB_OTHER_SOURCE'
        }
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      }
    },
    methods: {
      enterEmail () {
        if (!this.$utils.trim(this.subscribeParam.sendToEmail)) {
          this.$utils.message('Please enter your Email address.')
          return
        }
        if (!this.$utils.validateEmail(this.subscribeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        this.$store.dispatch('emailSubscribe', this.subscribeParam).then(data => {
          this.$utils.message('Subscribe Success.')
          this.subscribeParam.sendToEmail = ''
        }).catch(error => {
          this.$utils.message(error.message)
        })
      },
      routerLink (path) {
        this.$router.push(path)
        if (typeof window !== 'undefined') {
          window.document.getElementsByTagName('html')[0].scrollTop = 0
          try {window.scrollTo(0,0)}catch(e){console.log(e)}
        }
      },
      openMedia (path) {
        window.open(path)
      }
    }
  }
</script>
<style lang='less' scoped>
  .blog-footer .footer-phone{ display: none; }
  .blog-footer .footer-pc{
    position: relative;
    width: 100vw;
    height: 14.58vw;
    background-color: @base-back-color;
    display: flex;
    padding-top: 3.5%;
    justify-content: center;
    .blog-footer-left{
      height: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 4%;
      .left-footer-column{
        h5{font-size: 0.99vw; color: #FFF;margin-bottom: 1.2vw;}
        li{
          font-size: 0.885vw;
          color: #e2e2e2cc;
          line-height: 2.187vw;
          cursor: pointer;
        }
        li:hover{text-decoration: underline;}
        .footer-right-media{
          display: flex;
          flex-wrap: nowrap;
          i{font-size: 1.5vw;color: #FFF;margin: 0 1vw;cursor: pointer;color: #FFF;}
          i.icon-facebook{margin-left: -0.1vw;}
          i:hover{color: @base-button-back;}
        }
        &:first-child{
          margin-right: 4vw;
        }
      }
    }
    .footer-conter-line{
      height: 6.25vw;
      min-height: 90px;
      width: 0.1vw;
      min-width: 1px;
      background-color: #FFF;
    }
    .blog-footer-right{
      padding-left: 7%;
      h5{font-size: 0.99vw; color: #FFF;margin-bottom: 1.2vw;}
      .footer-right-media-h5{margin: 2.34vw 0 1.25vw 0;}
      .subscribe-input{width: 20.31vw;height: 2.91vw;font-size: 1.04vw;min-height: 40px;}
    }
  }
  @media (max-width: 1617px) {
    .blog-footer .footer-pc{
      .footer-conter-line{width: 1px;}
      .blog-footer-right{
        .footer-right-media-h5{margin: 35px 0 20px 0;}
        .subscribe-input{width: 325px;font-size: 17px;}
        .footer-right-media i{font-size: 25px;}
      }
    }
  }
  @media (max-width: 1450px) {
    .blog-footer .footer-pc{
      .blog-footer-left{
        .left-footer-column{
          h5{margin-bottom: 16px;}
          li{font-size: 13px;line-height: 31px;}
        }
      }
      .blog-footer-right{
        h5{margin-bottom: 16px;}
      }
    }
  }
  @media (max-width: 1200px) {
    .blog-footer .footer-pc{
      .blog-footer-left{
        .left-footer-column{
          h5{font-size: 12px;}
          .footer-right-media{
            i{font-size: 18px;}
          }
        }
      }
      .blog-footer-right{
        h5{font-size: 12px;}
      }
    }
  }
  @media (max-width: 800px) {
    .blog-footer .footer-pc{ display: none; }
    .blog-footer .footer-phone{
      display: block;
    	position: relative;
    	width: 100%;
    	background-color: @base-back-color;
      padding: 20px 20px 0 20px;
      .footer-collapse-title{
        margin-left: 20px;
        font-size: 15px;
      }
      .subscribe-input{
        width: 100%;
        min-width: 100%;
        height: 45px;
        margin-top: 9px!important;
        margin-bottom: 20px!important;
      }
      .phone-media-icon{
        margin-top: -3px!important;
        padding-top: 5px;
        i{font-size: 28px;margin-right: 12%;color: #FFF;}
      }
    }
  }
</style>
<template>
  <div class="page-footer">
    <div class="footer-pc">
      <div class="page-footer-left">
        <div class="left-footer-column">
          <h5>PRODUCTS</h5>
          <li v-for="(item, index) of categoryList" :key="index" @click="routerLink('/c/' + item.id)">{{item.categoryName}}</li>
        </div>
        <div class="left-footer-column">
          <h5>SUPPORT</h5>
          <li @click="routerLink('/support/warranty')">Warranty</li>
          <li @click="routerLink('/support/user-manual')">User Manual</li>
          <li @click="routerLink('/support/influeucer')">Influencer</li>
          <li @click="routerLink('/support/after-sales')">After-sales</li>
          <li @click="routerLink('/support/terms-conditions')">Terms & Conditions</li>
          <li @click="routerLink('/support/private-policy')">Private Policy</li>
        </div>
        <div class="left-footer-column">
          <h5>OTHERS</h5>
          <li @click="routerLink('/about-us')">About us</li>
          <li>Subscribe</li>
        </div>
        <div class="left-footer-column">
          <h5>COMMUNITY</h5>
          <li @click="routerLink('/blog')">Blog</li>
        </div>
      </div>
      <div class="footer-conter-line"></div>
      <div class="page-footer-right">
        <h5>SUBSCRIBE</h5>
        <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" v-model="subscribeEmail" maxlength="50"></vava-email-input>
        <h5 class="footer-right-media-h5">SOCIAL MEDIA</h5>
        <div class="footer-right-media">
          <i class="icon icon-facebook"></i><i class="icon icon-twitter"></i>
          <i class="icon icon-instagram"></i><i class="icon icon-youtube"></i>
        </div>
      </div>
    </div>
    <div class="footer-phone">
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">PRODUCTS</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li v-for="(item, index) of categoryList" :key="index" @click="routerLink('/c/' + item.id)">{{item.categoryName}}</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SUPPORT</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/support/warranty')">Warranty</li>
        <li @click="routerLink('/support/user-manual')">User Manual</li>
        <li @click="routerLink('/support/influeucer')">Influencer</li>
        <li @click="routerLink('/support/after-sales')">After-sales</li>
        <li @click="routerLink('/support/terms-conditions')">Terms & Conditions</li>
        <li @click="routerLink('/support/private-policy')">Private Policy</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">OTHERS</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/about-us')">About us</li><li>Subscribe</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">COMMUNITY</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/blog')">Blog</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SUBSCRIBE</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li><vava-email-input class="subscribe-input" placeholder="Enter your e-mail" v-model="subscribeEmail" maxlength="50"></vava-email-input></li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SOCIAL MEDIA</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li class="phone-media-icon">
          <i class="icon icon-facebook"></i><i class="icon icon-twitter"></i>
          <i class="icon icon-instagram"></i><i class="icon icon-youtube"></i>
        </li>
      </vava-collapse-item>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subscribeEmail: ''
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      }
    },
    methods: {
      getEmailValid () {
        let email = this.email;
        if (email === '') {
          this.emailValidateTips = 'Please enter the email address.';
          return false;
        } else if(!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
          this.emailValidateTips = 'Please enter a valid email address.';
          return false;
        } else {
          this.emailValidateTips = '';
          return true;
        }
      },
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>
<style lang='less' scoped>
  .page-footer .footer-phone{ display: none; }
  .page-footer .footer-pc{
    position: relative;
    width: 100vw;
    background-color: @base-back-color;
    display: flex;
    padding-top: 3.5%;
    .page-footer-left{
      height: 100%;
      width: 61.5%;
      display: flex;
      justify-content: space-around;
      padding: 0 6%;
      .left-footer-column{
        h5{font-size: 0.99vw; color: #FFF;margin-bottom: 0.5vw;}
        li{
          font-size: 0.885vw;
          color: #e2e2e2cc;
          line-height: 2.187vw;
          cursor: pointer;
        }
        li:hover{text-decoration: underline;}
      }
    }
    .footer-conter-line{
      height: 12.6vw;
      width: 0.1vw;
      background-image: linear-gradient(to right , #9590ac, #9691ad);
    }
    .page-footer-right{
      width: 38.4%;
      padding-left: 7.2%;
      h5{font-size: 0.99vw; color: #FFF;margin-bottom: 1.56vw;}
      .footer-right-media-h5{margin: 2.34vw 0 1.25vw 0;}
      .subscribe-input{width: 20.31vw;height: 2.91vw;font-size: 1.04vw;}
      .footer-right-media{
        display: flex;
        flex-wrap: nowrap;
        i{font-size: 1.5vw;color: #FFF;margin: 0 1vw;cursor: pointer;}
        i.icon-facebook{margin-left: -0.1vw;}
      }
    }
  }
  @media (max-width: 1617px) {
    .page-footer .footer-pc{
      .footer-conter-line{width: 1px;}
      .page-footer-right{
        h5{margin-bottom: 25px;}
        .footer-right-media-h5{margin: 35px 0 20px 0;}
        .subscribe-input{width: 325px;height: 45px;font-size: 17px;}
        .footer-right-media i{font-size: 25px;}
      }
    }
  }
  @media (max-width: 1450px) {
    .page-footer .footer-pc{
      .page-footer-left{
        .left-footer-column{
          h5{font-size: 14.3px;margin-bottom: 12px;}
          li{font-size: 13px;line-height: 31px;}
        }
      }
      .page-footer-right{
        h5{font-size: 14.3px;margin-bottom: 25px;}
      }
    }
  }
  @media (max-width: 1200px) {
    .page-footer .footer-pc{
      height: 265px;
      .footer-conter-line{height: 180px;}
      .page-footer-right{
        padding-left: 4.5%;
        .subscribe-input{width: 280px;height: 18%;font-size: 16px;}
        h5{margin-bottom: 20px;}
        .footer-right-media-h5{margin: 35px 0 24px 0;}
        .footer-right-media{i{font-size: 23px;}}
      }
    }
  }
  @media (max-width: 920px) {
    .page-footer .footer-pc{
      height: auto;
      flex-direction: column-reverse;
      .page-footer-left{
        width: 100%;
        padding: 8% 3% 5% 3%;
      }
      .footer-conter-line{display: none;}
      .page-footer-right{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .subscribe-input{width: 300px;height: 45px;font-size: 16px;}
        .footer-right-media{i{font-size: 26px;margin: 0 1.5vw;}}
      }
    }
  }
  @media (max-width: 800px) {
    .page-footer .footer-pc{ display: none; }
    .page-footer .footer-phone{
      display: block;
    	position: relative;
    	width: 100%;
    	background-color: @base-back-color;
      padding: 20px 20px 0 20px;
      .footer-collapse-title{
        margin-left: 20px;
        font-size: 14px;
      }
      .subscribe-input{
        width: 100%;
        height: 45px;
      }
      .phone-media-icon{
        padding-top: 5px;
        i{font-size: 28px;margin-right: 12%;color: #FFF;}
      }
    }
  }
  // @media (max-width: 500px) {
  //   .page-footer{
  //     .page-footer-left{
  //       width: 100%;
  //       padding: 8% 0 5% 0;
  //       flex-wrap: wrap;
  //       .left-footer-column{
  //         width: 50%;
  //         margin-bottom: 20px;
  //         text-align: center;
  //       }
  //     }
  //     .page-footer-right{
  //       .subscribe-input{
  //         width: 280px;
  //         height: 40px;
  //         font-size: 16px;
  //       }
  //     }
  //   }
  // }
  // @media (max-width: 414px) {
  //   .page-footer{
  //     .page-footer-left{
  //       .left-footer-column{
  //         width: 100%;
  //         margin-bottom: 35px;
  //       }
  //     }
  //     .page-footer-right{
  //       .subscribe-input{
  //         width: 230px;
  //         height: 35px;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  // }
</style>
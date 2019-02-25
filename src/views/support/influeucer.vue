<template>
  <div class="support-influeucer">
    <img class="support-influeucer-img" src="/static/website-imgages/support/Influencer Banner.jpg">
    <div class="influeucer-header">
      <h5>VAVA INFLUENCER</h5>
      <p class="title-p">Become an influencer, and connect with VAVA.</p>
      <p>We understand how much influencers mean to us in elevating our brand and engaging customers. That’s why we’d like to work with you to build a better future for every one of us together.</p>
    </div>
    <div class="influeucer-content">
      <h5>SIGN UP | APPLICATION</h5>
      <p>Apply to become a VAVA social media influencer</p>
      <div class="influeucer-content-from">
        <div class="influeucer-from-left">
          <div class="influeucer-from-title">INTEREST</div>
          <div class="influeucer-from-p">PICK YOUR TOPICS</div>
          <div class="influeucer-from-item">
            <div v-for="(item,index) of influeucerData.topics" @click="item.active = !item.active" :class="{'active': item.active}" :key="index" class="influeucer-from-button">{{item.dicName}}</div>
          </div>
          <div class="influeucer-from-p">YOUR CHANNELS</div>
          <div class="influeucer-from-item">
            <div v-for="(item,index) of influeucerData.media" @click="item.active = !item.active" :class="{'active': item.active}" :key="index" class="influeucer-from-button">{{item.dicName}}</div>
          </div>
        </div>
        <div class="influeucer-from-right">
          <div class="influeucer-from-title">PERSONAL INFORMATION</div>
          <div class="influeucer-from-item">
            <div class="influeucer-from-p"><p>FIRST NAME</p><vava-input class="influeucer-from-input"></vava-input></div>
            <div class="influeucer-from-p"><p>LAST NAME</p><vava-input class="influeucer-from-input"></vava-input></div>
            <div class="influeucer-from-p"><p>EMAIL ADDRESS</p><vava-input class="influeucer-from-input1"></vava-input></div>
            <div class="influeucer-from-p"><p>COUNTRY</p><vava-input class="influeucer-from-input1"></vava-input></div>
          </div>
        </div>
      </div>
      <div class="influeucer-submit"><vava-button>SUBMIT</vava-button></div>
    </div>
  </div>
</template>

<script>
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('产品首页asyncData', route.params.cId)
      // (to.meta.scrollToTop) window.document.getElementById('app').scrollTo(0, 0)
      // return store.dispatch('queryCategory', {api: 'signIn', cId: route.params.cId})
    },
    data () {
      return {
        influeucerData: {
          topics: [
            {dicName: 'TECH & ELECTRONICS', active: true},
            {dicName: 'BEAUTY & FASHION', active: false},
            {dicName: 'SPORTS & OUTDOOR', active: false},
            {dicName: 'MUSIC LIFESTYLE', active: false},
            {dicName: 'OTHER', active: false}
          ],
          media: [
            {dicName: 'FACEBOOK', active: true},
            {dicName: 'TWITTER', active: false},
            {dicName: 'BLOG', active: false},
            {dicName: 'YOUTUBE', active: false},
            {dicName: 'INSTAGRAM', active: false},
            {dicName: 'FORUM', active: false},
            {dicName: 'OTHER', active: false}
          ]
        }
      }
    },
    mounted () {

    },
    methods: {
      callback (e) {
      },
      routerLink (path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style lang="less" scoped>
  .support-influeucer{
    width: 100%;
    .support-influeucer-img{
      width: 100%;
    }
    h5{font-size: 2.6vw;color: @base-font-color;margin-bottom: 1vw;text-align: center;}
    p{
      font-size: 1.56vw;
      color: @un-font-color;
      text-align: center;
      line-height: 1.5;
    }
    .influeucer-header{
      background-color: #FAFAFA;
      padding: 5.2vw 2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      p{max-width: 73vw;}
      p.title-p{margin-bottom: 2vw;}
    }
    .influeucer-content{
      padding: 10.4vw 0;
      .influeucer-content-from{
        margin-top: 4vw;
        width: 100%;
        padding: 0 9.89vw;
        display: flex;
        justify-content: space-between;
        line-height: 1.5;
        .influeucer-from-title{
          font-size: 1vw;
          color: @base-font-color;
          font-family: 'avenir-next-demi';
        }
        .influeucer-from-p{
          font-size: 0.83vw;
          color: @base-font-color;
          line-height: 2;
        }
        .influeucer-from-left{
          width: 33.3vw;
          margin-right: 5.2vw;
          flex-shrink: 0;
          .influeucer-from-item{
            margin-top: 1vw;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .influeucer-from-button{
              width: 15.625vw;
              height: 3.125vw;
              min-height: 35px;
              min-width: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1vw;
              color: @base-font-color;
              border-radius: 10vw;
              border: 0.052vw solid #e2e2e2;
              margin-bottom: 1vw;
              cursor: pointer;
            }
            div.active{
              border-color: @base-button-back;
              background: rgba(98, 68, 187, .2);
            }
          }
        }
        .influeucer-from-right{
          width: 41.66vw;
          flex-shrink: 0;
          .influeucer-from-item{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .influeucer-from-p{
              margin-bottom: 1.8vw;
              p{font-size: 0.83vw;color: @base-font-color;text-align: left;margin-bottom: 0.5vw;}
              .influeucer-from-input{
                width: 19.8vw;
                min-width: 140px;
                min-height: 35px;
              }
              .influeucer-from-input1{
                width: 41.66vw;
                min-width: 280px;
                min-height: 35px;
              }
            }
          }
        }
      }
      .influeucer-submit{
        width: 100%;
        text-align: center;
        margin-top: 4vw;
      }
    }
  }
  @media (max-width: 1250px) {
    .support-influeucer .influeucer-content .influeucer-content-from{
      .influeucer-from-title{font-size: 13px;}
      .influeucer-from-p{font-size: 12px;}
      .influeucer-from-left .influeucer-from-item .influeucer-from-button{font-size: 12px;border-width: 1px;}
    }
  }
  @media (max-width: 920px) {
    .support-influeucer{
      .influeucer-content{
        .influeucer-content-from{
          padding: 0 20px;
          flex-direction: column;
          align-content: center;
          .influeucer-from-left{
            width: 100%;
            margin-right: 0;
            margin-bottom: 25px;
            .influeucer-from-item{
              margin-top: 0.5vw;
              justify-content: flex-start;
              .influeucer-from-button{
                width: 15.625vw;
                margin-right: 15px;
                margin-bottom: 10px;
              }
            }
          }
          .influeucer-from-right{
            width: 100%;
            .influeucer-from-item{
              justify-content: flex-start;
              .influeucer-from-p{
                margin-bottom: 15px;
                p{font-size: 12px;margin-top: 5px;}
                .influeucer-from-input{
                  width: 25vw;
                  margin-right: 10px;
                }
                .influeucer-from-input1{
                  width: 50vw;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 770px) {
    .support-influeucer{
      h5{font-size: 20px;}
      p{font-size: 12px;}
      .influeucer-header{
        p{max-width: 90vw;}
      }
      .influeucer-content{
        .influeucer-content-from{
          padding: 0 10px;
          flex-direction: column;
          align-content: center;
          .influeucer-from-left{
            width: 100%;
            margin-right: 0;
            margin-bottom: 25px;
            .influeucer-from-item{
              margin-top: 0.5vw;
              justify-content: flex-start;
              .influeucer-from-button{
                margin-right: 10px;
              }
            }
          }
          .influeucer-from-right{
            width: 100%;
            .influeucer-from-item{
              justify-content: flex-start;
              .influeucer-from-p{
                margin-bottom: 15px;
                p{font-size: 12px;margin-top: 5px;}
                .influeucer-from-input{
                  width: 30vw;
                  margin-right: 10px;
                }
                .influeucer-from-input1{
                  width: 70vw;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .support-influeucer .influeucer-content .influeucer-content-from .influeucer-from-left .influeucer-from-item .influeucer-from-button{
      width: 29vw;
      min-width: 150px;
    }
  }
  @media (max-width: 500px) {
    .support-influeucer .influeucer-content .influeucer-content-from .influeucer-from-left .influeucer-from-item .influeucer-from-button{
      min-width: 140px;
    }
  }
  @media (max-width: 470px) {
    .support-influeucer .influeucer-content .influeucer-content-from .influeucer-from-left .influeucer-from-item .influeucer-from-button{
      min-width: 170px;
    }
  }
  @media (max-width: 400px) {
    .support-influeucer .influeucer-content .influeucer-content-from .influeucer-from-left .influeucer-from-item .influeucer-from-button{
      min-width: 140px;
    }
  }
</style>

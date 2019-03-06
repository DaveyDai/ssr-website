<template>
  <div class="user-manual">
    <img class="user-manual-img" src="/static/website-imgages/support/User Manual Banner.jpg">
    <p class="user-manual-title">CHOOSE YOUR PRODUCT</p>
    <div class="user-manual-content">
      <div class="user-manual-products">
        <li v-for="(item, index) of userManualData.records" :key="index" @click="showDown(item)">
          <img :src="item.productMainUrl">
          <p class="main-products-title" title="item.productName">{{item.productName}}</p>
        </li>
      </div>
    </div>
	  <transition name="slide-fade">
      <div class="user-manual-download" v-show="userManualDown.productAttachmentDetailBos.length > 0">
        <div class="download-product"><img :src="userManualDown.productMainUrl" alt=""><p>{{userManualDown.productName}}</p></div>
        <div class="download-detail">
          <ul class="download-detail-file">
            <li class="detail-file-li" v-for="(item,index) of userManualDown.productAttachmentDetailBos" :key="index">
              <p>{{dicTreeList[item.attachmentCode]}}</p>
              <div class="download-file-detail">
                <div class="download-content">
                  <single-check v-model="item.isSelect"></single-check><i class="icon icon-download"></i><em @click="downFile(item.attachmentUrl)">{{item.attachmentName}}</em>
                </div>
              </div>
            </li>
          </ul>
          <div class="down-input-line"></div>
          <div class="download-detail-email">
            <vava-input v-model="sendToEmail" class="download-file-input" placeholder="Email address"></vava-input>
            <vava-button @click="sendDownEmail">SEND TO MY EMAIL</vava-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
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
      showDown (item) {
        if (item.model === this.userManualDown.model) return
        this.$bar.start()
        this.$store.dispatch('getByUrl', {api: 'getProDownload', data: item.model}).then(data => { // 获取产品附件
          this.userManualDown = data || {productAttachmentDetailBos: []}
          this.$bar.finish()
        }).catch(error => {
          console.log(error)
          if (error && error.message) this.$utils.message(error.message)
          this.$bar.finish()
        })
      },
      routerLink (path) {
        this.$router.push(path)
      },
      downFile (url) { // 下载附件
        window.open(url)
      },
      sendDownEmail () { // 发送附件
        let fileList = this.userManualDown.productAttachmentDetailBos
        let paramSend = { sendToEmail: this.sendToEmail, type: 4, attachmentUrlList: [] }
        for (let i = 0; i < fileList.length; i++) if (fileList[i].isSelect) paramSend.attachmentUrlList.push(fileList[i].attachmentUrl) // 筛选数据
        if (paramSend.attachmentUrlList.length === 0) {
          this.$utils.message('Please select the documents you need.')
          return
        }
        if (!this.$utils.trim(paramSend.sendToEmail)) {
          this.$utils.message('Please enter your user Email address.')
          return
        }
        if (!this.$utils.validateEmail(paramSend.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'sendEmail', data: paramSend}).then(data => {
          this.$bar.finish()
          this.$utils.message('SEND SUCCESS')
          setTimeout(() => {
            this.$utils.message.close()
          }, 1500)
        }).catch(error => {
          this.$utils.message(error.message)
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
    .user-manual-products{
      display: flex;
      flex-wrap: wrap;
      padding: 0 5.7vw 6vw 5.7vw;
      li{
        width: 19.8vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.99vw;
        margin: 0 0.9375vw 3.125vw 0.9375vw;
        padding-bottom: 0.52vw;
        transition: box-shadow .3s, transform .3s;
        cursor: pointer;
        &:hover{box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;transform: scale(1.1);}
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
      }
    }
    .user-manual-download{
      position: relative;
      display: flex;
      padding: 1vw 5vw 5vw 10vw;
      z-index: 0;
      .download-product{
        img{
          width: 25vw;
          min-width: 100px;
        }
        p{
          margin-top: 1vw;
          text-align: center;
          font-size: 1vw;
          color: #A7A4A4;
        }
      }
      .download-detail{
        .download-detail-file{
          display: flex;
          flex-wrap: wrap;
          li.detail-file-li{
            width: 25vw;
            padding: .5vw 2vw;
            color: @base-font-color;
            line-height: 2;
            display: flex;
            flex-direction: column;
            margin-bottom: 1vw;
            flex-shrink: 0;
            overflow: hidden;
            width: 50%;
            p{
              // font-family: 'avenir-next-demi';
              padding-left: 1.8vw;
              font-size: 1.5vw;
            }
            .download-file-detail{
              display: flex;
              flex-wrap: wrap;
              .download-content{
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9vw;
                i.icon-download{
                  font-size: 1.1vw;
                  color: @base-font-color;
                  cursor: pointer;
                }
                em{
                  margin: 0 15px 0 0.5vw;
                  line-height: 2.5;
                  font-size: 1vw;
                  white-space: nowrap;
                  cursor: pointer;
                  &:hover{
                    text-decoration: underline;
                    color: @base-button-back;
                  }
                }
              }
            }
          }
        }
        .down-input-line{
          width: 50vw;
          height: 1px;
          background-color: @un-font-color;
          margin-left: 4vw;
          margin-bottom: 2vw;
        }
        .download-detail-email{
          padding: 1vw 1vw 1vw 4vw;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .download-file-input{
            width: 25vw;
            min-width: 280px;
            margin-bottom: 1.5vw;
            input{box-shadow: rgba(0, 0, 0, 0.2) 0 0 2vw;border-width: 0;font-size: @base-font-color;}
          }
        }
      }
    }
  }
  @media (max-width: 1350px) {
    .user-manual .user-manual-download .download-detail .download-detail-file li.detail-file-li .download-file-detail .download-content{font-size: 12px;}
    .user-manual .user-manual-download .download-detail .download-detail-file li.detail-file-li{border-width: 1px;}
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
      .user-manual-download{
        padding: 1vw 1vw 5vw 1vw;
        .download-product{
          p{
            margin-top: 20px;
            font-size: 12px;
          }
        }
        .download-detail{
          .down-input-line{width: 60vw;}
          .download-detail-file{
            li.detail-file-li{
              margin-bottom: 25px;
              p{
                font-size: 13.7px;
                padding-left: 20px;
                white-space: nowrap;
              }
              .download-file-detail{
                .download-content{
                  i.icon-download{
                    font-size: 12px;
                  }
                  em{
                    font-size: 12px;
                    line-height: 1.3;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .user-manual{
      .user-manual-products{
        padding: 0 5vw 6vw 5vw;
      }
    }
  }
  @media (max-width: 600px) {
    .user-manual{
      .user-manual-title{font-size: 16px;margin: 20px 0;}
      .user-manual-products{
        padding: 0 5% 25px 5%;
        li{
          width: 31%;
          font-size: 10px;
        }
      }
      .user-manual-download{
        flex-direction: column;
        .download-product{
          text-align: center;
          margin-bottom: 20px;
          p{
            margin-top: 20px;
            font-size: 12px;
          }
        }
      }
    }
    .user-manual .user-manual-download .download-detail .down-input-line{width: 90vw;}
    .user-manual .user-manual-download .download-detail .download-detail-file li.detail-file-li .download-file-detail .download-content{font-size: 12px;}
  }
  @media (max-width: 500px) {
    .user-manual{
      .user-manual-download .download-detail .download-detail-file li.detail-file-li{
        flex-direction: column;
        p{padding-left: 20px;}
      }
    }
  }
  @media (max-width: 375px) {
    .user-manual{
      .user-manual-title{font-size: 14px;}
    }
  }
</style>

<template>
  <div class="product-detail-support">
    <h5 v-show="supportFaqData.length > 0">QUESTIONS & ANSWERS</h5>
    <div v-swiper:mySwiper="swiperOption" v-show="supportFaqData.length > 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="cursor: grab;" v-for="(list, index) of supportFaqData" :key="index">
          <li v-for="(item, number) of list" :key="number">
            <p class="support-faq-aq"><em>Q:</em><span>{{item.question}}</span></p>
            <p class="support-faq-aq"><em>A:</em><span>{{item.answer}}</span></p>
            <!-- <p class="support-faq-time">By VAVA Support Team on July 27, 2018</p> -->
          </li>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div><!--左箭头-->
      <div class="swiper-button-next"></div><!--右箭头-->
    </div>
    <!-- CHOOSE YOUR DOWNLOAD FILE -->
    <h5 v-show="supportData.proDownload.productAttachmentDetailBos&&supportData.proDownload.productAttachmentDetailBos.length>0"></h5>
    <!-- <div class="support-download">
      <div class="download-product"><img :src="supportData.proDownload.productMainUrl" alt=""><p>{{supportData.proDownload.productName}}</p></div>
      <div class="download-detail">
        <ul class="download-detail-file">
          <li class="detail-file-li" v-for="(item,index) of supportData.proDownload.productAttachmentDetailBos" :key="index">
            <p>{{item.attachmentCode}}</p>
            <div class="download-file-detail">
              <div class="download-content">
                <single-check v-model="item.isSelect"></single-check><i class="icon icon-download" @click="downFile(item.attachmentUrl)"></i>
                <a class="download-content-link" :href="item.attachmentUrl" download>{{item.attachmentName}}</a>
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
    </div> -->
    <down-files :down-data="supportData.proDownload" v-show="supportData.proDownload.productAttachmentDetailBos&&supportData.proDownload.productAttachmentDetailBos.length > 0"></down-files>
  </div>
</template>

<script>
  import DownFiles from '@/components/down-files.vue'
  export default {
    components: { DownFiles },
    computed: {
      supportData () {
        return this.$store.state.productDetail.support
      },
      dicTreeList () {
        return this.$store.state.dicTreeList
      }
    },
    data () {
      return {
        swiperOption: {
          navigation: { //  前进后退标签
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true
          }
          // pagination: { // 分页指示
          //   el: '.swiper-pagination',
          //   renderBullet: function (index, className) {
          //     return '<span class="' + className + '">' + (index + 1) + '</span>';
          //   },
          //   clickable :true
          // }
        },
        changeValue: false,
        supportFaqData: [],
        singValue: false,
        sendToEmail: ''
      }
    },
    created () {
      this.getFaqData()
    },
    methods: {
      getFaqData () {
        let pageTotal = Math.ceil(this.supportData.proFaq.total / 2)
        for (let i = 1; i < pageTotal * 2; i += 2) {
          this.supportFaqData[Math.floor(i / 2)] = [this.supportData.proFaq.records[i - 1]]
          if (this.supportData.proFaq.records[i]) this.supportFaqData[Math.floor(i / 2)].push(this.supportData.proFaq.records[i])
        }
      },
      downFile (path) {
        if (path) window.open(path)
      },
      sendDownEmail () { // 发送附件
        let fileList = this.supportData.proDownload.productAttachmentDetailBos
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
          this.$utils.message('Send Success')
        }).catch(error => {
          this.$utils.message(error.message)
          this.$bar.finish()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .product-detail-support{
    width: 100%;
    background-color: #FFFFFF;
    h5{
      font-size: 1.92vw;
      color: @base-font-color;
      text-align: center;
      padding: 4.17vw 0;
    }
    .swiper-wrapper{
      .swiper-slide{
        padding: 0 14.4vw 3vw 15.6vw;
        li{
          margin-bottom: 2.5vw;
          .support-faq-aq{
            font-size: 1.35vw;
            color: @base-font-color;
            line-height: 1.4;
            display: flex;
            flex-wrap: nowrap;
            font-family: 'avenir-next-demi';
            margin-bottom: 1vw;
            em{display: inline-block;width: 3vw;flex-shrink: 0;min-width: 20px;}
          }
          .support-faq-time{
            padding-top: 0.4vw;
            color: @base-font-color;
            font-size: 0.99vw;
            line-height: 1.5;
          }
        }
      }
    }
    .swiper-button-disabled{
      display: none;
    }
    .swiper-button-prev, .swiper-button-next{
      width: 2.5vw;
      height: 3vw;
      min-width: 25px;
      min-height: 30px;
      background-size: 60% 100%;
      background-repeat: no-repeat;
      transition: background .25s;
      top: 40%;
    }
    .swiper-pagination{
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      bottom: 0;
      padding-bottom: 0.1vw;
      .swiper-pagination-bullet{
        font-size: 1vw;
        width: 2vw;
        height: 2vw;
        min-width: 20px;
        min-height: 20px;
        text-align: center;
        color: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        background: @font-back-color;
        margin: 5px 4px 0 4px!important;

      }
      .swiper-pagination-bullet-active{
        background: @base-button-back;
      }
    }
    // .swiper-button-prev,.swiper-button-next{
    //   display: block;
    // }
    .swiper-button-prev {
      left: 5vw;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIzOC44NjYiIHZpZXdCb3g9IjAgMCAyNCAzOC44NjYiPjxwYXRoIGQ9Ik0zMiwzOS44LDE3LjE2NiwyNC45MzMsMzIsMTAuMDY3LDI3LjQzMyw1LjUsOCwyNC45MzMsMjcuNDMzLDQ0LjM2NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04IC01LjUpIiBmaWxsPSIjZTNlM2UzIi8+PC9zdmc+");
    }
    .swiper-button-next {
      right: 5vw;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNS4wNSIgaGVpZ2h0PSI0MC41NjciIHZpZXdCb3g9IjAgMCAyNS4wNSA0MC41NjciPjxwYXRoIGQ9Ik04LjU5LDQxLjU1LDI0LjA3MywyNi4wMzQsOC41OSwxMC41MTcsMTMuMzU3LDUuNzUsMzMuNjQsMjYuMDM0LDEzLjM1Nyw0Ni4zMTdaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOC41OSAtNS43NSkiIGZpbGw9IiNlM2UzZTMiLz48L3N2Zz4=");
    }
    .swiper-button-prev:hover{
      background-position: left;
    }
    .swiper-button-next:hover{
      background-position: right;
    }
    .support-download{
      display: flex;
      padding: 1vw 5vw 5vw 10vw;
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
                .download-content-link{
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
    .product-detail-support .support-download .download-detail .download-detail-file li.detail-file-li .download-file-detail .download-content{font-size: 12px;}
    .product-detail-support .support-download .download-detail .download-detail-file li.detail-file-li{border-width: 1px;}
  }
  @media (max-width: 1200px) {
    .product-detail-support{
      .swiper-wrapper .swiper-slide{
        padding: 2vw 10vw 5vw 10vw;
        li{
          .support-faq-aq{
            font-size: 16px;
          }
        }
      }
      .swiper-button-prev{
        left: 3vw;
      }
      .swiper-button-next{
        right: 3vw;
      }
      .swiper-pagination{
        .swiper-pagination-bullet-active, .swiper-pagination-bullet{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 920px) {
    .product-detail-support{
      h5{padding-top: 8vw;}
      h5{font-size: 17px;}
      .swiper-wrapper .swiper-slide{
        li{
          .support-faq-aq{
            font-size: 14px;
          }
          .support-faq-time{
            font-size: 12px;
          }
        }
      }
      .swiper-pagination{
        .swiper-pagination-bullet-active, .swiper-pagination-bullet{
          font-size: 12px;
        }
      }
      .swiper-button-prev, .swiper-button-next{
        display: block;
      }
      .support-download{
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
                  .download-content-link{
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
  @media (max-width: 600px) {
    .product-detail-support{
      .swiper-wrapper .swiper-slide{
        padding-bottom: 10vw;
        li{
          margin-bottom: 15px;
          .support-faq-aq{
            font-size: 12px;
          }
          .support-faq-time{
            font-size: 9px;
          }
        }
      }
      .swiper-pagination{
        .swiper-pagination-bullet{
          min-width: 18px;
          min-height: 18px;
          font-size: 10px;
        }
      }
      .support-download{
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
    .product-detail-support .support-download .download-detail .down-input-line{width: 90vw;}
    .product-detail-support .support-download .download-detail .download-detail-file li.detail-file-li .download-file-detail .download-content{font-size: 12px;}
    .product-detail-support .swiper-button-prev, .product-detail-support .swiper-button-next{
      min-width: 20px;
      min-height: 25px;
    }
  }
  @media (max-width: 500px) {
    .product-detail-support{
      .swiper-wrapper .swiper-slide{
        li{
          .support-faq-time{
            font-size: 8px;
          }
        }
      }
      .swiper-pagination{
        .swiper-pagination-bullet{
          min-width: 14px;
          min-height: 14px;
          padding-top: 3px;
          padding-left: 1px;
        }
      }
      .swiper-pagination{
        .swiper-pagination-bullet{
          font-size: 10px;
        }
      }
      .support-download .download-detail .download-detail-file li.detail-file-li{
        flex-direction: column;
        p{padding-left: 20px;}
      }
    }
  }
</style>

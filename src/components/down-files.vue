<template>
  <div class="download-files">
    <div class="download-product">
      <img :src="downData.productMainUrl" alt="">
      <!-- <p>{{downData.productName}}</p> -->
    </div>
    <div class="download-detail">
      <ul class="download-detail-file">
        <li class="detail-file-li" v-for="(item,index) of downData.productAttachmentDetailBos" :key="index">
          <div class="download-file-detail">
            <p>{{item.attachmentCode}}</p>
            <div class="download-content" v-for="(file,index) of item.fileList" :key="index">
              <single-check v-model="file.isSelect"></single-check>
              <i class="icon icon-download"></i>
              <!-- <em @click="downFile(item.attachmentUrl)">{{item.attachmentName}}></em> -->
              <a class="download-content-link" :href="file.attachmentUrl" download target="_blank">{{file.attachmentName}}</a>
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
</template>

<script>
  export default {
    props: {
      downData: Object
    },
    data () {
      return {
        sendToEmail: '',
        downFileData: {productAttachmentDetailBos: []}
      }
    },
    watch: {
      downData (val) {
        // if (JSON.stringify(val) === JSON.stringify(this.downFileData)) return false
        this.setDownData(val)
      }
    },
    created () {
      this.setDownData(this.downData)
    },
    methods: {
      setDownData (data) {
        let cuValue = {}
        data.productAttachmentDetailBos.forEach(item => {
          cuValue.hasOwnProperty(item.attachmentCode)
          ? cuValue[item.attachmentCode].push({attachmentUrl: item.attachmentUrl, attachmentName: item.attachmentName, uuid: item.uuid})
          : cuValue[item.attachmentCode] = [{attachmentUrl: item.attachmentUrl, attachmentName: item.attachmentName, uuid: item.uuid}]
        })
        data.productAttachmentDetailBos = []
        for (let i in cuValue) {
          data.productAttachmentDetailBos.push({attachmentCode: i, fileList: cuValue[i]})
        }
        this.downFileData = data
      },
      downFile (path) { // 下载附件
        if (path) window.open(path)
      },
      sendDownEmail () { // 发送附件
        let fileList = this.downData.productAttachmentDetailBos
        let paramSend = { sendToEmail: this.sendToEmail, type: 4, attachmentUuidList: [] }
        this.downData.productAttachmentDetailBos.forEach(file => { // 筛选已勾选数据
          paramSend.attachmentUuidList.push(...file.fileList.filter(item => !!item.isSelect).map(item => item.uuid))
        })
        if (paramSend.attachmentUuidList.length === 0) {
          this.$utils.message('Please select the documents you need.')
          return
        }
        if (!this.$utils.trim(paramSend.sendToEmail)) {
          this.$utils.message('Please enter your Email address.')
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
  .download-files{
    position: relative;
    display: flex;
    padding: 1vw 5vw 5vw 5vw;
    z-index: 0;
    justify-content: center;
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
        // justify-content: space-between;
        li.detail-file-li{
          // width: 25vw;
          padding-left: 2vw;
          color: @base-font-color;
          line-height: 1;
          display: flex;
          margin-bottom: 2vw;
          flex-shrink: 0;
          overflow: hidden;
          min-width: 45%;
          .vava-single-check{
            margin-bottom: 1px;
          }
          .download-file-detail{
            display: flex;
            flex-direction: column;
            // justify-content: flex-end;
            p{
              font-size: 1.5vw;
              line-height: 1.3;
              margin-bottom: 0.5vw;
              padding-left: 2vw;
              // font-family: 'avenir-next-demi';
            }
            .download-content{
              font-size: 0.9vw;
              display: flex;
              margin-bottom: 1vw;
              i.icon-download{
                font-size: 1.45vw;
                color: @base-font-color;
                font-weight: bold;
              }
              .download-content-link{
                display: inline-block;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 95%;
                margin: 0 15px 0 0.5vw;
                line-height: 1.2;
                font-size: 1vw;
                white-space: nowrap;
                font-family: 'avenir-next-demi';
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
        min-width: 50vw;
        height: 1px;
        background-color: @un-font-color;
        margin: 1vw 0 2vw 4vw;
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
  @media (max-width: 1350px) {
    .download-files .download-detail .download-detail-file li.detail-file-li .download-file-detail .download-content i.icon-download{font-size: 17.4px;}
    .download-files .download-detail .download-detail-file li.detail-file-li{border-width: 1px;}
  }
  @media (max-width: 1250px) {
    .download-files{
      padding: 1vw 1vw 5vw 1vw;
      .download-detail{
        // .down-input-line{width: 60vw;}
        .download-detail-file li.detail-file-li .download-file-detail p{font-size: 16px;}
        .download-detail-file li.detail-file-li .download-file-detail .download-content .download-content-link{font-size: 12px;}
      }
    }
  }
  @media (max-width: 920px) {
    .download-files{
      padding: 1vw 1vw 5vw 1vw;
      .download-product{
        p{
          margin-top: 20px;
          font-size: 12px;
        }
      }
      .download-detail{
        .down-input-line{margin: 10px 0 20px 4vw;}
        .download-detail-file li.detail-file-li{
          margin-bottom: 20px;
          .download-file-detail{
            p{font-size: 14px;padding-left: 18px;}
            .download-content{
              margin-bottom: 12px;
              i.icon-download{ font-size: 15px;}
              .download-content-link{font-size: 12px;margin-left: 5px;}
            }
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .download-files{
      widows: 100vw;
      flex-direction: column;
      .download-detail{
        .down-input-line{
          width: 90%;
        }
        .download-detail-file{
          padding: 0 10px;
          flex-direction: column;
          li.detail-file-li .download-file-detail .download-content{
            i.icon-download{margin: 0 2px;}
            .download-content-link{max-width: 80%;}
          }
        }
      }
      .download-product{
        text-align: center;
        margin-bottom: 20px;
        p{margin-top: 20px;font-size: 12px;}
      }
    }
  }
</style>

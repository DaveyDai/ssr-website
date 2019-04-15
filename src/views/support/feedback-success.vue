<template>
  <div class="feedback-success">
    <div class="feedback-product" v-if="feedbackData.orderNumber">
      <h5>CONTACT US</h5>
      <p class="feedback-product-p feedback-product-p1">You have selected order number : {{feedbackData.orderNumber}}</p>
      <vava-button class="feedback-submit-button" @click="changeItem">CHANGE AN ITEM</vava-button>
      <div>
        <div class="feedback-product-detail">
          <div class="feedback-product-img"><img :src="feedbackData.productImage" alt=""><span>{{feedbackData.productQuantity}}</span></div>
          <div class="feedback-p-order">
            <p :title="feedbackData.productTitle">{{feedbackData.productTitle}}</p>
            <div class="feedback-p-order-price"><span>price:&nbsp;&nbsp;<em>{{feedbackData.amountCur}} {{feedbackData.productPrice}}</em></span></div>
            <!-- <div class="feedback-p-order-color">Color: Black</div> -->
          </div>
        </div>
        <p class="feedback-product-p number-detail-text">ORDER NUMBER : {{feedbackData.orderNumber}}</p>
        <!-- <p class="feedback-product-p number-detail-text">STATUS : DISPATCHED</p> -->
        <p class="feedback-product-p number-detail-text">ORDER DATE : {{feedbackData.purchasedDate?feedbackData.purchasedDate.replace(/\//g, ' / '):''}}</p>
      </div>
    </div>
    <!-- <div class="feedback-tell-more">
      <h5>TELL US MORE</h5>
      <p>Enter an issue below</p>
      <vava-input class="tell-more-input" placeholder=""></vava-input>
      <p>Select more details</p>
      <vava-input class="tell-more-input" placeholder=""></vava-input>
    </div> -->
    <div class="feedback-success-message">
      <h5>TELL US YOUR MESSAGE</h5>
      <textarea v-model="feedbackInfoBo.description" style="resize:none" class="message-textarea" maxlength="700"></textarea>
      <p class="textarea-dec">You have {{haslength}} characters left.</p>
    </div>
    <div class="feedback-upload-file">
      <upload-file ref="uploadFiles" class="feedback-upload-filelist"></upload-file>
      <p>If you have a supporting image or document that</p>
      <p>will assist us your query please use the facility below.</p>
      <p>We accept the following files.</p>
      <p>( GIF | JPEG | PNG | PDF | TXT | ZIP )</p>
      <vava-button @click="submitMessage" class="feedback-message-button">SEND MESSAGE</vava-button>
    </div>
    <div class="feedback-submit-success" v-if="submitStatus">
      <h5>TELL US YOUR MESSAGE</h5>
      <p>Thank you for your message.</p>
      <p>Our team will contact you shortly via email.</p>
    </div>
  </div>
</template>

<script>
  import UploadFile from '@/components/upload-file.vue'
  export default {
    components: { UploadFile },
    props: {
      feedbackData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      haslength () {
        return 700 - this.$utils.trim(this.feedbackInfoBo.description).length
      }
    },
    data () {
      return {
        submitStatus: false,
        feedbackInfoBo: {
          description: '', // 描述信息
          username: this.$store.state.accountData.emailAddress || '' // 登录账户名
        }
      }
    },
    methods: {
      submitMessage () { // 提交用户反馈信息
        if (this.$utils.trim(this.feedbackInfoBo.description).length < 10) {
          this.$utils.message('Please enter 10-700 characters.')
          return
        }
        this.$bar.start()
        let fileList = this.$refs.uploadFiles.fileList.filter(_ => _)
        if (fileList.length > 0) this.feedbackInfoBo.fileKeys = fileList.map(item => item.fileName)
        if (this.feedbackData.orderNumber) this.feedbackInfoBo.orderNo = this.feedbackData.orderNumber
        this.$store.dispatch('postFetch', {api: 'submitFeedback', data: this.feedbackInfoBo}).then(data => {
          this.$bar.finish()
          this.$utils.message('Submit Successfully.')
          this.submitStatus = true
        }).catch(error => {
          this.$utils.message(error.message)
          this.$bar.finish()
        })
      },
      changeItem () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less" scoped>
  .feedback-success{
    width: 100%;
    .feedback-product{
      padding: 10vw 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #FAFAFA;
      h5{
        font-size: 2.7vw;
        color: @base-font-color;
        text-align: center;
      }
      p.feedback-product-p{
        width: 100%;
        font-size: 1vw;
        color: @un-font-color;
        margin-top: 1vw;
        color: @base-font-color;
      }
      p.feedback-product-p1{text-align: center;margin: 1.5vw 0;}
      .feedback-submit-button{
        margin-bottom: 4vw;
      }
      .feedback-product-detail{
        padding: 2.6vw 2.08vw;
        background-color: #FFF;
        display: flex;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;
        .feedback-product-img{
          width: 9.375vw;
          min-width: 100px;
          margin-right: 1.6vw;
          position: relative;
          img{
            width: 100%;
          }
          span{
            position: absolute;
            top: 0;
            right: 0;
            width: 1.46vw;
            height: 1.46vw;
            min-width: 20px;
            min-height: 20px;
            background-color: @base-button-back;
            border-radius: 50%;
            line-height: 1.6vw;
            font-size: 0.78vw;
            color: #FFF;
            display: inline-block;
            text-align: center;
            transform: translate3d(50%, -50%, 0);
          }
        }
        .feedback-p-order{
          font-size: 0.73vw;
          color: @base-font-color;
          p{
            font-size: 1vw;
            font-family: 'avenir-next-demi';
            max-width: 500px;
            line-height: 1.4;
          }
          .feedback-p-order-price{
            display: flex;
            justify-content: space-between;
            margin: 1vw 0;
            span{margin-right: 4.8vw;}
            em{font-size: 1vw;}
          }
        }
      }
    }
    .feedback-tell-more{
      padding: 10vw 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      h5{
        font-size: 2.7vw;
        color: @base-font-color;
        text-align: center;
        margin-bottom: 1vw;
      }
      p{
        font-size: 1vw;
        margin: 1.5vw 0;
        color: @base-font-color;
      }
      .tell-more-input{
        width: 20.8vw;
        min-width: 300px;
        margin-bottom: 0.5vw;
      }
    }
    .feedback-success-message{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5vw 0 9.375vw 0;
      h5{
        font-size: 2.6vw;
        color: @base-font-color;
        margin-bottom: 2vw;
      }
      .message-textarea{
        width: 31.25vw;
        height: 10.4vw;
        min-width: 300px;
        min-height: 100px;
        font-size: 1.56vw;
        color: @base-font-color;
        padding: 0.8vw 1vw;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;
        border-radius: 1vw;
        border: none;
        .scroll-style();
      }
      p{
        font-size: 1vw;
        color: @base-font-color;
        line-height: 1.5;
        max-width: 26vw;
        text-align: center;
      }
      p.textarea-dec{ margin: 1vw; }
      .message-email-input{
        margin-top: 2.5vw;
        width: 20vw;
        min-width: 300px;
      }
      .feedback-message-button{
        margin-top: 1vw;
      }
    }
    .feedback-upload-file{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5vw 3.5vw 4vw 3.5vw;
      background-color: rgba(98, 68, 187, 0.2);
      .feedback-upload-filelist{
        margin-bottom: 2vw;
      }
      p{
        font-size: 1vw;
        color: @base-font-color;
        line-height: 1.4;
        max-width: 26vw;
        text-align: center;
      }
      .feedback-message-button{
        margin-top: 2vw;
      }
    }
    .feedback-submit-success{
      padding: 2vw 0 9.375vw 0;
      h5{
        font-size: 2.6vw;
        color: @base-font-color;
        margin-bottom: 2vw;
        text-align: center;
      }
      p{
        font-size: 1vw;
        color: @base-font-color;
        line-height: 1.5;
        text-align: center;
      }
    }
  }
  @media (max-width: 1370px) {
    .feedback-success{
      .feedback-product{
        .feedback-product-detail{
          .feedback-product-img{
            span{
              line-height: 20px;
              font-size: 12px;
            }
          }
          .feedback-p-order{
            font-size: 13px;
            p{font-size: 15px;}
            .feedback-p-order-price em{font-size: 14px;}
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .feedback-success{
      .feedback-product{
        p.feedback-product-p{
          font-size: 12px;
          margin-top: 10px;
        }
        p.feedback-product-p1{margin: 15px 0;}
        .feedback-product-detail{
          .feedback-product-img{margin-right: 18px;}
          .feedback-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .feedback-p-order-price em{font-size: 13px;}
          }
        }
      }
      .feedback-tell-more{p{font-size: 12px;}}
      .feedback-upload-file{
        .feedback-upload-filelist{margin-bottom: 24px;}
        p{font-size: 12px;max-width: 305px;}
        .feedback-message-button{margin-top: 24px;}
      }
      .feedback-success-message{
        p{font-size: 12px;max-width: 310px;}
        p.textarea-dec{ margin: 10px; }
        .message-email-input{
          margin-top: 25px;
        }
        .feedback-message-button{
          margin-top: 15px;
        }
      }
      .feedback-submit-success p{font-size: 12px;}
    }
  }
  @media (max-width: 800px) {
    .feedback-success{
      .feedback-product{
        padding: 10vw 15px;
        h5{
          font-size: 21.6px;
        }
        .feedback-submit-button{
          margin-bottom: 32px;
        }
        .feedback-product-detail{
          .feedback-product-img{margin-right: 18px;}
          .feedback-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .feedback-p-order-price{
              margin: 10px 0;
              flex-direction: column;
              em{font-size: 13px;margin-top: 10px;}
            }
          }
        }
      }
      .feedback-tell-more{
        h5{font-size: 21.6px;margin-bottom: 10px;}
        p{font-size: 12px;margin: 11px;}
        .tell-more-input{margin-bottom: 5px;}
      }
      .feedback-upload-file{
        padding: 40px 3.5vw 32px 3.5vw;
      }
      .feedback-success-message{
        h5{font-size: 21.6px;}
        .message-textarea{
          font-size: 13px;
          padding: 8px;
        }
      }
      .feedback-submit-success h5{font-size: 21.6px;}
    }
  }
  @media (max-width: 600px) {
    .feedback-success{
      .feedback-product{
        h5{
          font-size: 18px;
        }
        .feedback-product-detail{
          padding: 20px 15px;
          .feedback-product-img{margin-right: 18px;}
          .feedback-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .feedback-p-order-price em{font-size: 13px;}
          }
        }
      }
      .feedback-tell-more{
        h5{font-size: 18px;}
      }
      .feedback-success-message{
        h5{font-size: 18px;}
        p{max-width: 300px;}
      }
      .feedback-submit-success h5{font-size: 18px;}
    }
  }
</style>

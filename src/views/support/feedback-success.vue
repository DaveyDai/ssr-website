<template>
  <div class="feedback-success">
    <div class="feedback-product">
      <h5>FEEDBACK</h5>
      <p class="feedback-product-p">You have selected serial number : 1347525NHS</p>
      <div class="feedback-product-detail">
        <div class="feedback-product-img"><img src="/static/vacuum/01-首图_VA-RV001.20211.jpg" alt=""><span>1</span></div>
        <div class="feedback-p-order">
          <p>VAVA DASH CAM</p>
          <div class="feedback-p-order-price"><span>See clearly even at night</span><em>$119.99</em></div>
          <div class="feedback-p-order-color">Color: Black</div>
        </div>
      </div>
      <p class="feedback-product-p number-detail-text">SERIAL NUMBER : 1347525NHS</p>
    </div>
    <div v-if="!submitStatus" class="feedback-success-message">
      <h5>TELL US YOUR MESSAGE</h5>
      <textarea class="message-textarea"></textarea>
      <p class="textarea-dec">You have 700 characters left.</p>
      <p>If you have a supporting image or document that will assist us your query please use the facility below.</p>
      <p>We accept the following files.</p>
      <p>( GIF | JPEG | PNG | PDF | TXT | ZIP )</p>
      <vava-button class="feedback-message-button">UPLOAD FILE</vava-button>
      <vava-input class="message-email-input" placeholder="Enter your email"></vava-input>
      <vava-button @click="submitMessage" class="feedback-message-button">CONTACT ME VIA EMAIL</vava-button>
    </div>
    <div v-else class="feedback-submit-success">
      <h5>TELL US YOUR MESSAGE</h5>
      <p>Thank you for your message.</p>
      <p>Our team will contact you shortly via email.</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      feedbackData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        submitStatus: false
      }
    },
    methods: {
      submitMessage () {
        this.$bar.start()
        setTimeout(() => {
          this.submitStatus = true
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        }, 200)
      }
    }
  }
</script>

<style lang="less" scoped>
  .feedback-success{
    width: 100%;
    background-color: #FAFAFA;
    .feedback-product{
      padding: 6.25vw 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      h5{
        font-size: 2.7vw;
        color: @base-font-color;
        text-align: center;
      }
      p.feedback-product-p{
        width: 100%;
        font-size: 1vw;
        color: @un-font-color;
        text-align: center;
        margin: 2vw;
      }
      p.number-detail-text{color: @base-button-back;}
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
    .feedback-success-message{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2vw 0 9.375vw 0;
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
        color: @un-font-color;
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
          margin: 15px;
        }
        .feedback-product-detail{
          .feedback-product-img{margin-right: 18px;}
          .feedback-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .feedback-p-order-price em{font-size: 13px;}
          }
        }
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
        h5{
          font-size: 21.6px;
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
          margin: 0 2vw;
          .feedback-product-img{margin-right: 18px;}
          .feedback-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .feedback-p-order-price em{font-size: 13px;}
          }
        }
      }
      .feedback-success-message p{max-width: 300px;}
      .feedback-submit-success h5{font-size: 18px;}
    }
  }
</style>

<template>
  <div class="support-warranty">
    <div v-if="!warrantySuccess" class="support-warranty-home">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Warranty Banner.jpg" alt="">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Services.jpg" alt="">
      <div class="support-warranty-submit">
        <h5>CHECK YOUR WARRANTY COVERAGE</h5>
        <p>Enter your order number</p>
        <!-- <p>Enter your product serial number | order number | tracking number</p> -->
        <vava-input v-model="warrantyNumber" class="warranty-input" :error="isNotExist"></vava-input>
        <p v-show="isNotExist" class="feedback-submit-error">{{notExistMessage}}</p>
        <vava-button class="warranty-submit-button" @click="queryErpOrder">CONTINUE</vava-button>
        <div class="warranty-coverage">
          <!-- <p class="warranty-coverage-title">Warranty Coverage</p>
          <p>VAVA 150” 4K Laser Projector — 18 Months</p>
          <p>VAVA Dash Cam — 12 Months</p>
          <p>VAVA 2K Dash Cam — 12 Months</p>
          <p>VAVA Home Cam — 12 Months</p>
          <p>VAVA Intelligent Robotic Vacuum — 12 Months</p>
          <p>VAVA USB Hub — 6 Months</p> -->
        </div>
      </div>
    </div>
    <warranty-success v-else :order-details="orderDetails"></warranty-success>
  </div>
</template>

<script>
  import WarrantySuccess from './warranty-success.vue'
  export default {
    components: { WarrantySuccess },
    data () {
      return {
        warrantyNumber: '', // 111-2195004-7470646
        warrantySuccess: false,
        orderDetails: {},
        isNotExist: false,
        notExistMessage: 'Sorry, this order number does not exist, please try again.'
      }
    },
    mounted () {
      this.message = this.$utils.formatDate(new Date(''), 'MM/dd/yyyy')
    },
    methods: {
      queryErpOrder () {
        if (!this.warrantyNumber) {
          this.isNotExist = false
          this.$utils.message('Please enter your order number.')
          return
        }
        if (this.$bar.show) return // 防止重复点击提交
        this.$bar.start()
        this.$store.dispatch('getByUrl', {api: 'queryErpOrder', data: this.warrantyNumber}).then(data => { // 先查询erp是否有该订单
          this.isNotExist = false
          this.submitWarranty()
        }).catch(error => {
          this.isNotExist = true
          this.notExistMessage = error && error.code === 14101 ? error.message : 'The system is busy. Please try to refresh it.'
          this.$bar.finish()
        })
      },
      submitWarranty () {
        this.$store.dispatch('getByUrl', {api: 'submitWarranty', data: this.warrantyNumber}).then(data => { // 提交延保
          data.expirationTime = data.expirationTime ? this.$utils.formatDate(new Date(data.expirationTime.replace(/\-/g, '/')), 'MM/dd/yyyy') : ''
          this.orderDetails = data
          this.warrantySuccess = true
          if (typeof window !== 'undefined') {
            window.document.getElementsByTagName('html')[0].scrollTop = 0
            try {window.scrollTo(0,0)}catch(e){console.log(e)}
          }
          this.$bar.finish()
        }).catch(error => {
          this.isNotExist = false
          error && error.message ? this.$utils.message(error.message) : this.$utils.message('warranty failure!')
          this.$bar.finish()
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .support-warranty{
    width: 100%;
    font-size: 0;
    .support-warranty-banner{
      width: 100%;
      min-height: 34vw;
    }
    .support-warranty-submit{
      width: 100%;
      padding: 7.55vw 3vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      h5{
        font-size: 2.6vw;
        color: @base-font-color;
        font-family: 'avenir-next-demi';
        text-align: center;
        margin-bottom: 2vw;
      }
      p{
        font-size: 1.56vw;
        color: @base-icon-color;
        text-align: center;
        margin-bottom: 2vw;
      }
      p.feedback-submit-error{
        color: #D27460;
        margin-top: 1vw;
      }
      .warranty-input{
        width: 20.8vw;
        min-width: 250px;
        min-height: 35px;
        input{min-height: 35px;text-align: center;}
      }
      .warranty-submit-button{
        margin: 2vw 0 4vw 0;
      }
      .warranty-coverage{
        width: 100%;
        text-align: center;
        p{
          font-size: 1.56vw;
          color: @un-font-color;
          margin-bottom: 0;
          line-height: 1.5;
        }
        p.warranty-coverage-title{
          font-family: 'avenir-next-demi';
          color: @base-font-color;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .support-warranty{
      .support-warranty-submit{
        padding: 7.55vw 3vw;
        h5{font-size: 20px;}
        p{font-size: 12.5px;}
        .warranty-coverage p{font-size: 12px;}
      }
    }
  }
  @media (max-width: 600px) {
    .support-warranty{
      .support-warranty-submit{
        padding: 7.55vw 3vw;
        margin-bottom: 30px;
        h5{font-size: 14px;}
        p{font-size: 9px;}
        .warranty-coverage p{font-size: 9px;}
      }
    }
  }
</style>


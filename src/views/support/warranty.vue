<template>
  <div class="support-warranty">
    <div v-if="!warrantySuccess" class="support-warranty-home">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Warranty Banner.jpg" alt="">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Services.jpg" alt="">
      <div class="support-warranty-submit">
        <h5>CHECK YOUR WARRANTY COVERAGE</h5>
        <p>Enter your product serial number | order number | tracking number</p>
        <vava-input v-model="warrantyNumber" class="warranty-input"></vava-input>
        <vava-button class="warranty-submit-button" @click="queryErpOrder">CONTINUE</vava-button>
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
        orderDetails: {}
      }
    },
    methods: {
      queryErpOrder () {
        if (!this.warrantyNumber || this.$bar.show) return // 防止重复点击提交
        this.$bar.start()
        this.$store.dispatch('getByUrl', {api: 'queryErpOrder', data: this.warrantyNumber}).then(data => { // 先查询erp是否有该订单
          this.submitWarranty()
        }).catch(error => {
          error && error.code === 14101 ? this.$utils.message(error.message) : this.$utils.message('warranty failure!')
          this.$bar.finish()
        })
      },
      submitWarranty () {
        this.$store.dispatch('getByUrl', {api: 'submitWarranty', data: this.warrantyNumber}).then(data => { // 提交延保
          data.expirationTime = this.formatDate(new Date(data.expirationTime), 'MM/dd/yyyy')
          this.orderDetails = data
          this.warrantySuccess = true
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        }).catch(error => {
          error && error.message ? this.$utils.message(error.message) : this.$utils.message('warranty failure!')
          this.$bar.finish()
        })
      },
      formatDate (value, filter) {
        let o = {
          'M+' : value.getMonth() + 1,                     // 月份   
          'd+' : value.getDate(),                          // 日   
          'h+' : value.getHours(),                         // 小时   
          'm+' : value.getMinutes(),                       // 分   
          's+' : value.getSeconds(),                       // 秒   
          'q+' : Math.floor((value.getMonth() + 3) / 3),   // 季度   
          'S'  : value.getMilliseconds()                   // 毫秒   
        }
        if (/(y+)/.test(filter)) filter = filter.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (let k in o) 
          if (new RegExp('('+ k +')').test(filter))
            filter = filter.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        return filter
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
      .warranty-input{
        width: 20.8vw;
        min-width: 250px;
        min-height: 35px;
        input{min-height: 35px;text-align: center;}
      }
      .warranty-submit-button{
        margin: 5vw 0;
      }
    }
  }
  @media (max-width: 800px) {
    .support-warranty{
      .support-warranty-submit{
        padding: 7.55vw 3vw;
        h5{font-size: 20px;}
        p{font-size: 12.5px;}
      }
    }
  }
  @media (max-width: 600px) {
    .support-warranty{
      .support-warranty-submit{
        padding: 7.55vw 3vw;
        h5{font-size: 14px;}
        p{font-size: 9px;}
      }
    }
  }
</style>


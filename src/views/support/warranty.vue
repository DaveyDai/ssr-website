<template>
  <div class="support-warranty">
    <div v-if="!warrantySuccess" class="support-warranty-home">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Warranty Banner.jpg" alt="">
      <img class="support-warranty-banner" src="/static/website-imgages/support/Services.jpg" alt="">
      <div class="support-warranty-submit">
        <h5>CHECK YOUR WARRANTY COVERAGE</h5>
        <p>Enter your product serial number | order number | tracking number</p>
        <vava-input v-model="warrantyNumber" class="warranty-input"></vava-input>
        <vava-button class="warranty-submit-button" @click="submitWarranty">CONTINUE</vava-button>
      </div>
    </div>
    <warranty-success v-else></warranty-success>
  </div>
</template>

<script>
  import WarrantySuccess from './warranty-success.vue'
  export default {
    components: { WarrantySuccess },
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('support', route.params.pId)
      // return store.dispatch('queryCategory', {api: 'signIn', cId: route.params.cId})
    },
    data () {
      return {
        warrantyNumber: '12456765324321',
        warrantySuccess: false
      }
    },
    methods: {
      submitWarranty () {
        this.$bar.start()
        setTimeout(() => {
          this.warrantySuccess = true
          window.document.getElementById('app').scrollTo(0, 0)
          this.$bar.finish()
        }, 2000)
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


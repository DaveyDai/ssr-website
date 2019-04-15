<template>
  <!-- <div class="count-time" v-if="timeData > 0"> -->
  <div class="count-time">
    <p v-if="timeData > 0"><span>{{timeData}}s</span>  remaining</p>
    <span v-else class="resend-code" @click="timeOutResend">Resend</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeData: 0,
      interval: null
    }
  },
  methods: {
    startTimeOut () {
      this.timeData = 60
      this.interval = setInterval(() => {
        this.timeData --
        if (this.timeData === 0) clearInterval(this.interval)
      }, 1000)
    },
    timeOutResend () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
  .count-time{
    p{
      font-size: 0.84vw;
      color: @un-font-color;
      text-align: center;
      span{
        font-size: 0.9vw;
        color: @base-color;
      }
    }
    .resend-code{
      display: inline-block;
      font-size: 1vw;
      color: @base-button-back;
      text-align: center;
      text-decoration: underline;
      cursor: pointer;
      margin: 0.6vw 0;
    }
  }
  @media (max-width: 1350px) {
    .count-time{
      p{
        font-size: 13px;
        span{font-size: 12px;}
      }
      .resend-code{
        font-size: 12px;
      }
    }
  }
</style>

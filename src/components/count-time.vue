<template>
  <div class="count-time" v-if="timeData > 0"><span>{{timeData}}s</span>  remaining</div>
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
    }
  }
}
</script>

<style lang="less" scoped>
  .count-time{
    font-size: 0.84vw;
    color: @un-font-color;
    text-align: center;
    span{
      font-size: 0.9vw;
      color: @base-color;
    }
  }
  @media (max-width: 1350px) {
    .count-time{
      font-size: 13px;
      span{font-size: 12px;}
    }
  }
</style>

<template>
  <div class="vava-single-check">
    <i @click="hanldClick" :class="changeValue ? 'icon icon-single-check' : 'un-check'"></i>
  </div>
</template>

<script>
  export default {
    props: {
      value: Boolean
    },
    data () {
      return {
        changeValue: this.value
      }
    },
    methods: {
      hanldClick () {
        this.changeValue = !this.changeValue
        this.$emit('input', this.changeValue)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-single-check{
    display: flex;
    align-items: center;
    i.icon{
      font-size: 1.05vw;
      color: @base-button-back;
      margin-right: 0.8vw;
      cursor: pointer;
    }
    i.un-check{
      display: inline-block;
      width: 1.05vw;
      height: 1.05vw;
      border-radius: 50%;
      border: 0.1vw solid @base-font-color;
      margin-right: 0.8vw;
      cursor: pointer;
    }
  }
  @media (max-width: 1550px) {
    .vava-single-check{
      i.icon{
        font-size: 16px;
      }
      i.un-check{
        width: 16px;
        height: 16px;
        border-width: 2px;
      }
    }
  }
  @media (max-width: 920px) {
    .vava-single-check{
      i.icon{
        font-size: 14px;
      }
      i.un-check{
        width: 14px;
        height: 14px;
      }
    }
  }
</style>

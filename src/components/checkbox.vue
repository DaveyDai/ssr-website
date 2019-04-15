<template>
  <div class="vava-checkbox"><span @click="handleCheck" class="vava-checkbox-select" :class="{active: currentValue}"><i class="icon icon-selected"></i></span><slot></slot></div>
</template>

<script>
  export default {
    name: 'VavaCheckbox',
    componentName: 'VavaCheckbox',
    props: {
      value: Boolean
    },
    watch: {
      value (newValue) {
        this.currentValue = newValue
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    methods: {
      handleCheck () {
        this.currentValue = !this.currentValue
        this.$emit('input', this.currentValue)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-checkbox{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    color: @base-font-color;
    line-height: 1.3;
    .vava-checkbox-select{
      display: flex;
      width: 1.6vw;
      height: 1.6vw;
      min-width: 20px;
      min-height: 20px;
      align-items: center;
      justify-content: center;
      margin-right: 1.04vw;
      background-color: @button-un-color;
      transition: .3s all;
      flex-shrink: 0;
      border-radius: 2px;
      cursor: pointer;
      i{
        color: #FFF;
        font-size: 0.6vw;
      }
      &:hover{border: 0.052vw solid @base-button-back}
    }
    span.active{
      background-color: @base-button-back;
    }
  }
  @media (max-width: 1350px) {
    .vava-checkbox{
      .vava-checkbox-select{
        margin-right: 15px;
        i{
          font-size: 10px;
        }
      }
    }
  }
  @media (max-width: 500px) {
  }
</style>

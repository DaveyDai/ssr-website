<template>
  <button class="vava-button" @click="handleClick"><slot></slot></button>
</template>

<script>
  export default {
    name: 'VavaButton',
    componentName: 'VavaButton',
    methods: {
      handleClick (el) {
        this.$emit('click', el)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-button{
    width: auto;
    height: 3.125vw;
    min-height: 40px;
    background-color: @base-button-back;
    cursor: pointer;
    font-size: 1.04vw;
    border-radius: 3vw;
    color: #FFF;
    padding: 0 2.8vw;
    border: none;
  }
  @media (max-width: 1350px) {
    .vava-button{
      font-size: 14px;
      border-radius: 35px;
    }
  }
  @media (max-width: 1100px) {
    .vava-button{
      padding: 0 36px;
    }
  }
</style>

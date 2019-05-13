<template>
  <button class="vava-button" @click="handleClick" :class="{'is-disable': disable, 'no-active': noActive}"><slot></slot></button>
</template>

<script>
  export default {
    props: {
      disable: Boolean,
      noActive: Boolean
    },
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
  .is-disable{
    background-color: #DDDDDD;
    color: #FFF;
  }
  .no-active{
    border: 1px solid @base-color;
    background: none;
    color: @base-color;
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

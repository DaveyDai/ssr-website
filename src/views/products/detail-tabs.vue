<template>
  <div class="product-detail-tabs">
    <li v-for="(item, index) of overData" :key="index" :class="changeValue === index ? 'active' : ''" @click="tabsSelect(index)" v-show="index !== 3 || changeValue !== 3">{{item}}</li>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number
    },
    computed: {
      categoryData () {
        return this.$store.state.categoryData[this.$route.params.cId]
      }
    },
    data () {
      return {
        changeValue: this.value,
        overData: ['OVERVIEW', 'SPECIFICATIONS', 'SUPPORT', 'BUY NOW']
      }
    },
    mounted () {
    },
    methods: {
      callback (e) {
      },
      routerLink (path) {
        this.$router.push(path)
      },
      tabsSelect (index) {
        this.changeValue = index
        this.$emit('input', this.changeValue)
      }
    }
  }
</script>

<style lang="less">
  .product-detail-tabs{
    position: fixed;
    top: 10.4vw;
    left: 0;
    width: 100%;
    height: 4.166vw;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5.2vw;
    background-color: #FFF;
    transition: top .15s;
    z-index: 999;
    li{
      position: relative;
      height: 2.5vw;
      min-height: 35px;
      margin: 0 1.04vw;
      font-size: 0.99vw;
      color: @base-font-color;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
      padding-top: 2px;
      white-space: nowrap;
    }
    li.active{
      padding-left: 2.81vw;
      padding-right: 2.81vw;
      background-color: @base-button-back;
      border-radius: 5vw;
      color: #FFF;
    }
    li::after{
      content: " ";
      position: absolute;
      bottom: 5px;
      left: 10%;
      width: 0;
      height: 2px;
      background-color: @base-button-back;
      transition: all 0.25s;
    }
  }
  @media (max-width: 1200px) {
    .product-detail-tabs{
      li{
        font-size: 12px;
      }
    }
  }
  @media (max-width: 920px) {
    .product-detail-tabs{
      li{
        margin: 0 10px;
      }
      li.active{
        padding-left: 25px;
        padding-right: 25px;
      }
    }
  }
  @media (max-width: 500px) {
    .product-detail-tabs{
      justify-content: space-around;
      padding-right: 0;
      li{
        padding: 0;
        margin: 0;
      }
      li.active{
        padding: 0;
        background-color: #FFF;
        color: @base-button-back;
        &::after{
          width: 80%;
        }
      }
    }
  }
</style>

<template>
  <div class="product-detail-tabs">
    <li v-for="(item, index) of overData" :key="index" :class="{'active': changeValue === index, 'is-buy-now': index === 3 && changeValue !== index}" @click="tabsSelect(index)"
      v-show="!item.isHidden"
    >{{item.dicValue}}</li>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number,
      overData: Array
    },
    computed: {
      categoryData () {
        return this.$store.state.categoryData[this.$route.params.cId]
      }
    },
    data () {
      return {
        changeValue: this.value
      }
    },
    methods: {
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
    top: 3.658vw;
    left: 0;
    width: 100%;
    height: 4.166vw;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5.2vw;
    background-color: #f8f8f8;
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
      // transition: all 0.2s;
      white-space: nowrap;
      &:hover{
        color: @base-button-back;
      }
    }
    li.active{
      color: @base-button-back;
    }
    li.is-buy-now{
      padding-left: 2.81vw;
      padding-right: 2.81vw;
      background-color: @base-button-back;
      border-radius: 5vw;
      color: #FFF;
    }
    // li::after{
    //   content: " ";
    //   position: absolute;
    //   bottom: 5px;
    //   left: 10%;
    //   width: 0;
    //   height: 2px;
    //   background-color: @base-button-back;
    //   transition: all 0.25s;
    // }
  }
  @media (max-width: 1920px) {.product-detail-tabs{top: 70px;}}
  @media (max-width: 1200px) {
    .product-detail-tabs{li{font-size: 12px;}}
  }
  @media (max-width: 920px) {
    .product-detail-tabs{
      top: 60px;
      li{margin: 0 10px;}
      li.is-buy-now{
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
      li.is-buy-now{
        padding: 0 10px;
        min-height: 26px;
        align-items: flex-start;
        line-height: 28px;
        &::after{
          width: 80%;
        }
      }
    }
  }
</style>

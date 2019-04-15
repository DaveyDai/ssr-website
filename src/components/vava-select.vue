<template>
  <div class="vava-select">
    <div class="vava-select-input" @click.stop="isShow=!isShow"><em>{{currentValue}}</em><span class="icon icon-right-slide" :class="isShow?'show-active':''"></span></div>
	  <transition
      v-on:before-enter="itemHidden"
      v-on:enter="itemShow"
      v-on:after-enter="itemShow"
      v-on:before-leave="itemShow"
      v-on:leave="itemHidden"
      v-on:after-leave="itemHidden"
    >
      <ul v-show="isShow">
        <li @click="selectClick(item)" v-for="(item, index) of selectData" :key="index">{{item.dicExtra}}</li>
      </ul>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'VavaSelect',
    componentName: 'VavaSelect',
    props: {
      value: [String, Number],
      selectData: Array
    },
    watch: {
      value (newValue) {
        this.currentValue = newValue
      }
    },
    data () {
      return {
        currentValue: this.value,
        isOnComposition: false,
        isShow: false
      }
    },
    mounted () {
      this.$nextTick(() => {
        document.body.addEventListener("click", () => {
          if (this.isShow) this.isShow = false
        })
      })
    },
    methods: {
      handleComposition(event) {
        this.isOnComposition = event.type !== 'compositionend'
      },
      handleInput () {
        if (this.isOnComposition) return
        this.$emit('input', this.currentValue)
      },
      itemHidden (el) {
        el.style.height = '0'
      },
      itemShow (el) {
        el.style.height = el.scrollHeight + 'px'
      },
      selectClick (item) {
        this.currentValue = item.dicExtra
        this.isShow = false
        this.$emit('input', item.dicExtra)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-select{
    position: relative;
    height: 3.125vw;
    min-height: 40px;
    .vava-select-input{
      width: 100%;
      height: 100%;
      border-radius: 5vw;
      padding: 0 20px;
      border: 1px solid #e2e2e2;
      color: @base-font-color;
      font-size: 1vw;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      span.icon{
        position: absolute;
        right: 20px;
        transition: transform .3s ease-out;
        transform: rotate(90deg);
      }
      span.show-active{
        transform: rotate(-90deg);
      }
    }
    ul{
      margin-top: 8px;
      position: relative;
      z-index: 9999;
      width: 100%;
      background-color: #FFF;
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      transition: all .3s;
      overflow: hidden;
      li{
        cursor: pointer;
        height: 1.56vw;
        min-height: 30px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        &:hover{background-color: #f5f7fa;}
      }
    }
  }
  @media (max-width: 1200px) {
    .vava-select{
      .vava-select-input{
        border-radius: 30px;
        font-size: 12px;
      }
    }
  }
</style>


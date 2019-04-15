<template>
    <!-- <transition
      v-on:before-enter="searchHidden"
      v-on:enter="searchShow"
      v-on:after-enter="searchShow"
      v-on:before-leave="searchShow"
      v-on:leave="searchHidden"
      v-on:after-leave="searchHidden">
      <div class="vava-search" v-if="value"><input v-model="searchValue" type="text"><i @click="closeSearch" class="iconfont icon-jiaochacross78"></i></div>
    </transition> -->
    <transition name="search-fade" @after-enter="afterEnter">
      <div class="vava-search" v-show="isShow"><input v-model="searchValue" maxlength="100" :type="type"><span @click="closeSearch"><i class="icon icon-close"></i></span></div>
    </transition>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      isShow: Boolean,
      type: {
        type: String,
        default: 'text'
      }
    },
    data () {
      return {
        searchValue: this.value
      }
    },
    watch: {
      searchValue (value) {
        this.$emit('input', value)
      }
    },
    methods: {
      closeSearch () {
        this.$emit('close', false)
      },
      afterEnter: function (el) {
        el.firstChild.focus()
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-search{
    width: 100%;
    height: 100%;
    overflow: hidden;
    input{
      width: 100%;
      height: 100%;
      border-radius: 3vw;
      background-color: #FFF;
      border: 0.052vw solid #A7A4A4;
      padding: 0 4vw 0 2vw;
      font-size: 1.25vw;
      color: @base-font-color;
    }
    span{
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 3.5vw;
      display: flex;
      align-items: center;
      padding-left: 0.5vw;
      cursor: pointer;
      i{
        font-size: 1vw;
        color: #A7A4A4;
        transition: margin .25s;
      }
      &:hover{
        i{margin-left: 0.5vw}
      }
    }
  }
	.search-fade-enter-active,.search-fade-leave-active{
	  transition: transform .25s ease-in;
	}
	.search-fade-enter, .search-fade-leave-to{
    transform: scaleX(0)
  }
  @media (max-width: 1680px) {
    .vava-search{
      input{font-size: 20px;}
      span{i{font-size: 18px;}}
    }
  }
  @media (max-width: 1450px) {
    .vava-search{
      input{
        padding-right: 4.5vw;
        font-size: 20px;
      }
      span{
        width: 4vw;
        i{font-size: 18px;}
      }
    }
  }
  @media (max-width: 920px) {
    .vava-search{
      width: 0!important;
      height: 0!important;
    }
  }
</style>


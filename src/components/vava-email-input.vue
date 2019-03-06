<template>
  <div class="vava-email-input" @keyup.enter="handleClick">
    <input
      v-model="currentValue"
      v-bind="$attrs"
      @input="handleInput"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      type="email"
    >
    <div class="vava-email-input-icon" v-if="iconShow" @click="handleClick"><i class="icon icon-right-slide"></i></div>
  </div>
</template>

<script>
  export default {
    name: 'VavaEmailInput',
    componentName: 'VavaEmailInput',
    props: {
      value: [String, Number],
      iconShow: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      value (newValue) {
        this.currentValue = newValue
      }
    },
    data () {
      return {
        currentValue: this.value,
        isOnComposition: false
      }
    },
    mounted () {
      window.enter = () => {
        this.handleClick()
      }
    },
    methods: {
      handleComposition(event) {
        this.isOnComposition = event.type !== 'compositionend'
      },
      handleInput () {
        if (this.isOnComposition) return
        this.$emit('input', this.currentValue)
      },
      handleClick (el) {
        this.$emit('click', el)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-email-input{
    position: relative;
    display: flex;
    align-items: center;
    input{
      width: 100%;
      height: 100%;
      border-radius: 5vw;
      padding: 0 12% 0 8%;
      line-height: 1;
      background-color: #2e1f5b;
      border: 0.052vw solid #FFF;
      color: #FFF;
    }
    input::placeholder{color: #c1c1c1;}
    .vava-email-input-icon{
      position: absolute;
      right: 0;
      width: 10%;
      height: 100%;
      display: flex;
      align-items: center;
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
      cursor: pointer;
      i{color: #FFF; font-size: 18px;transition: margin .25s}
      &:hover{ i{margin-left: 5px;} }
    }
  }
  @media (max-width: 920px) {
    .vava-email-input{
      input{border-radius: 50px;}
      .vava-email-input-icon{
        width: 11%;
        i{font-size: 16px;}
        &:hover{ i{margin-left: 0;} }
      }
    }
  }
  @media (max-width: 414px) {
    .vava-email-input{
      .vava-email-input-icon{
        width: 11%;
        i{font-size: 14px;margin-top: 3px;}
      }
    }
  }
</style>

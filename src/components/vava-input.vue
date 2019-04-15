<template>
  <div class="vava-common-input" :class="error ? 'vava-input-error' : ''">
    <input
      v-model="currentValue"
      v-bind="$attrs"
      @input="handleInput"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      :type="type"
    >
  </div>
</template>

<script>
  export default {
    name: 'VavaInput',
    componentName: 'VavaInput',
    props: {
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      error: Boolean
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
    methods: {
      handleComposition(event) {
        this.isOnComposition = event.type !== 'compositionend'
      },
      handleInput () {
        if (this.isOnComposition) return
        this.$emit('input', this.currentValue)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-common-input{
    position: relative;
    display: flex;
    align-items: center;
    min-height: 40px;
    height: 3.125vw;
    input{
      width: 100%;
      height: 100%;
      min-height: 40px;
      border-radius: 5vw;
      padding: 0 12% 0 8%;
      line-height: 1;
      border: 0.052vw solid #e2e2e2;
      color: @base-font-color;
      font-size: 1vw;
      transition: color 0.3s, border 0.3s;
    }
    input::placeholder{color: #c1c1c1;}
  }
  .vava-input-error{
    input{
      color: #D27460;
      border-color: #D27460;
    }
  }
  @media (max-width: 1600px) {
    .vava-common-input input{font-size: 16px;}
  }
  @media (max-width: 1350px) {
    .vava-common-input{
      input{
        border-radius: 50px;
      }
    }
  }

</style>

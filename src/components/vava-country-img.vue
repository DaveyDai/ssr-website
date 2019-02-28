<template>
  <div class="vava-country-img" @click="clickShow"
    :class="{
      'vava-country-china': countryName === 'zh',
      'vava-country-us': countryName === 'en',
      'vava-country-germany': countryName === 'ge',
      'vava-country-japan': countryName === 'jp'
    }"
  ></div>
</template>

<script>
  export default {
    data () {
      return {
        countryName: ''
      }
    },
    beforeMount () {
      console.log('客户端cookise:', this.$cookies.get('language'))
      this.countryName = this.$cookies.get('language') || 'en'
    },
    mounted () {},
    methods: {
      closeSearch () {
        this.$emit('input', false)
      },
      setCountry (type) {
        this.countryName = type
        this.$cookies.set('language', type)
        this.$i18n.locale = type === 'ge' || type === 'jp' ? 'en' : type
      },
      clickShow () {
        this.$emit('click', 3)
      }
    }
  }
</script>

<style lang="less" scoped>
  .vava-country-img{
    width: 1.5vw;
    height: 1.5vw;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border-radius: 50%;
    margin: 0 0.88vw;
    cursor: pointer;
  }
  .vava-country-japan{
    background-image: url(/src/assets/images/country-icon/JPY-font.png);
    border: 1px solid #a7a4a4;
  }
  .vava-country-germany{
    background-image: url(/src/assets/images/country-icon/germany-font.png);
  }
  .vava-country-us{
    background-image: url(/src/assets/images/country-icon/USD-font.png);
  }
  .vava-country-china{
    background-image: url(/src/assets/images/country-icon/CNY-font.png);
  }
  @media (max-width: 1400px) {
    .vava-country-img{
      width: 22px;
      height: 22px;
    }
  }
</style>


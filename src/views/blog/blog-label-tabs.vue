<template>
  <div class="blog-label-tabs" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) of slideLabel" :key="index">
        <span @click="handleClick(item, index)" :class="item.active ? 'active' : ''" class="blog-tabs-key">{{item.moduleTitle}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      labelData: Array
    },
    data () {
      return {
        swiperOption: {
          freeMode: true,
          slidesPerView: 'auto',
          grabCursor : true,
          spaceBetween: 30, // 间隔
          breakpoints: { // 适应屏幕宽度
            1680: { spaceBetween: 25 },
            1400: { spaceBetween: 20 },
            1050: { spaceBetween: 10 }
          }
        },
        slideLabel: []
      }
    },
    created () {
      for (let i = 0; i < this.labelData.length; i++) {
        this.labelData[i].active = false
        if (this.$route.params.label && this.labelData[i].id === Number(this.$route.params.label)) this.labelData[i].active = true
        this.slideLabel.push(JSON.parse(JSON.stringify(this.labelData[i])))
      }
    },
    methods: {
      handleClick (item, index) {
        for (let i = this.slideLabel.length; i--;) this.slideLabel[i].active = false
        item.active = true
        this.$emit('click', item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-label-tabs{
    padding: 0 5px;
    .swiper-wrapper{
      .swiper-slide{
        width: auto;
        padding: 2vw 0;
        .blog-tabs-key{
          font-size: 1vw;
          padding: 0.5vw 1vw;
          color: #FFF;
          background-color: #C9C9C9;
          border-radius: 5vw;
          cursor: pointer;
          transition: background .3s;
        }
        span.active{
          background-color: @base-button-back;
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .blog-label-tabs{
      .swiper-wrapper{
        .swiper-slide{
          padding: 20px 0;
          .blog-tabs-key{
            font-size: 12px;
            padding: 9px 12px  8px 12px;
            border-radius: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 920px) {
    .blog-label-tabs{
      .swiper-wrapper{
        .swiper-slide{
          padding: 18px 0;
          .blog-tabs-key{
            font-size: 11px;
            padding: 8px 12px  7px 12px;
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .blog-label-tabs{
      .swiper-wrapper{
        .swiper-slide{
          .blog-tabs-key{
            font-size: 10px;
          }
        }
      }
    }
  }
</style>

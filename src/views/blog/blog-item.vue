<template>
  <div class="blog-item">
    <div class="blog-item-img"><slot name="item-img"></slot><span class="blog-item-img-label" v-if="label">{{label}}</span></div>
    <div class="blog-item-title"><slot name="item-title"></slot></div>
    <div class="blog-item-describe" ref="blogItemDescribe"><slot name="item-describe"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String
    },
    mounted () {
      this.$nextTick(() => {
        if (navigator.userAgent.indexOf("Firefox") !== -1) {
          let clientWidth = this.$refs.blogItemDescribe.clientWidth
          let innerText = this.$refs.blogItemDescribe.getElementsByTagName('p')[0].innerText
          if (clientWidth > 800) {
            this.$refs.blogItemDescribe.getElementsByTagName('p')[0].innerText = this.getShowStr(innerText, 240)
          } else if (clientWidth > 500) {
            this.$refs.blogItemDescribe.getElementsByTagName('p')[0].innerText = this.getShowStr(innerText, clientWidth / 10 * 2) // 12号字体1个字符6个像素
          } else {
            this.$refs.blogItemDescribe.getElementsByTagName('p')[0].innerText = this.getShowStr(innerText, clientWidth / 8 * 2) // 12号字体1个字符6个像素
          }
        }
      })
    },
    methods: {
      getShowStr (value, len) {
        return value.length > len ? value.substr(0, len) + '...' : value
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-item{
    position: relative;
    width: 100%;
    font-size: 0;
    color: @base-font-color;
    margin-top: 3.125vw;
    .blog-item-img{
      position: relative;
      width: 100%;
      img{
        width: 100%;
        min-height: 50vw;
        cursor: pointer;
      }
      span.blog-item-img-label{
        position: absolute;
        top: 3.125vw;
        left: 3.125vw;
        padding: 0 2.5vw;
        background-color: @base-button-back;
        color: #FFF;
        font-size: 1.56vw;
        border-radius: 10vw;
        display: flex;
        align-items: center;
        height: 3.125vw;
        min-height: 19px;
      }
    }
    .blog-item-title p{
      line-height: 1.2;
      font-size: 1.93vw;
      margin-top: 2vw;
      margin-bottom: 1vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .blog-item-describe p{
      font-size: 1.56vw;
      line-height: 1.979vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 4vw;
      position: relative;
      // &::after{
      //   content: "..."; 
      //   position: absolute; 
      //   bottom: 0; 
      //   right: 0; 
      //   padding-left: 0;//以上三个属性，可以后续调整，看要把...放在哪个位置
      //   background: -webkit-linear-gradient(left, transparent, #fff 55%);
      //   background: -o-linear-gradient(right, transparent, #fff 55%);
      //   background: -moz-linear-gradient(right, transparent, #fff 55%);
      //   background: linear-gradient(to right, transparent, #fff 55%);//背景色可写成渐变也可写成一样的颜色
      // }
    }
      // p{
      //   position: relative; 
      //   line-height: 20px;
      //   max-height: 40px;//设置最大高度，加上overflowhidden，正好是两行，使超出部分隐藏
      //   overflow: hidden;
      // }
      // p::after{
      //   content: "..."; 
      //   position: absolute; 
      //   bottom: 0; 
      //   right: 0; 
      //   padding-left: 40px;//以上三个属性，可以后续调整，看要把...放在哪个位置
      //   background: -webkit-linear-gradient(left, transparent, #fff 55%);
      //   background: -o-linear-gradient(right, transparent, #fff 55%);
      //   background: -moz-linear-gradient(right, transparent, #fff 55%);
      //   background: linear-gradient(to right, transparent, #fff 55%);//背景色可写成渐变也可写成一样的颜色
      // }
  }
  .blog-img-item{
    width: 29.1vw;
    .blog-item-img{
      span.blog-item-img-label{
        top: 1vw;
        left: 1vw;
        padding: 0 1vw;
        font-size: 0.73vw;
        display: flex;
        align-items: center;
        height: 1.25vw;
        min-height: 24px;
      }
      img{
        min-height: 13vw;
      }
    }
    .blog-item-title p{
      padding-right: 0.5vw;
      font-size: 1.3vw;
    }
    .blog-item-describe p{
      padding-right: 0.5vw;
      font-size: 1vw;
      line-height: 1.25vw;
      max-height: 2.6vw;
      overflow: hidden;
    }
  }
  @media (max-width: 1200px) {
    .blog-item{
      .blog-item-img{
        span.blog-item-img-label{
          border-radius: 20px;
        }
      }
    }
    .blog-img-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 12px;
          min-height: 22px;
        }
      }
      .blog-item-title p{
        font-size: 15px;
      }
      .blog-item-describe p{
        font-size: 12px;
        line-height: 15px;
        max-height: 30px;
      }
    }
  }
  @media (max-width: 800px) {
    .blog-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 11px;
          padding-top: 1px;
        }
      }
      .blog-item-title p{
        font-size: 15.5px;
      }
      .blog-item-describe p{
        font-size: 12.5px;
        line-height: 15px;
        max-height: 30px;
      }
    }
    .blog-img-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 9px;
          min-height: 18px;
        }
      }
      .blog-item-title p{
        font-size: 12px;
      }
      .blog-item-describe p{
        font-size: 10px;
        line-height: 12px;
        max-height: 24px;
      }
    }
  }
  @media (max-width: 600px) {
    .blog-item{
      margin-top: 15px;
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 8px;
          padding: 0 15px;
          padding-top: 1px;
        }
      }
      .blog-item-title p{
        font-size: 13px;
      }
      .blog-item-describe p{
        font-size: 11px;
        line-height: 13px;
        max-height: 26px;
      }
    }
    .blog-img-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 6px;
          padding: 0 8px;
          padding-top: 1px;
          min-height: 15px;
        }
      }
      .blog-item-title p{
        font-size: 10px;
      }
      .blog-item-describe p{
        font-size: 9px;
        line-height: 11px;
        max-height: 23px;
      }
    }
  }
</style>


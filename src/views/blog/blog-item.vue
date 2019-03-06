<template>
  <div class="blog-item">
    <div class="blog-item-img"><slot name="item-img"></slot><span class="blog-item-img-label" v-if="label">{{label}}</span></div>
    <div class="blog-item-title"><slot name="item-title"></slot></div>
    <div class="blog-item-describe"><slot name="item-describe"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      label: String
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
        min-height: 22px;
      }
    }
    .blog-item-title{
      line-height: 1.2;
      font-size: 1.93vw;
      margin-top: 2vw;
      margin-bottom: 1vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
    .blog-item-describe{
      font-size: 1.56vw;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
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
    .blog-item-title{
      padding-right: 0.5vw;
      font-size: 1.3vw;
    }
    .blog-item-describe{
      padding-right: 0.5vw;
      font-size: 1vw;
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
      .blog-item-title{
        font-size: 15px;
      }
      .blog-item-describe{
        font-size: 12px;
      }
    }
  }
  @media (max-width: 800px) {
    .blog-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 11px;
        }
      }
      .blog-item-title{
        font-size: 15.5px;
      }
      .blog-item-describe{
        font-size: 12.5px;
      }
    }
    .blog-img-item{
      .blog-item-img{
        span.blog-item-img-label{
          font-size: 9px;
          min-height: 18px;
        }
      }
      .blog-item-title{
        font-size: 12px;
      }
      .blog-item-describe{
        font-size: 10px;
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
        }
      }
      .blog-item-title{
        font-size: 13px;
      }
      .blog-item-describe{
        font-size: 10px;
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
      .blog-item-title{
        font-size: 10px;
      }
      .blog-item-describe{
        font-size: 8px;
      }
    }
  }
</style>


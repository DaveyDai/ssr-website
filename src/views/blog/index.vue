<template>
  <div class="blog-index">
    <vava-swiper class="blog-index-banner" :swiper-data="bannerImg"></vava-swiper>
    <blog-tabs @click="handleClick" :label-data="blogTabs"></blog-tabs>
    <div class="blog-index-content">
      <h5 class="blog-content-title">COMPUTER AND GAMING</h5>
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
      <div class="blog-index-content-li">
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO 018</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO LOOK</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO LOOK OUT FOR</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
      </div>
      <h5 class="blog-content-title">COMPUTER AND GAMING</h5>
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
      <div class="blog-index-content-li">
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO 018</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO LOOK</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
        <blog-item class="blog-img-item" label="New">
          <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
          <template slot="item-title">PC GAMES TO LOOK OUT FOR</template>
          <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
        </blog-item>
      </div>
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
    </div>
    <vava-subscribe class="blog-index-subscribe"></vava-subscribe>
  </div>
</template>

<script>
  import BlogItem from './blog-item.vue'
  import VavaSwiper from '@/components/img-swiper.vue'
  import BlogTabs from './blog-label-tabs.vue'
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('blog首页')
      // return store.dispatch('requestPost', 'signIn', { test: '我是测试33', time: 100 })
    },
    components: { BlogItem, VavaSwiper, BlogTabs },
    data () {
      return {
        bannerImg: ['/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg'],
        blogTabs: [{dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}]
      }
    },
    methods: {
      handleClick (item) {
        console.log(item)
        this.$router.push('/blog/' + item.dicName)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-index{
    width: 100%;
    .blog-index-banner{
      width: 100%;
      font-size: 0;
      img{width: 100%;}
      .swiper-pagination-bullet{background: @un-font-color;opacity: 1;}
      .swiper-pagination-bullet-active{background: #FFF;}
      .swiper-button-prev, .swiper-button-next{display: none;}
    }
    .blog-index-content{
      width: 100%;
      padding: 0 4.16vw;
      .blog-content-title{
        text-align: center;
        font-size: 2.6vw;
        color: #4B4B4B;
        margin-top: 3.125vw;
        font-family: 'avenir-next-demi';
      }
      .blog-index-content-li{
        display: flex;
        .blog-img-item{
          margin-right: 1vw;
          margin-left: 1vw;
          &:first-child{ margin-left: 0; }
          &:last-child{ margin-right: 0; }
        }
      }
    }
    .blog-index-subscribe{
      margin-top: 6.25vw;
    }
  }
  @media (max-width:800px) {
    .blog-index{
      .blog-index-content{
        .blog-content-title{
          margin-top: 25px;
        }
      }
    }
  }
  @media (max-width:600px) {
    .blog-index{
      .blog-index-content{
        .blog-content-title{
          font-size: 15px;
        }
      }
    }
  }
</style>


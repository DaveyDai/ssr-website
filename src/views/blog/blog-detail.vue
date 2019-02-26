<template>
  <div class="blog-detail">
    <img class="blog-detail-banner" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
    <blog-tabs @click="handleClick" :label-data="blogTabs"></blog-tabs>
    <div class="blog-detail-content">
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
      <blog-item class="blog-img-home" label="New">
        <img slot="item-img" src="/static/website-imgages/blog/Photo 11.jpg" alt="">
        <template slot="item-title">PC GAMES TO LOOK OUT FOR IN 2018</template>
        <template slot="item-describe">With the PC releases of 2017 officially in the rear view mirror, it’s time to look ahead to PC games in 2018 and what they bring to the table. 2018 promise to be a huge year for PC gaming as there are many different highly-anticipated releases coming.r for PC gaming as there are many different highly-anticipated releases coming</template>
      </blog-item>
    </div>
    <vava-pagination class="blog-detail-pagination" :total="total" :current-page='current' @pagechange="handleClickPage"></vava-pagination>
    <vava-subscribe class="blog-detail-subscribe"></vava-subscribe>
  </div>
</template>

<script>
  import BlogItem from './blog-item.vue'
  import BlogTabs from './blog-label-tabs.vue'
  import VavaPagination from '@/components/vava-pagination.vue'
  export default {
    asyncData ({ store, route }) { // 服务端渲染页面会等待次钩子执行完成
      console.log('blog详情:', route)
      // return store.dispatch('requestPost', 'signIn', { test: '我是测试33', time: 100 })
    },
    components: { BlogItem, BlogTabs, VavaPagination },
    data () {
      return {
        bannerImg: ['/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg', '/static/website-imgages/blog/Promotion Banner1.jpg'],
        blogTabs: [{dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}, {dicName: 'VAVA FEATURES', active: false}],
        current: 1,
        total: 150 // 记录总条数
      }
    },
    methods: {
      handleClick (item) {
        console.log(item)
      },
      handleClickPage (page) {
        console.log(page)
      }
    }
  }
</script>

<style lang="less" scoped>
  .blog-detail{
    width: 100%;
    .blog-detail-banner{
      width: 100%;
    }
    .blog-detail-content{
      width: 100%;
      padding: 0 4.16vw;
    }
    .blog-detail-subscribe{
      margin-top: 6.25vw;
    }
    .blog-detail-pagination{
      margin-top: 8vw;
    }
  }
</style>


<template>
  <div class="about-us">
    <div style="text-align:center;position:relative;">
      <img src="/static/website-imgages/about/1_smart_made_simple.jpg" alt="">
      <div class="img-description" style="top: 7.3vw;">
        <div class="header-text">SMART MADE SIMPLE</div>
        <div class="content-text" style="padding:0.5vw 16vw">Intuitive Function, Intelligent Design, Incredible Quality</div>
      </div>
    </div>

    <div style="background: #F9F9F9;">
      <img src="/static/website-imgages/about/2_who_is_vava.jpg" style="width:50%;" alt="">
      <div class="who_is_vava_container">
        <div class="header-text">Who is VAVA</div>
        <div class="content-text who_is_vava_text">Modern lifestyles need meaningful innovation. 
            From our award winning dash cam to cutting 
            edge 4k projector, VAVA improves lives by 
            helping families to live smarter.</div>
      </div>
    </div>
    
    <div>
      <img src="/static/website-imgages/about/3.jpg" alt="" style="height:50vw;">
    </div>
    
    <div style="text-align:center;padding-top:4.2vw;">
      <div class="header-text">VAVA Was Born</div>
      <div class="content-text" style="padding:0.5vw 16vw 5.2vw;">Established in 2015, VAVA quickly became a pioneer in home living. Our commitment to innovation led to our first Red Dot award in 2016 and we haven’t looked back since!</div>
      <img src="/static/website-imgages/about/4_list_1.jpg" style="width:20vw;" alt="">
      <img src="/static/website-imgages/about/4_list_2.jpg" style="width:20vw;" alt="">
      <img src="/static/website-imgages/about/4_list_3.jpg" style="width:20vw;" alt="">
    </div>

    <div style="text-align:center;position:relative;color:#fff;">
      <img src="/static/website-imgages/about/5.jpg">
      <div class="img-description" style="top: 11.4vw;">
        <div class="header-text">VAVA Today</div>
        <div class="content-text" style="padding:0.5vw 16vw 5.2vw;">Today, VAVA is continuously evolving and expanding our product lines to meet the needs of our customers. In striving to help people live smarter, VAVA only has one goal: to make life simple.</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .about-us{
    min-height: 70%;
    color:#333;
    font-size: 0;
    img{
      width: 100%;
    }
    div + div {
      margin-top: 1vw;
    }
    .who_is_vava_container {
      float:right;width:50%;padding-left:4.2vw;padding-top:10.5vw;
    }
    .who_is_vava_text {
      width:27vw;
      margin-top:10px;
    }
    .content-text {
      font-family: 'avenir-next-regular';
      line-height:1.7vw;
      font-size:1.25vw;
    }
    .header-text {
      font-family: 'avenir-next-demi';
      font-size:2.08vw;
    }
    .img-description {
      position: absolute;
      left: 0;
      right: 0;
    }

    @media (max-width: 800px) {
      .who_is_vava_container {
        padding-top:6.5vw;
      }
      .content-text {
        line-height: 3vw;
      }
      .who_is_vava_text {
        width: 40vw;
      }
    }
  }
</style>

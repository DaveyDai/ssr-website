<template>
  <div class="shopping-step">
    <li :class="{'actived': active > 1, 'active': active === 1, 'disable': active < 1}"><span class="step-status"></span><span class="step-name">Item at cart</span></li>
    <li :class="{'actived': active > 2, 'active': active === 2, 'disable': active < 2}"><span class="step-status"></span><span class="step-name">Shipping & Payment</span></li>
    <li :class="{'actived': active === 3, 'disable': active < 3, 'actived-failure': active === 4}"><span class="step-status"></span><span class="step-name">Confirmation</span></li>
  </div>
</template>
<script>
  export default {
    props: {
      active: Number // 1 选择商品阶段 2 下单阶段 3 支付成功 4 支付失败
    }
  }
</script>
<style lang="less" scoped>
  .shopping-step{
    width: 100%;
    height: 7.8125vw;
    min-height: 80px;
    padding: 0 19vw;
    display: flex;
    align-items: center;
    li{
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before{
        content: "";
        position: absolute;
        left: 0;
        display: inline-block;
        width: 50%;
        height: 1px;
        background-color: #E0E0E0;
      }
      &::after{
        content: "";
        position: absolute;
        right: 0;
        display: inline-block;
        width: 50%;
        height: 1px;
        background-color: #E0E0E0;
      }
      &:nth-child(1)::before{
        width: 100%;
        left: -50%;
      }
      &:nth-child(3)::after{
        width: 100%;
        right: -50%;
      }
      .step-status{
        position: relative;
        z-index: 199;
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: #E0E0E0;
      }
      .step-name{
        position: absolute;
        top: 25px;
        font-family: AvenirNext-Medium;
        font-size: 14px;
        color: #999;
      }
    }
    li.actived{
      &::before, &::after{
        background-color: @active-color;
      }
      .step-status{
        background-color: @active-color;
      }
      .step-name{
        color: @active-color;
      }
    }
    li.active{
      &::before, &::after{
        background-color: @active-color;
      }
      .step-status{
        width: 20px;
        height: 20px;
        border: 4px solid #C8B9FF;
        background-color: @active-color;
      }
      .step-name{
        color: @active-color;
      }
    }
    li.actived-failure{
      &::before{
        background-color: @active-color;
      }
      &::after{
        background-color: #E0E0E0;
      }
      .step-status{
        width: 20px;
        height: 20px;
        border: 4px solid #FFE2BE;
        background-color: #FF9B1F;
      }
      .step-name{
        color: #666;
      }
    }
  }
</style>


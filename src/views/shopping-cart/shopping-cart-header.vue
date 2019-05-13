<template>
  <div class="shopping-cart-header">
    <li>
      <img src="@/assets/images/shopping/free.png" class="box-img" >
      <div class="shopping-header-message"><p>Free shipping</p><span>for any order</span></div>
    </li>
    <li>
      <img src="@/assets/images/shopping/free2.png" class="box-img" >
      <div class="shopping-header-message"><p>180-Day Free Return</p><span>effortless self-service return</span></div>
    </li>
    <li>
      <img src="@/assets/images/shopping/free3.png" class="box-img" >
      <div class="shopping-header-message"><p>100% secure payments</p><span>with reliable refund policy</span></div>
    </li>
  </div>
</template>
<style lang="less" scoped>
  .shopping-cart-header{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2.6vw 0;
    background-color: #FFF;
    li{
      display: flex;
      align-items: center;
      width: 20vw;
      min-width: 230px;
      img{
        height: 2.5vw;
        min-height: 25px;
        margin-right: 0.83vw;
      }
      .shopping-header-message{
        font-size: 0.83vw;
        font-family: Helvetica;
        color: #333333;
        line-height: 1.2;
        padding-top: 0.5vw;
        span{
          color: #999;
        }
      }
    }
  }
  @media (max-width: 1450px) {
    .shopping-cart-header{
      li{
        img{
          height: 36px;
          margin-right: 12px;
        }
        .shopping-header-message{
          font-size: 12px;
          padding-top: 0.5vw;
        }
      }
    }
  }
  @media (max-width: 800px) {
    .shopping-cart-header{
      padding: 2.6vw 8vw;
      justify-content: space-around;
      li{
        width: 33%;
        min-width: 165px;
        justify-content: center;
        img{
          height: 30px;
          margin-right: 8px;
        }
        .shopping-header-message{
          font-size: 11px;
          span{display: none;}
        }
      }
    }
  }
  @media (max-width: 600px) {
    .shopping-cart-header{
      li{
        width: 30%;
        min-width: 103px;
        img{
          height: 28px;
        }
      }
    }
  }
  @media (max-width: 500px) {
    .shopping-cart-header{
      li{
        img{
          height: 25px;
        }
      }
    }
  }
</style>


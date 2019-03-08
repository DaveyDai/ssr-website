<template>
  <div class="warranty-success">
    <div class="warranty-product">
      <h5>YOUR WARRANTY COVERAGE</h5>
      <div class="warranty-product-detail">
        <div class="warranty-product-img"><img :src="orderDetails.productImage" alt=""><span>{{orderDetails.productQuantity}}</span></div>
        <div class="warranty-p-order">
          <p>{{orderDetails.productTitle}}</p>
          <div class="warranty-p-order-price"><span>price:&nbsp;&nbsp;<em>{{orderDetails.amountCur}} {{orderDetails.productPrice}}</em></span></div>
          <!-- <div class="warranty-p-order-color">Color: Black</div> -->
        </div>
      </div>
    </div>
    <div class="warranty-success-explain">
      <li>
        <div class="icon icon-selected"></div>
        <p>VALID PURCHASE DATE</p>
        <p class="warranty-success-status">{{orderDetails.expirationTime?orderDetails.expirationTime.replace(/\//g, ' / '):''}}</p>
        <p class="warranty-success-date">Warranty Coverage:<em>{{orderDetails.warrantyTime}} Months</em></p>
      </li>
      <li>
        <div class="icon icon-selected"></div>
        <p>TELEPHONE TECHNICAL SUPPORT</p>
        <p class="warranty-success-status">Active</p>
      </li>
      <li>
        <div class="icon icon-selected"></div>
        <p>REPAIRS AND SERVICE COVERAGE</p>
        <p class="warranty-success-status">Active</p>
      </li>
    </div>
    <img class="warranty-success-footer" src="/static/website-imgages/support/Buy More.jpg">
  </div>
</template>

<script>
  export default {
    props: {
      orderDetails: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .warranty-success{
    width: 100%;
    .warranty-product{
      padding: 6.25vw 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      h5{
        font-size: 2.7vw;
        color: @base-font-color;
        text-align: center;
        margin-bottom: 2.08vw;
      }
      .warranty-product-detail{
        padding: 2.6vw 2.08vw;
        background-color: #FAFAFA;
        display: flex;
        .warranty-product-img{
          width: 9.375vw;
          min-width: 100px;
          margin-right: 1.6vw;
          position: relative;
          img{
            width: 100%;
          }
          span{
            position: absolute;
            top: 0;
            right: 0;
            width: 1.46vw;
            height: 1.46vw;
            min-width: 20px;
            min-height: 20px;
            background-color: @base-button-back;
            border-radius: 50%;
            line-height: 1.6vw;
            font-size: 0.78vw;
            color: #FFF;
            display: inline-block;
            text-align: center;
            transform: translate3d(50%, -50%, 0);
          }
        }
        .warranty-p-order{
          font-size: 0.73vw;
          color: @base-font-color;
          p{
            font-size: 1vw;
            font-family: 'avenir-next-demi';
            max-width: 500px;
            line-height: 1.4;
          }
          .warranty-p-order-price{
            display: flex;
            justify-content: space-between;
            margin: 1vw 0;
            span{margin-right: 4.8vw;}
            em{font-size: 1vw;}
          }
        }
      }
    }
    .warranty-success-explain{
      width: 100%;
      font-size: 1.56vw;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-around;
      padding: 0 2vw;
      li{
        width: 17.9vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 1.5;
        margin-bottom: 6vw;
        p{text-align: center;color: @font-back-color;}
        div.icon{
          width: 4.17vw;
          height: 4.17vw;
          min-width: 28px;
          min-height: 28px;
          font-size: 1.56vw;
          border-radius: 50%;
          color: @base-button-back;
          margin-bottom: 1vw;
          border: 0.104vw solid @base-button-back;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .warranty-success-status{
          color: @base-button-back;
          text-align: center;
        }
        .warranty-success-date{
          white-space: nowrap;
        }
      }
    }
    .warranty-success-footer{
      width: 100%;
    }
  }
  @media (max-width: 1370px) {
    .warranty-success{
      .warranty-product{
        .warranty-product-detail{
          .warranty-product-img{
            span{
              line-height: 20px;
              font-size: 12px;
            }
          }
          .warranty-p-order{
            font-size: 13px;
            p{font-size: 15px;}
            .warranty-p-order-price em{font-size: 14px;}
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .warranty-success{
      .warranty-product{
        .warranty-product-detail{
          .warranty-product-img{margin-right: 18px;}
          .warranty-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .warranty-p-order-price em{font-size: 13px;}
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .warranty-success{
      .warranty-product{
        h5{
          font-size: 21.6px;
          margin-bottom: 20px;
        }
        .warranty-product-detail{
          .warranty-product-img{margin-right: 18px;}
          .warranty-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .warranty-p-order-price{
              margin: 10px 0;
              flex-direction: column;
              em{font-size: 13px;margin-top: 10px;}
            }
          }
        }
      }
      .warranty-success-explain{
        font-size: 12.5px;
        li{
          width: 25vw;
          div.icon{
            font-size: 12.5px;
            border: 1px solid @base-button-back;
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .warranty-success{
      .warranty-product{
        h5{
          font-size: 18px;
        }
        .warranty-product-detail{
          padding: 20px 15px;
          margin: 0 2vw;
          .warranty-product-img{margin-right: 18px;}
          .warranty-p-order{
            font-size: 12px;
            p{font-size: 14px;}
            .warranty-p-order-price em{font-size: 13px;}
          }
        }
      }
      .warranty-success-explain{
        font-size: 12.5px;
        li{
          width: 30vw;
          padding: 1vw;
          div.icon{
            font-size: 10px;
          }
          .warranty-success-date em{
            display: block;
          }
        }
      }
    }
  }
</style>

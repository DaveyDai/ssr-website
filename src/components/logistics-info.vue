<template>
  <div class="logistics_info">
    <div class="logistics_cont">
      <i class="close" @click="close">X</i>
      <h5>Shipment Information</h5>
      <ul class="logistics_top">
        <li>
          <u>currentStatus:</u>
          <b style="color: #5D45B4; font-weight: 600;">{{logisticsData.currentStatus}}</b>
        </li>
        <li>
          <u>Tracking NO:</u>
          <b>{{logisticsData.trackingNumber}}</b>
        </li>
        <li>
          <u>Carrier:</u>
          <b>{{logisticsData.carrierCode}}</b>
        </li>
        <li>
          <u>ShipDate:</u>
          <b>{{logisticsData.shipDate}}</b>
        </li>
      </ul>
      <div class="logistics_hr">
        <hr class="get_hr">
        <ul class="logistics_bottom">
          <li :class="i == 0 ? 'is_bottom' : ''" 
          v-for="(v,i) in logisticsData.trackingEvents" :key="i">
            <div class="get_top">
              <i>{{i + 1}}</i>
            </div>
            <span>
              {{v.eventDate}}
              <u></u>
              [{{v.city}} , {{v.state}} , {{v.country}}] {{v.eventDesc}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  mounted() {
   
  },
  watch: {
    logisticsData() {
      let hr = document.querySelector('.get_hr'),
          getTop = document.querySelector('.get_top')
      if (getTop)  hr.style.cssText += 'top: ' + getTop.offsetTop + "px;"
    },
    deep: true
  },
  props: {
    logisticsData: {
      default: {}
    }
  },
  methods: {
    close() {
      this.$emit('closeLogist')
    }
  }
};
</script>

<style lang="less" scoped>
.logistics_info {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0;
  z-index: 999999;
  background: rgba(0,0,0,0.20);
  .logistics_cont::-webkit-scrollbar {
    display: none;
  }
  .logistics_cont {
    width: 36vw;
    max-height: 90%;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    overflow: hidden;
    overflow-y: scroll;
    .close {
      font-size: 1.8vw;
      position: absolute;
      top: 1.8vw;
      right: 1.8vw;
      color: #999;
      font-style: normal;
      cursor: pointer;
    }
    h5 {
      margin-top: 4vw;
      text-align: center;
      color: #666;
      font-size: 2.5vw;
      font-weight: 400;
    }
    .logistics_top {
      font-size: 1vw;
      padding: 1.5vw 0 0.9vw;
      margin: 0 2vw;
      border-bottom: 1px solid #eee;
      li {
        padding: 0.36vw 0;
      }
      u {
        display: inline-block;
        color: #666;
        width: 6.4vw;
        text-align: right;
        margin-right: 1.1vw;
      }
      b {
        color: #333;
        font-weight: normal;
      }
    }
    .logistics_hr {
      margin: 0.8vw 6vw 1.6vw;
      position: relative;
      height: fit-content;
      overflow: hidden;
      hr {
        position: absolute;
        height: 100%;
        width: 1px;
        background: #eee;
        top: 0.8vw;
        left: 0.8vw;
        z-index: 11;
      }
    }
    .logistics_bottom {
      position: relative;
      z-index: 22;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 1.8vw;
        i {
          display: block;
          width: 1.6vw;
          height: 1.6vw;
          line-height: 1.6vw;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #eee;
          background: #fafafa;
          font-size: 1.1vw;
          color: #999;
          margin-right: 1.5vw;
        }
        span {
          font-size: 1.1vw;
          color: #999;
          u {
            height: 0.2vw;
            display: block;
          }
        }

      }
      .is_bottom {
        i {
          background: #5D45B4;
          color: #fff;
          border: none;
        }
        span {
          color: #333;
        }
      }
    }
  }
}
  @media (max-width: 1200px) {
    .logistics_info {
      .logistics_cont {
        width: 400px;
        .close {
          font-size: 21px;
          top: 10px;
          right: 10px;
        }
        h5 {
          font-size: 30px;
        }
        .logistics_top {
          font-size: 12px;
          li {
            padding: 5px 0;
            display: flex;
          }
          u {
            margin-right: 8px;
            width: 80px;
          }
        }
        .logistics_bottom {
           li {
             margin-bottom: 20px;
             i {
               width: 20px;
               height: 20px;
               line-height: 20px;
               font-size: 13px;
             }
             span {
               font-size: 13px;
               u {
                 height: 3px;
               }
             }
           }
        }
        .logistics_hr {
          margin: 10px 60px 20px;
          hr {
            left: 10px;
          }
        } 
      }
    }
  }
  @md: 1/7.5vw;
  @media (max-width: 600px) {
    .logistics_info {
      .logistics_cont {
        width: 300px;
        .close {
          font-size: 16px;
        }
        h5 {
          font-size: 23px;
          margin-top: 20px;
        }
        .logistics_top {
          padding: 10px 0; 
        }
        .logistics_hr {
          margin: 10px 20px 20px;
          div {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: transparent;
            margin-right: 6px;
            i {
              width: 12px;
              height:12px;
              line-height: 12px;
              font-size: 12px;
              color: transparent;
              background: #c2c2c2;
              border: none;
              margin-top: 3px;
              margin-left: 3px;
            }
          }
          hr {
            left: 9px;
          }
        }
        .logistics_bottom li {
          align-items: flex-start;
        }
        .logistics_bottom .is_bottom {
          > div {
            background: #fff;
            border: 1px solid #5D45B4;
            i {
              background: #5D45B4;
              color: #5D45B4;
             
            }
          }
          span {
            color: #333;
          }
        }
      }
    }
  }
</style>


<template>
  <div>
    <div class="order_comp">
      <h6>
        My Orders
        <u v-if="type == 'd'">> Order Details</u>
      </h6>
      <div
        v-if="type == 'l' ? orderList && orderList.length : orderDetails&&orderDetails.length"
        @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch"
      >
        <div
          v-for="(v,i) in type == 'l' ? orderList : orderDetails"
          :key="i"
          :class="['order_list_records',type == 'l' && i ==  orderList.length - 1 ? 'order_list_last' : '']"
        >
          <div :class="['order_comp_header', type == 'd' ? 'order_comp_detail' : '']">
            <div class="order_comp_title">
              <span>
                Oeder Status:
                <u>{{v.orderDetailVo.orderStatus | orderStatus}}</u>
              </span>
              <span>
                Oedered On:
                <u>{{v.orderDetailVo.orderTime.substring(0,16)}}</u>
              </span>
              <span>
                Order Number:
                <u>{{v.orderDetailVo.orderNo}}</u>
              </span>
            </div>
            <div v-if="type == 'l'" class="check_view">
              <span
                class="view"
                style="cursor: pointer"
                @click="view(v.orderDetailVo.orderNo)"
              >View Details</span>
              <span
                v-if="v.orderDetailVo.orderStatus == 2 
                || v.orderDetailVo.orderStatus ==3 
                || v.orderDetailVo.orderStatus == 5
                || v.orderDetailVo.orderStatus == 6
                || v.orderDetailVo.orderStatus == 9
                || v.orderDetailVo.orderStatus == 8"
                class="check"
                style="cursor: pointer"
                @click="check(v.orderDetailVo.orderNo)"
              >Check Shipment</span>
            </div>
          </div>
          <div class="order_address" v-if="type == 'd'">
            <p>Billing address:</p>
            <p>{{v.orderAddressBo.firstName}} {{v.orderAddressBo.lastName}}</p>
            <p>{{v.orderAddressBo.notificationEmail}}</p>
            <p>{{v.orderAddressBo.address1 ? v.orderAddressBo.address1 : v.orderAddressBo.address2}}</p>
            <p>{{v.orderAddressBo.city}} , {{v.orderAddressBo.regionName}}</p>
            <p>{{v.orderAddressBo.countryName}}</p>
            <p>Phone: {{v.orderAddressBo.telephone}}</p>
          </div>
          <ul class="order_ul">
            <li v-for="(val,index) in v.orderItemVos" :key="index">
              <img :src="val.skuImage" alt>
              <div class="order_ul_pc">
                <h6 :title="val.productName">{{val.productName}}</h6>
                <p>Model: {{val.model}}</p>
                <span>
                  <u>Color: {{val.colourCode}}</u>
                  <u>${{val.price}}</u>
                  <u>X{{val.qtyOrdered}}</u>
                  <u>${{val.totalPrice}}</u>
                </span>
              </div>
              <div class="order_ul_m">
                <div>
                  <h6>{{val.productName}}</h6>
                  <span>
                    <u>Color: {{val.colourCode}}</u>
                    <p>Model: {{val.model}}</p>
                  </span>
                </div>
                <span>
                  <u>${{val.price}}</u>
                  <u>X{{val.qtyOrdered}}</u>
                </span>
              </div>
            </li>
          </ul>
          <div class="product_cost">
            <span>
              Subtotal
              <u>${{v.orderDetailVo.subtotalPriceTotal}}</u>
            </span>
            <!-- <span>Shipping <u>${{v.orderDetailVo.subtotalPriceTotal}}</u></span>
            <span>Discount <u>${{v.orderDetailVo.subtotalPriceTotal}}</u></span>-->
            <span>
              tax
              <u>${{v.orderDetailVo.taxPriceTotal}}</u>
            </span>
            <span>
              Taxes
              <u>${{v.orderDetailVo.orderTotal}}</u>
            </span>
          </div>
          <div class="order_btn">
            <b class="order_btn1" v-if="v.orderDetailVo.orderStatus == 1" @click="payNow(v.orderDetailVo.orderNo)">PAY NOW</b>
            <b class="order_btn2" v-if="v.orderDetailVo.orderStatus == 1" @click="cancleOrder(v.orderDetailVo.orderNo,i)">CANCLE ORDER</b>
            <b class="order_btn3">{{v.orderDetailVo.orderStatus | orderStatus}}</b>
          </div>
        </div>
      </div>
    </div>
    <p class="is_loading" v-if="loadingCont && type == 'l'">{{loadingCont}}</p>
    <LogisticsInfo
      v-show="isLogistics"
      @closeLogist="isLogistics = false"
      :logisticsData="logisticsData"
    />
  </div>
</template>
<script>
import LogisticsInfo from "./logistics-info.vue";

export default {
  components: { LogisticsInfo },
  data() {
    return {
      num: 2,
      isLogistics: false, // 物流信息
      type: "",
      orderList: [],
      orderDetails: [],
      logisticsData: {},
      page1: '',
      page2: '',
      listLast: '',
      pageNo: 1,
      pages: 0,
      scrollStop: false,
      loadingCont: '',
      footHeight: 0,
      isPc: true
    };
  },
  mounted() {
    let path = this.$route.path,
      api = "",
      data = {};
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) this.isPc = false

    if (path === "/account") {
      this.type = "l";
      api = "findOrderList";
      data = { pageNo: this.pageNo, pageSize: 10, condition: {orderBy: 1} };
    } else {
      this.type = "d";
      api = "getOrderDetails";
      data = {
        orderNo: this.$route.query.orderNo,
        email: this.$route.query.email
          ? this.$route.query.email
          : this.$utils.trim(window.localStorage.getItem("accountName"))
      };
    }
    this.findOrderList(this.type, api, data);
    this.footHeight = document.querySelector('.page-footer').clientHeight
  },
  filters: {
    orderStatus(val) {
      if (!val) return;
      let temp = parseInt(val),
        newVal = "";
      switch (temp) {
        case 1:
          newVal = "Awaiting Payment";
          break;
        case 2:
          newVal = "Awaiting Fulfillment";
          break;
        case 3:
          newVal = "Awaiting Confirmation";
          break;
        case 4:
          newVal = "Waiting for the evaluation";
          break;
        case 5:
          newVal = "Completed";
          break;
        case 6:
          newVal = "Completed";
          break;
        case 7:
          newVal = "Closed";
          break;
        case 8:
          newVal = "Application for refund";
          break;
        case 9:
          newVal = "Apply for replacement examination";
          break;
        case 10:
          newVal = "Application for refund Completed";
          break;
        case 11:
          newVal = "Apply for replacement examination Completed";
          break;
      }
      return newVal;
    }
  },
  methods: {
    // 获取订单列表
    async findOrderList(type, api, data) {
      await this.$store
        .dispatch("postFetch", { api: api, data: data })
        .then(data => {
          if (type == "l") {
            this.orderList.push(...data.records);
            this.pages = data.pages
            if (this.pageNo == this.pages) {
              this.loadingCont = '全部加载完成'
            } else {
              this.loadingCont = ''
            }
            this.$nextTick(() => {
              this.scrollStop = false
              this.listLast = document.querySelector('.order_list_last').offsetTop
              window.addEventListener('scroll',this.pcScroll)
            })
          } else {
            this.orderDetails.push(data);
          }
        })
        .catch(error => {
          this.loadingCont = ''
          this.$utils.showErrorMes(this, error);
        });
    },

    check(orderNo) {
      let dataObj = {
        orderNo: orderNo,
        email: this.$utils.trim(window.localStorage.getItem("accountName"))
      };
      this.$store
        .dispatch("postFetch", { api: "selectLogistics", data: dataObj })
        .then(data => {
          this.isLogistics = true;
          this.logisticsData = data;
        })
        .catch(error => {
          this.$utils.showErrorMes(this, error);
        });
    },

    view(orderNo) {
      this.$router.push({ path: "/view-details", query: { orderNo: orderNo } });
    },

    startTouch(e) {
      let eve = e || window.event
      this.page1 = eve.targetTouches[0].pageY;
    },
    moveTouch(e) {
      let eve = e || window.event
      this.page2 = eve.targetTouches[0].pageY
    },
    endTouch(e) {
      if (this.type == 'd' || this.pages == this.pageNo || this.scrollStop) return
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.page1 - this.page2 > 0 && scrollTop + 100 > this.listLast ) {
        this.pageNo++
        this.scrollStop = true
        this.loadingCont = '加载中...'
        this.findOrderList('l',"findOrderList",{ pageNo: this.pageNo, pageSize: 10, condition: {orderBy: 1} })
      }
    },
    pcScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (this.type == 'd' || this.pages <= this.pageNo || this.scrollStop || !this.isPc) return

      if (scrollTop + this.footHeight > this.listLast ) {
        this.pageNo++
        this.scrollStop = true
        this.loadingCont = '加载中...'
        this.findOrderList('l',"findOrderList",{ pageNo: this.pageNo, pageSize: 10, condition: {orderBy: 1} })
      }
    },
    payNow(orderNo) {
      let rout = ''
      rout = this.isPc ? '/pay' : '/pay-m'
      this.$router.push({path: rout, query: {orderNo: orderNo, email: localStorage.getItem('accountName')}})
    },
    cancleOrder(orderNo,index) {
      this.$store
      .dispatch("postByUrl", { api: "cancelOrder", data: orderNo})
      .then(data => {
        if (this.type == 'd') {
          this.orderDetails[index].orderDetailVo.orderStatus = 7
        } else {
          this.orderList[index].orderDetailVo.orderStatus = 7
        }
      })
      .catch(error => {
        this.$utils.showErrorMes(this, error);
      });
    }
  }
};
</script>
<style lang="less" scoped>
u {
  text-decoration: none;
}
.order_comp {
  width: 100%;
  background: #fff;
  margin-bottom: 1.2vw;
  > h6 {
    border-bottom: 1.2vw solid #fafafa;
    padding-left: 1.3vw;
    height: 5.6vw;
    line-height: 4.6vw;
    box-sizing: border-box;
    font-size: 1.3vw;
    background: #fff;
    text-align: left;
    color: #333;
    font-weight: 500;
    u {
      font-size: 1vw;
      color: #666;
    }
  }
  .order_list_records {
    overflow: hidden;
    border-bottom: 1.2vw solid #fafafa;
    padding-bottom: 20px;
  }
  .order_comp_header {
    padding: 0 1.3vw;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
    > div {
      margin-top: 1vw;
      > span {
        height: 1.6vw;
        line-height: 1.6vw;
        margin-bottom: 1vw;
        color: #666;
        font-size: 1vw;
        u {
          display: inline-block;
          margin-left: 0.5vw;
          color: #333;
        }
      }
      .check,
      .view {
        color: #5d45b4;
      }
    }
    > div:first-of-type {
      display: flex;
      flex-wrap: wrap;
      span {
        margin-right: 3vw;
      }
      > span:first-of-type {
        color: #5d45b4;
        font-weight: 600;
        u {
          color: #5d45b4;
          font-weight: 600;
        }
      }
    }
    > div:last-of-type {
      margin-left: 2vw;
      margin-top: 0.8vw;
      overflow: hidden;
      span {
        margin-left: 3vw;
        float: right;
      }
    }
  }

  .order_comp_detail > div:last-of-type span {
    margin-left: 0;
    float: none;
  }
  .order_address {
    width: 100%;
    margin: 0 3.6vw;
    padding: 1.8vw 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    font-size: 1.2vw;
    color: #666;
    p {
      margin-bottom: 0.5vw;
    }
    p:first-of-type {
      margin-bottom: 1.1vw;
    }
  }
  .order_ul {
    width: 100%;
    padding: 0 3.6vw;
    box-sizing: border-box;
    li {
      border-bottom: 1px solid #eee;
      display: flex;
      padding: 1vw 0;
      img {
        width: 9vw;
        height: 9vw;
        margin-right: 1.3vw;
      }
      .order_ul_pc {
        display: block;
      }
      .order_ul_m {
        display: none;
      }
      h6 {
        width: 80%;
        font-size: 1.5vw;
        margin-bottom: 1vw;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }
      div {
        flex: 1;
        margin-top: 0.5vw;
        font-size: 1.1vw;
        color: #333;
        p {
          text-align: left;
          margin: 0.53vw 0 0.5vw;
          font-size: 1vw;
          color: #666;
        }
        u {
          display: inline-block;
        }
        u:first-of-type {
          font-size: 1vw;
          color: #666;
          width: 26vw;
        }
        u:nth-of-type(2) {
          width: 13vw;
        }
        u:nth-of-type(3) {
          width: 13vw;
        }
        u:nth-of-type(4) {
          width: 13vw;
        }
      }
    }
  }
  .product_cost {
    display: flex;
    font-size: 0.9vw;
    margin-top: 2.3vw;
    padding: 0 3.6vw;
    align-items: center;
    span {
      margin-right: 4.6vw;
      font-size: 0.9vw;
      color: #666;
      u {
        color: #333;
        margin-right: 0.3vw;
      }
    }
    span:last-of-type {
      margin-left: auto;
      margin-right: 0;
      u {
        font-size: 1.4vw;
        position: relative;
        top: 0.15vw;
        font-weight: 600;
      }
    }
  }
  .order_btn {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    > b {
      display: inline-block;
      height: 3.5vw;
      line-height: 1.8vw;
      padding: 1vw 2vw;
      margin: 1.6vw 3.6vw 0 0;
      border-radius: 1.75vw;
      font-size: 1.1vw;
      font-weight: 400;
      box-sizing: border-box;
      cursor: pointer;
    }
    .order_btn1 {
      background: #6143bb;
      color: #fff;
    }
    .order_btn2 {
      color: #6143bb;
      border: 1px solid #6143bb;
      background: #fff;
    }
    .order_btn3 {
      background: #ddd;
      color: #333;
    }
  }
}
.is_loading {
  margin-bottom: 10px;
}
@dw: 1/7.5vw;
@media (max-width: 800px) {
  .order_comp {
    margin-bottom: @dw*20;
    > h6 {
      height: @dw*88;
      font-size: @dw*32;
      line-height: @dw*76;
      border-bottom: @dw*20 solid #fafafa;
      padding-left: @dw*26;
      u {
        font-size: @dw*24;
      }
    }
    .order_comp_header {
      margin: @dw*20 @dw*26 0;
      padding: 0;
      padding-bottom: @dw*20;
      height: auto;
      display: block;
      overflow: hidden;
      > div {
        > span {
          margin-bottom: @dw*20;
          height: auto;
          line-height: @dw*28;
          font-size: @dw*22;
        }
        span:last-of-type {
          margin-right: 0;
        }
      }
      > div:first-of-type {
        display: block;
        span {
          display: block;
          u {
            margin-left: 0;
          }
        }
      }
      > .check_view {
        margin-left: 0 !important;
        span {
          float: none !important;
          display: inline-block;
          font-size: @dw*20;
          height: @dw*46;
          line-height: @dw*46;
          border-radius: @dw*23;
          border: 1px solid #5d45b4;
          padding: 0 @dw*15;
          margin-left: 0 !important;
          margin-right: 3vw;
        }
        .check {
          margin-right: @dw*10;
        }
      }
    }
    .order_comp_detail > div:last-of-type {
      margin-left: 0;
    }
    .order_comp_detail > div:last-of-type span {
      margin-bottom: 3px;
    }
    .order_comp_detail {
      border: none;
      padding: 0;
      padding-bottom: 0;
    }
    .order_address {
      width: auto;
      margin: 0 @dw*26 0;
      padding: 0;
      padding-bottom: @dw*20;
      p {
        height: @dw*34;
        line-height: @dw*34;
        font-size: @dw*24;
        margin-bottom: 0;
      }
      p:first-of-type {
        margin-bottom: 0;
      }
    }
    .order_ul {
      width: 100%;
      // padding: 0 3.6vw;
      li {
        border-bottom: 1px solid #eee;
        display: flex;
        padding: @dw*30 0;
        img {
          width: @dw*180;
          height: @dw*180;
          margin-right: @dw*20;
        }
        .order_ul_pc {
          display: none;
        }
        .order_ul_m {
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          > div {
            max-width: 36vw;
            flex: 1;
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-top: 0;
            h6 {
              max-width: 36vw;
              width: 100%;
              margin-right: @dw*26;
              font-size: @dw*25;
              line-height: @dw*28;
              color: #333;
              word-wrap: break-word;
              margin-bottom: 10px;
              -webkit-line-clamp: 3;
              line-clamp: 3;
            }
            span {
              display: block;
              margin-top: 2px;
              u,
              p {
                display: block;
                margin-right: 0;
                font-size: @dw*18;
                color: #666;
                margin-top: @dw*6;
              }
            }
          }
          > span {
            display: block;
            width: fit-content;
            u {
              display: block;
              color: #686868;
              font-size: @dw*22;
              margin-right: 0;
              text-align: right;
              margin-bottom: @dw*6;
              color: #333;
              width: auto;
            }
            u:nth-of-type(2) {
              font-size: @dw*18;
              color: #666;
            }
          }
        }
      }
    }
    .product_cost {
      font-size: @dw*22;
      margin: @dw*50 @dw*26 0;
      padding: 0 @dw*10;
      display: block;
      span {
        display: block;
        margin-right: 0;
        font-size: @dw*24;
        padding: @dw*10 0;
        overflow: hidden;
        u {
          float: right;
          margin-right: 0;
        }
      }
      span:last-of-type {
        margin-left: auto;
        u {
          font-size: @dw*28;
        }
      }
    }
    .order_btn {
      > b {
        height: @dw*60;
        line-height: @dw*60;
        padding: 0 @dw*28;
        margin: @dw*12 @dw*20 0 0;
        border-radius: @dw*30;
        font-size: @dw*24;
      }
    }
  }
}
</style>


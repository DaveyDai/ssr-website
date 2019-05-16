<template>
  <div>
      <!-- 是否登录界面 -->
    <div class="payment-result"  v-loading="loading">
      <div class="slide-top center-main">
        <!-- 头部 -->
        <div class="item">
          <div class="point">
          </div>
          <p>Items in your cart</p>
        </div>
        <div class="item">
          <div class="point">
          </div>
          <p>Shipping & Payment</p>
        </div>
        <!-- 成功 -->
        <div class="item" v-if="orderStatus" v-show="!loading">
          <div class="point">
          </div>
          <p>Payment Successful</p>
        </div>
        <!-- 失败 -->
        <div class="item after-item" v-if="!orderStatus" v-show="!loading">
          <div class="warn-point">
            <i class="el-icon-close"></i>
          </div>
          <p>Payment Failure</p>
        </div>
      </div>
      <!-- 正文提示 -->
      <div class="box-main center-main">
        <div v-if="orderStatus" v-show="!loading">
          <i class="el-icon-circle-check icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div style="margin-top: 40px;">
            <div class="btnWrap bg-gradient">
               <a href="/c/wireless-chargers.html" alt="Wireless Chargers">
                 <el-button class="btn-buy" round>Continue to Buy</el-button>
               </a>
            </div>
            <!-- 20190123 -->
            <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
              <el-button class="bg-gradient" round style="margin-left: 20px;width: 180px;">Order Details</el-button>
            </a>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-if="!orderStatus" v-show="!loading">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <div style="margin-top: 40px;">
            <div class="btnWrap bg-gradient">
              <!-- 20190123 -->
              <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
               <el-button class="btn-buy" round>Order Details</el-button>
              </a>
            </div>
            <el-button class="bg-gradient"  round style="margin-left: 20px;width: 180px;" @click="repay" >Try Again</el-button>
          </div>
          <p class="tip">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
        </div>
      </div>
      <img :src="url" style="width:1px;height: 1px;">
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'userList',
        'cartList'
      ]),
      isLogin () {
        if (this.userList && this.userList.accountId !== undefined) {
          return true;
        }
        return false
      }
    },
    // 定义变量
    data () {
      return {
        orderStatus: '', // 订单状态
        loading: false,
        payment: {
          data: {
            userAuthToken: ''
          }
        }, // 请求参数对象
        url: '',
        orderNo: '', // 订单号
        // 20190123
        userEmail: '', // 邮箱
        orderList: [] // 订单列表
      }
    },
    // 引入组件
    props: {},
    mounted: async function () {
      // 初始化方法
      await this.$store.dispatch('fetchIsLogin');
      let pObj = window.localStorage.getItem('paymentData');
      pObj = JSON.parse(pObj);
      this.payment = pObj;
      this.orderNo = pObj.orderNo;
      // 20190123
      if (this.isLogin) {
        this.userEmail = this.userList.email;
      } else {
        this.userEmail = pObj.userEmail;
      }
      this.getSuccessPay();
      // this.getOrderStatus();
    },
    // 方法
    methods: {
      /**
       * [getSuccessPay 先支付回调]
       * @author luke 2018-12-27
       */
      getSuccessPay () {
        let query = this.$route.query;
        let obj = {
          api: 'getSuccessPay',
          data: {
            paymentId: query.paymentId,
            payerId: query.PayerID
          }
        };
        this.$store.dispatch('FETCH_ORDER_LIST', obj).then(json => {
          let data = json.payload.data;
          // // 判断状态
          let status = data.orderStatus;
          this.orderNo = data.orderNo;
          this.loading = false;
          if (status === 10 || status === 60) {
            // 支付失败
            this.orderStatus = false;
          } else {
            this.orderStatus = true;
            this.purchaseSeo(data);
            // 提交给seo代码
            window.localStorage.removeItem('paymentData');
            window.localStorage.removeItem('orderList');

            // 添加联盟代码
            this.addsharesale(data);
          }
        }).catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
      },
      /**
       * [addsharesale 添加联盟代码]
       * @author luke 2019-01-11
       */
      addsharesale (payData) {
        let url = 'https://shareasale.com/sale.cfm?amount=' + payData.orderTotal + '&tracking=' + payData.orderNo +'&transtype=sale&merchantID=81599&storeID=1';
        this.url = url;
        this.$axios.get(url);
      },
      /**
       * [purchaseSeo 请求seo 代码]
       * @author luke 2019-01-03
       * @return {[type]} [description]
       */
      purchaseSeo (payData) {
        let orderList = this.payment.data.orderItemExList;
        let actionField = {
          id: payData.orderNo,
          affiliation: 'Online Store',
          revenue: payData.orderTotal,
          tax: this.payment.tax,
          shipping: 0,  // 暂时全部包邮  物流为0
          coupon: payData.couponCode 
        }
        let products = [];
        for (let i = 0; i < orderList.length; i++) {
          let ths = orderList[i];
          products.push({
            'name': ths.shortName, // Name or ID is required.
            'id': ths.sku,
            'price': ths.price,
            'brand': 'rp',
            'variant': ths.variant,
            'quantity': ths.qtyOrdered, //真实购买数量
            'coupon': payData.couponCode
          })
        }
        // 添加seo 数据
        this.$seoFn.purchase(actionField, products);
      },
      /**
       * [palpal 支付页面]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      palpal () {
        // 提交给pp支付
        this.$store.dispatch('FETCH_POST_ALL', this.payment).then(json => {
          let data = json.payload.data
          if (data) {
            // window.open(data.approvalUrl);
            window.location.href = data.approvalUrl;
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      /**
       * [repay 重新支付]
       * @author luke 2018-12-21
       */
      repay () {
        this.palpal();
      },
      isLength (val) {
        return val && val.length > 0
      }
    }
  }
</script>
<style lang='less' scoped >
  .payment-result{
    margin-top: 60px;
    padding: 20px 0px 140px 0px;
    background: #FAFAFA;
    min-height: 500px;
    .slide-top{
      display: flex;
      margin-top: 30px;
      overflow: hidden;
      .item{
        flex: 1;
        position: relative;
        height: 100px;
        text-align: center;
        .point{
          background: #13BED3;
          border: 4px solid #ADE6EE;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin: 0 auto;
        }
        .warn-point {
          background: #F6635F;
          border: 4px solid #F89F9D;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin: 0 auto;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          color: #fff;
        }
        p {
          margin-top: 10px;
          font-family: SFCompactDisplay-Regular;
          font-size: 14px;
          color: #13BED3;
        }
        &:before {
          content: "";
          display: block;
          position: relative;
          top: 12%;
          left: 0%;
          height: 2px;
          border-left: solid;
          border-width: 186.5px;
          border-color: #13BED3;;
        }
        &:after{
          content: "";
          display: block;
          position: relative;
          top: -38%;
          right: -53%;
          height: 2px;
          border-left: solid;
          border-width: 186.5px;
          border-color: #13BED3;
        }
      }
      .after-item{
        p {
          font-family: SFCompactDisplay-Regular;
          font-size: 14px;
          color: #999999;
        }
        &:after{
          border-color: #E0E0E0;;
        }
      }
      .hide-item {
        .point{
          background: #E0E0E0;
          border: 0px
        }
        p {
          color: #999999;
        }
        &:before {
          border-color: #E0E0E0;;
        }
        &:after{
          border-color: #E0E0E0;;
        }
      }
    }
    .box-main{
      text-align: center;
      margin-top: 40px;
      .icon {
        width: 64px;
        background-color: #FFF;
        color: #00C1D4;
        font-size: 64px;
      }
      .icon-warn {
        color: #FF9500;
        width: 64px;
        background-color: #FFF;
        font-size: 64px;
      }
      .title{
        font-family: SFCompactDisplay-Medium;
        font-size: 20px;
        color: #333333;
        text-align: center;
        margin-bottom: 4px;
        margin-top: 4px;
      }
      .desc {
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #333333;
        text-align: center;
      }
      .btnWrap{
        border-radius: 20px;
        width: 153px;
        height: 38px;
        padding: 1px;
        margin: 0 auto;
        box-sizing: border-box;
        display: inline-block;
        .btn-buy {
          width: 100%;
          height: 100%;
          border: 0;
          background-color: #fff;
        }
      }
      .tip{
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #666666;
        margin-top: 20px;
      }
    }
  }
</style>
<style lang='less' >
  .payment {
    .el-input__inner{
      border-radius: 22px;
    }
  }
</style>
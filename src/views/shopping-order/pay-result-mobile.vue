<template>
  <div>
      <!-- 是否登录界面 -->
    <div class="payment-result-mobile"  v-loading="loading">
      <!-- 头部 -->
      <div class="bread-self" v-if="finishLoading">
        <!-- class： bg-gradient(成功)  fail(失败) -->
        <div class="item24 bg-gradient">
          <p>Order Info<span></span></p>
        </div>
        <div :class="{'item24': true, 'fail': !orderStatus, 'bg-gradient': orderStatus}">
          <p>Payment<span></span></p>
        </div>
        <div :class="{'item24': true, 'bg-gradient': orderStatus}">
          <p>Confirmation<span></span></p>
        </div>
      </div>
      <!-- 正文提示 -->
      <div class="box-main" v-if="finishLoading">
        <div v-if="orderStatus" v-show="!loading">
          <i class="el-icon-circle-check icon"></i>
          <p class="title">Payment Successful</p>
          <p class="desc">You will receive an email regarding to the order details, please check your inbox within 5 minutes.</p>
          <div class='operateWrap'>
            <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
              <vava-button class="bg40 bg-gradient" round  style="width: 100%;margin-bottom: 16px;">Order Details</vava-button>
            </a>
            <div class="btnWrap">
              <a href="/c/wireless-chargers.html" alt="Wireless Chargers">
                <vava-button class="btn-buy btn40" round>Continue to Buy</vava-button>
              </a>
            </div>
          </div>
        </div>
        <!-- 失败的情况 -->
        <div v-if="!orderStatus" v-show="!loading">
          <i class="el-icon-warning icon-warn"></i>
          <p class="title">Payment Failure</p>
          <p class="desc">Prompt : Your order will expire in 1 days. Please make the payment in time. </p>
          <div class='operateWrap'>
            <div class="btnWrap">
              <vava-button class="bg40 bg-gradient" round @click="dialogTableVisible = true" style="width: 100%;margin-bottom: 16px;">Try Again</vava-button>
              <a :href="'/order/detail/?orderNo=' + orderNo + '&userEmail=' + userEmail" alt="order">
                <vava-button class="btn-buy btn40" round>Order Details</vava-button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="Select Payment Methods" :visible.sync="dialogTableVisible" v-loading="isLoadingPay">
        <div class='pay-type'>
          <div :class="{'pay-type-item': true, 'active': selectPay}" @click="repay">
            <p class="sub-title">PayPal</p>
            <div class="right-block">
              <img src="../../assets/img/cart/paypal.png">
            </div>
          </div>
        </div>
      </el-dialog>
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
        orderNo: '', // 订单号
        userEmail: '', // 邮箱
        orderList: [], // 订单列表
        dialogTableVisible: false, // 控制支付弹窗显示隐藏
        selectPay: false,
        isLoadingPay: false,
        url: '',
        finishLoading: true
      }
    },
    // 引入组件
    props: {},
    mounted: async function () {
      // // 初始化方法
      // await this.$store.dispatch('fetchIsLogin');
      // let pObj = window.localStorage.getItem('paymentData');
      // if (pObj) {
      //   pObj = JSON.parse(pObj);
      //   this.orderNo = pObj.orderNo;
      //   this.payment = pObj;
      //   // 20190123
      //   if (this.isLogin) {
      //     this.userEmail = this.userList.email;
      //   } else {
      //     this.userEmail = pObj.userEmail;
      //   }
      //   await this.getSuccessPay();
      // } else {
      //   this.$router.push("/")
      // }
    },
    // 方法
    methods: {
      /**
       * [getSuccessPay 先支付回调]
       * @author luke 2018-12-27
       */
      async getSuccessPay () {
        let query = this.$route.query;
        if (query && query.paymentId && query.PayerID) {
          let obj = {
            api: 'getSuccessPay',
            data: {
              paymentId: query.paymentId,
              payerId: query.PayerID
            }
          };
          this.loading = true;
          await this.$store.dispatch('FETCH_ORDER_LIST', obj).then(json => {
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
            this.$vueOnToast.pop('error', error)
          });
        }
        this.loading = false;
        this.finishLoading = true
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
      async palpal () {
        // 提交给pp支付
        this.$store.dispatch('FETCH_POST_ALL', this.payment).then(json => {
          let data = json.payload.data
          if (data) {
            // window.open(data.approvalUrl);
            window.location.href = data.approvalUrl;
          }
        }).catch(error => {
          // this.$vueOnToast.pop('error', error)
          console.log(error)
        });
      },
      /**
       * [repay 重新支付]
       * @author luke 2018-12-21
       */
      async repay () {
        this.isLoadingPay = true
        this.selectPay = true
        setTimeout(async() => {
          await this.palpal();
          // this.isLoadingPay = false
          // this.selectPay = false
        }, 1000);
        
      },
      isLength (val) {
        return val && val.length > 0
      }
    },
    components: {
      'rp-header': rpHeader,
      'rp-footer': rpFooter,
    }
  }
</script>
<style lang='less' scoped >
  .payment-result{
    margin-top: 44px;
    padding: 0 0px 140px 0px;
    background: #FAFAFA;
    min-height: 500px;
    .box-main{
      text-align: center;
      margin-top: 90px;
      .icon {
        width: 62px;
        color: #00C1D6;
        font-size: 62px;
      }
      .icon-warn {
        color: #FF9500;
        width: 62px;
        font-size: 62px;
      }
      .title {
        font-family: SFCompactDisplay-Medium;
        font-size: 20px;
        color: #333333;
        text-align: center;
        margin-top: 16px;
        margin-bottom: 10px;
      }
      .desc {
        font-family: SFCompactDisplay-Regular;
        font-size: 14px;
        color: #999999;
        text-align: center;
        padding: 0 36px;
      }
      .operateWrap{
        margin-top: 200px;
        padding: 0 28px;
        .btnWrap{
          width: 100%;
          .btn-buy {
            width: 100%;
          }
        }
      }
    }
    .pay-type{
      .pay-type-item {
        padding: 0 15px;
        height: 40px;
        margin: 15px 0 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #E0E0E0;
        &.active{
          border-color: #00C1D6; 
        }
        .right-block{
          img{
            width: 64px;
          }
        }
      }
    }
  }
</style>
<style lang='less' >
.payment-result{
  .el-dialog{
    margin-top: 30vh!important;
  }
}
  .payment {
    .el-input__inner{
      border-radius: 22px;
    }
  }
</style>
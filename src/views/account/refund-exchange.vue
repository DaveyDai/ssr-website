<template>
  <div>
    <div class="refund_head_pc">
      <img src="@/assets/images/refund_bk.jpg" alt="">
    </div>
    <div class="refund_head_m">
      <h5>Refund & Exchange</h5>
    </div>

    <div class="refund_form">
      <h6>Please enter your information to refund & exchange</h6>
      <div :class="['refund_2',errorInfo.emailError ? 'refund_error' : '']">
        <span>Contact Email</span>
        <input type="text" v-model="orderInfo.email" @focus="orderInfoFocus('emailError')" :disabled="showList">
        <u>{{errorInfo.emailError}}</u>
      </div>
      <div :class="['refund_2',errorInfo.contactNameError ? 'refund_error' : '']">
        <span>Contact Name</span>
        <input
          type="text"
          v-model="orderInfo.contactName"
          @focus="orderInfoFocus('contactNameError')"
          :disabled="showList"
        >
        <u>{{errorInfo.contactNameError}}</u>
      </div>
      <div :class="['refund_2',errorInfo.orderIdError ? 'refund_error' : '']">
        <span>Order ID</span>
        <input type="text" v-model="orderInfo.orderNo" @focus="orderInfoFocus('orderIdError')" :disabled="showList">
        <u>{{errorInfo.orderIdError}}</u>
      </div>
      <div class="refund_2">
        <p class="verify" @click="verify" v-if="!showList">Verify your order</p>
      </div>
    </div>
    <ul class="product_list" v-show="showList&&orderDetails.orderItemVos.length">
      <li v-for="(v,i) in orderDetails.orderItemVos" :key="i">
        <div class="refund_1 refund_box">
          <vava-checkbox
            v-model="isSelect[i]"
            class="login-check login-remember-check"
          >{{v.productName}}</vava-checkbox>
        </div>
        <div class="refund_3 refund_min">
          <span>Quantity</span>
          <input
            type="text"
            :placeholder="'you must return max '+ v.qtyOrdered + ' items'"
            v-model="qtyRefunded[i]"
            :class="quanError[i] ? 'inputError' : ''"
            @focus="qtyFocus(i)"
          >
          <u>{{quanError[i]}}</u>
        </div>
        <div class="refund_3">
          <span>Refund or exchange</span>
          <el-form class="payment-edit-from">
            <el-form-item prop="countryId">
              <el-select
                v-model="refund[i]"
                class="payment-edit-input"
                placeholder="Please Select"
                no-data-text="No Data"
              >
                <el-option value="Refund">Refund</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <u>{{refundError[i]}}</u>
        </div>
        <div class="refund_3 refund_3_m">
          <span>Reason for request</span>
          <el-form class="payment-edit-from">
            <el-form-item prop="countryId">
              <el-select
                v-model="reason[i]"
                class="payment-edit-input"
                placeholder="Please Select"
                no-data-text="No Data"
              >
                <el-option value="Defective">Defective</el-option>
                <el-option value="No longer need">No longer need</el-option>
                <el-option value="Sent wrong item">Sent wrong item</el-option>
                <el-option value="Other reason">Other reason</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <u>{{reasonError[i]}}</u>
        </div>
      </li>
    </ul>
    <div class="submit_m" v-show="showList">
      <div>
        <p>Issue Details</p>
        <textarea name id cols="30" rows="10" v-model="sendOrder.issueDtl" @focus="orderInfoFocus('textareaError')"></textarea>
        <u>{{errorInfo.textareaError}}</u>
      </div>
      <p class="submit" @click="submit">SUBMIT</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showList: false,
      orderInfo: {
        email: "",
        contactName: "",
        orderNo: ""
      },
      errorInfo: {
        emailError: "",
        contactNameError: "",
        orderIdError: "",
        textareaError: ''
      },
      sendOrder: {
        // 传参
        contactName: "",
        orderNo: "",
        email: "",
        issueDtl: "",
        orderItemRefundsBos: [],
        source: 0
      },
      orderDetails: {}, // 订单详情
      isSelect: [], // 选中状态
      orderItem: [], // 子订单信息
      refund: [], // 退换货选择
      qtyRefunded: [], // 退货数量
      reason: [], // 退货原因
      quanError: [], // 退货数量error
      refundError: [], // 退换货类型error
      reasonError: [] // 退货原因error

    };
  },
  methods: {
    // 点击verify
    verify() {
      let err1 = "Must be entered",
          email = this.$utils.trim(this.orderInfo.email),
          contactName = this.$utils.trim(this.orderInfo.contactName),
          orderNo = this.$utils.trim(this.orderInfo.orderNo);

      if (!email) {
        this.errorInfo.emailError = err1;
        return;
      }
      if (!this.$utils.validateEmail(email)) {
        this.errorInfo.emailError = "Invalid email address";
        return;
      }
      if (!contactName) {
        this.errorInfo.contactNameError = err1;
        return;
      }
      if (!orderNo) {
        this.errorInfo.orderIdError = err1;
        return;
      }

      let dataObj = {
        orderNo: orderNo,
        email: email
      };
      this.$store
        .dispatch("postFetch", { api: "getOrderDetails", data: dataObj })
        .then(data => {
          this.showList = true;
          this.orderDetails = data;

          let len = data.orderItemVos.length;
          this.isSelect = new Array(len).fill(false);
          this.refund = new Array(len).fill('');
          this.qtyRefunded = new Array(len).fill('')
          this.reason = new Array(len).fill('')
          this.quanError = new Array(len).fill('')
          this.refundError = new Array(len).fill('')
          this.reasonError = new Array(len).fill('')

          this.sendOrder.contactName = contactName
          this.sendOrder.orderNo = orderNo
          this.sendOrder.email = email
          this.sendOrder.orderItemRefundsBos = []
          this.sendOrder.issueDtl = ''
        })
        .catch(error => {
          this.$utils.showErrorMes(this, error);
        });
    },
    // 失去焦点
    orderInfoFocus(type) {
      this.errorInfo[type] = "";
    },
    qtyFocus(index) {
      this.$set(this.quanError,index,'')
    },
    // 提交
    submit() {
      this.orderItem = []
      let temp = 0;
     
      for (let i in this.isSelect) {
        this.judgeSelect(this.isSelect[i],i)
        if (this.isSelect[i]) {
          temp ++
        }
      }

      if (this.orderItem.length != temp) return false
      this.sendOrder.orderItemRefundsBos = this.orderItem

       if (!this.$utils.trim(this.sendOrder.issueDtl)) {
        this.errorInfo.textareaError = 'Issue Details must not be blank'
        return
      }
      
      console.log(this.sendOrder)

      this.$store.dispatch("postFetch", { api: "refunds", data: this.sendOrder })
      .then(data => {
        this.showList = false
        this.orderInfo.email = ''
        this.orderInfo.contactName = ''
        this.orderInfo.orderNo = ''
      })
      .catch(error => {
        this.$utils.showErrorMes(this, error);
      });
    },

    judgeSelect(val,index) {
      let that = this,
          order = that.orderDetails.orderItemVos[index]
      
      if (val) {
        if (!that.$utils.trim(that.qtyRefunded[index])) {
          this.$set(that.quanError,index,'must bu enter')
          return 
        }
        if (that.$utils.trim(that.qtyRefunded[index]) > order.qtyOrdered) {
          this.$set(that.quanError,index,'you must return max '+ order.qtyOrdered + ' items')
          return 
        }
        if (!/^[0-9]*$/.test(that.$utils.trim(that.qtyRefunded[index]))) {
          this.$set(that.quanError,index,'you must fill in the figures')
          return 
        }

        if (!that.refund[index]) {
          this.$set(that.refundError,index,'must bu select')
          return 
        } else {
          this.$set(that.refundError,index,'')
        }
        if (!that.reason[index]) {
          this.$set(that.reasonError,index,'must bu select')
          return 
        } else {
          this.$set(that.reasonError,index,'')
        }

        let obj = {
          "qtyRefunded": parseInt(that.qtyRefunded[index]),
          "orderItemNo": order.orderItemNo,
          "reason": that.reason[index]
        }
        this.orderItem.push(obj)
      }
    },
  }
};
</script>


<style lang="less" scoped>
.refund_head_pc {
  display: block;
  width: 100%;
  img {
    width: 100%;
  }
}
.refund_head_m {
  display: none;
}
.refund_form,
.product_list li {
  margin: 2vw 21vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  h6 {
    width: 100%;
    font-size: 1.4vw;
    color: #333;
  }
  > div {
    margin-top: 30px;
    position: relative;
    > span {
      display: block;
      position: relative;
      margin-bottom: 0.4vw;
      margin-left: 0.8vw;
      font-size: 1.1vw;
      color: #333;
    }
    > span::after {
      content: "*";
      position: absolute;
      color: #e61515;
    }
    .inputError {
      border: 1px solid #e61515;
    }
    > input {
      width: 100%;
      height: 3.1vw;
      border-radius: 1.55vw;
      padding: 0.8vw;
      border: 1px solid #e0e0e0;
      font-size: 0.96vw;
    }
    u {
      display: block;
      position: absolute;
      text-decoration: none;
      font-size: 13px;
      color: #e61515;
      bottom: -18px;
      left: 0.8vw;
    }
  }
  > .refund_error {
    input {
      border: 1px solid #e61515;
    }
  }
  .refund_1 {
    width: 100%;
    p {
      margin-left: 0.8vw;
      margin-bottom: 0.4vw;
      font-size: 1.1vw;
      color: #333;
    }
  }
  .refund_2 {
    width: 48.2%;
    .verify {
      margin-top: 1.24vw;
      height: 3.1vw;
      line-height: 3.1vw;
      text-align: center;
      width: 11.8vw;
      background: #5d45b4;
      border-radius: 1.55vw;
      font-size: 1.2vw;
      color: #fff;
      cursor: pointer;
    }
  }
  .refund_3 {
    width: 31%;
  }
}
.product_list li {
  border-bottom: 1.2vw solid #fafafa;
  > div {
    margin-top: 15px;
    margin-bottom: 15px;
    u {
      bottom: 5px;
    }
  }
  .refund_box {
    margin-left: 0.4vw;
  }
}
.submit_m {
  margin: 2vw 21vw;
  > div {
    width: 100%;
    position: relative;
    p {
      margin-left: 0.8vw;
      margin-bottom: 0.4vw;
      font-size: 1.1vw;
      color: #333;
    }
    p::after {
      content: "*";
      color: #e61515;
    }
    textarea {
      width: 100%;
      padding: 0.8vw;
      height: 6.3vw;
      border: 1px solid #e0e0e0;
      resize: none;
      border-radius: 0.4vw;
      font-size: 0.96vw;
    }
    u {
      display: block;
      position: absolute;
      text-decoration: none;
      font-size: 13px;
      color: #e61515;
      bottom: -18px;
      left: 0.8vw;
    }
  }
}
.submit {
  width: 28.6vw;
  height: 3.1vw;
  line-height: 3.1vw;
  text-align: center;
  margin: 3.6vw auto;
  background: #5d45b4;
  border-radius: 2vw;
  border-radius: 2vw;
  margin-bottom: 5.1vw;
  font-size: 1.2vw;
  color: #fff;
  cursor: pointer;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #999;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
}
.product_list li .el-select {
  width: 100%;
  height: 3.1vw;
}
.product_list li .el-input--suffix .el-input__inner {
  height: 3.1vw;
  border-radius: 1.55vw;
  border: 1px solid #e0e0e0;
}
.product_list li .el-select .el-input.is-focus .el-input__inner {
  border: 1px solid #e0e0e0;
}
@md: 1/7.5vw;
@media (max-width: 1200px) and (min-width: 921px) {
  .product_list li > div > input {
    margin-top: 0.3vw;
  }
}
@media (max-width: 920px) {
  .refund_head_pc {
    display: none;
  }
  .refund_head_m {
    display: block;
    width: 100%;
    border-top: @md*20 solid #fafafa;
    h5 {
      margin-left: @md*26;
      height: @md*106;
      line-height: @md*106;
      font-size: @md*34;
      color: #333;
      font-weight: 600;
    }
  }
  .refund_form,
  .product_list li {
    margin: @md*30 @md*40;
    display: block;
    border-bottom: none;
    h6 {
      width: 100%;
      font-size: @md*28;
      color: #000;
    }
    > div {
      margin-top: @md*50;
      > span {
        margin-bottom: @md*10;
        margin-left: 0;
        font-size: @md*26;
      }
      > input {
        width: 100%;
        height: @md*70;
        border-radius: @md*35;
        padding: @md*10 @md*20;
        font-size: @md*22;
      }
      u {
        left: @md*20;
      }
    }
    .refund_1 {
      width: 100%;
      p {
        margin-left: 0;
        margin-bottom: @md*10;
        font-size: @md*24;
      }
      textarea {
        width: 100%;
        padding: @md*10 @md*20;
        height: @md*120;
        border-radius: @md*20;
        font-size: @md*22;
      }
    }
    .refund_2 {
      width: 100%;
      .verify {
        margin-top: @md*30;
        height: @md*70;
        line-height: @md*70;
        width: 100%;
        border-radius: @md*35;
        font-size: @md*32;
      }
    }
    .refund_3 {
      width: @md*320;
      input {
        height: @md*60;
      }
    }
    .refund_3_m {
      width: 100%;
      margin-top: 0;
    }
  }
  .product_list {
    li {
      padding: 0 @md*40;
      margin: @md*30 0;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      border-top: @md*20 solid #fafafa;
      .vava-checkbox {
        color: #5d45b4;
        font-size: @md*22;
      }
      .vava-checkbox .vava-checkbox-select {
        margin-left: 0;
      }
      .el-input--suffix .el-input__inner {
        font-size: @md*22;
      }
      .el-select {
        height: @md*60;
      }
      .el-input--suffix .el-input__inner {
        height: @md*60;
        border-radius: @md*30;
      }
      > div {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .refund_box {
        margin-left: 0;
      }
    }
  }
  .submit_m {
    margin: @md*10 @md*40;
    > div {
      width: 100%;
      p {
        margin-left: 0;
        margin-bottom: @md*10;
        font-size: @md*24;
      }
      textarea {
        width: 100%;
        padding: @md*10 @md*20;
        height: @md*120;
        border-radius: @md*20;
        font-size: @md*22;
      }
      u {
        left: @md*20;
      }
    }
  }
  .submit {
    width: 100%;
    height: @md*70;
    line-height: @md*70;
    border-radius: @md*35;
    margin-bottom: @md*30;
    font-size: @md*32;
  }
}
@media (max-width: 500px) {
  .refund_form .refund_3, .product_list li .refund_3 {
    width: 100%;
    margin-bottom: 0;
  }
  .product_list li .refund_3_m {
    margin-top: 0;
  }
  .product_list li .refund_min {
    padding-bottom: 10px;
  }
  .refund_form > div u {
    bottom: -15px;
  }
  .product_list li > div u {
    bottom: 8px;
  }
  .product_list li .refund_min u {
    bottom: -5px;
  }
}
</style>

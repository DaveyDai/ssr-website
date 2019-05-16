<template>
  <div class="shopping-order-pay center-main" v-loading.lock="fullscreenLoading">
    <shopping-step :active="2" class="shopping-step"></shopping-step>
    <div class="order-pay-edit">
      <div class="slide-left ">
        <!-- 第一步 地址 -->
        <div class="box-address">
          <div class="title"  v-bind:class="{ 'active' : isGoPay }">1.Shipping Address</div>
          <!-- 编辑地址 -->
          <div v-show="!isGoPay">
            <!-- 未登录情况的 地址编辑 -->
            <shipping-address  @newAddress="changeAddress" v-if="!isLogin" :defaultdefault-address="selAddress" :is-cancel="!!selAddress.firstName" @cancelAddress="isGoPay = true"></shipping-address>
            <!-- 登录情况地址列表-->
            <div class="box-list" v-else>
              <div class="list" >
                <div class="item rel" v-for="(item,index) in inAddressList" @click="clickAddress(item)" v-bind:class="{ 'active': selAddress.addressUuid === item.addressUuid }" :key="index">
                  <p>{{ item.firstName }} {{ item.lastName }}</p>
                  <p>{{ item.notificationEmail }}</p>
                  <div class="desc">
                    <p>{{ item.address1 }} {{ item.address2 }}</p>
                    <p> {{ item.city }}, {{ item.regionName }} {{ item.zipCode }}</p>
                    <p> {{ item.countryName }}</p>
                    <p> Phone: {{item.telephone}}</p>
                  </div>
                  <div class="abs-op">
                    <i class="el-icon-edit" @click="updateAddress(item)" ></i>
                    <i class="el-icon-delete" @click="deleteAddress(item)"></i>
                  </div>
                </div>
                <div class="item"  @click="loginAddAddress">
                  <div class="add-icon">
                    <i class="el-icon-plus"></i>
                  </div>
                  <p class="text">Add a new address</p>
                </div>
              </div>
              <!-- 按钮下一步 -->
              <vava-button :disable="!selAddress.addressUuid" @click="clickCont" class="bg-gradient check-address">Continue</vava-button>
            </div>
          </div>
          <!-- 地址选择好之后折叠内容展示 -->
          <div class="detail" v-if="isGoPay">
            <p>{{ selAddress.firstName }} {{ selAddress.lastName }}</p>
            <p>{{ selAddress.notificationEmail }}</p>
            <div class="desc">
              <p>{{ selAddress.address1 }} {{ selAddress.address2 }}</p>
              <p> {{ selAddress.city }}, {{ selAddress.regionCode }} {{ selAddress.postcode }}</p>
              <p> {{ selAddress.countryCode }}</p>
              <p> Phone: {{selAddress.telephone}}</p>
            </div>
            <div class="abs-edit" @click="isGoPay = false">Change Address</div>
          </div>
          <!-- 登陆之后地址 修改地址弹框 -->
          <el-dialog :visible.sync="dialogVisible" title="Shipping Address" width="55%" top="10vh" class="dialog-ress" center>
            <shipping-address  @newAddress="loginSaveAddress" @cancelAddress="cancelRess" :default-address="upAddressData" isCancel loginSave></shipping-address>
          </el-dialog>
        </div>
        <!-- 第二步  2.Payment Methods-->
        <div class="pay-methods">
          <div class="title"  v-bind:class="{ 'bg-ddd' : !isGoPay }" >2.Payment Methods</div>
          <div class="box-list" v-if="isGoPay">
              <!-- pp支付 -->
              <div class="item rel border-gradient">
              <p class="sub-title">PayPal</p>
              <p>Pay by credit card. debit card and more through your PayPal account</p>
              <img src="@/assets/images/shopping/icon_pay.png" style="width:170px;margin-top: 4px;">
              <div class="right-block"><img src="@/assets/images/shopping/paypal.png" width="120px"></div>
              </div>
              <p class="desc">*Currently we only support payment via PayPal,  but will add more methods in the future.</p>
          </div>
        </div>
      </div>
      <!-- 右边结算预览 -->
      <order-summary class="order-pay-summary" :isActive="isGoPay" isPay @click="saveOrder" :order-taxes="orderTaxes"></order-summary>
    </div>
  </div>
</template>
<script>
  import { invokeGetShoppingCart } from '@/api/invoke.js'
  import ShippingAddress  from './shipping-address.vue'
  import OrderSummary from './order-summary.vue'
  import ShoppingStep from './shopping-step.vue'
  export default {
    components: { ShoppingStep, ShippingAddress, OrderSummary },
    computed: {
      shoppingCart () { // 购物车列表(最终需要支付的)
        return this.$utils.calculationCart(this.$store.state.shoppingCart.productList, this.$store.state.shoppingCart.shoppingCartId, true)
      }
    },
    data () {
      return {
        orderTaxes: 0, // 订单税费
        selAddress: {}, // 选中的地址列表
        inAddressList: [], // 登陆状态下的地址列表
        upAddressData: {}, // 登陆状态下用户需要编辑的地址
        dialogVisible: false, // 修改地址弹出框是否显示(登陆状态)
        isGoPay: false, // 是否可以下订单
        fullscreenLoading: false,
        isLogin: false, // 是否登陆
        // 弹出对话框设置option
        messageBoxOp: { title: '', confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning', roundButton: true, center: true, cancelButtonClass: 'cance-confirm-class', confirmButtonClass: 'sure-confirm-class' }
      }
    },
    beforeMount () {
      // 如果登陆就获取地址列表 未登陆直接显示地址编辑表单
       if (this.$cookies.get('token')) {
         this.isLogin = true
         this.getInAddress()
       }
       this.selAddress.notificationEmail = this.$route.query.email || this.shoppingCart.payEmail || (this.$store.state.accountData.memberInfoBo && this.$store.state.accountData.memberInfoBo.emailAddress) || ''
    },
    methods: {
      loginSaveAddress (addressData) { // 登陆状态 编辑地址点击保存处理方法
        this.$store.dispatch('postFetch', {api: addressData.addressUuid ? 'addressEdit' : 'addressAdd', data: addressData}).then(data => {
          this.selAddress.addressUuid = addressData.addressUuid || data // 设置收货地址uuid
          Object.assign(this.selAddress, addressData)
          this.inAddressList.push(this.selAddress) // 添加到地址列表供用户选择
          this.dialogVisible = false // 关闭编辑地址弹框
          this.isGoPay = true // 可以支付了
          this.getOrderTax()
        }).catch(error => {
          // 即时报错也不中断用户购买流程
          this.changeAddress(addressData)
          this.dialogVisible = false // 关闭编辑地址弹框
        })
      },
      loginAddAddress () { // 登陆状态下新增地址
        this.upAddressData = {notificationEmail: this.selAddress.notificationEmail}
        this.isGoPay = false
        this.dialogVisible = true
      },
      changeAddress (addressData) { // 未登陆状态下 保存地址
        this.selAddress = addressData
        this.isGoPay = true
        this.getOrderTax() // 计算税费
      },
      getInAddress (isNoDefault) { // 获取地址列表 只有在登陆状态下 进入页面的时候调用
        this.$store.dispatch('postFetch', {api: 'findAddressInfoListVo', data: {pageNo: 1, pageSize: 20}}).then(data => {
          this.inAddressList = data.records
          if (!isNoDefault && this.inAddressList && this.inAddressList.length > 0) {
            this.selAddress = this.inAddressList[0] // 默认选中第一个地址
            this.getOrderTax() // 根据地址获取税费
          }
        }).catch(error => {
          this.$message.error(error)
        })
      },
      getOrderTax () { // 根据地址获取税费
        let taxesParam = {
          orderAddressBo: this.selAddress, // 当前选择的地址
          cartInfoBos: this.shoppingCart.productList, // 商品列表
          email: this.selAddress.notificationEmail, // 账户邮箱（地址编辑里面的）
          shopCartId: this.shoppingCart.shoppingCartId, // 购物车ID
          useLogin: !!this.$cookies.get('token'), // 是否登陆
          paymentMethod: 0,
          source: 0
        }
        this.$store.dispatch('postFetch', {api: 'getOrderInfoPriceVo', data: taxesParam}).then(data => {
          this.orderTaxes = data.subtotal // 订单税费
        }).catch(error => {
        })
      },
      // 下单
      saveOrder (shoppingData) { // shoppingData 下单结算商品数据及总金额等
        this.fullscreenLoading = true
        let orderData = {
          orderAddressBo: this.selAddress, // 当前选择的地址
          cartInfoBos: this.shoppingCart.productList, // 商品列表
          email: this.selAddress.notificationEmail, // 账户邮箱（地址编辑里面的）
          shopCartId: this.shoppingCart.shoppingCartId, // 购物车ID
          useLogin: !!this.$cookies.get('token'), // 是否登陆购买
          paymentMethod: 1, // 支付方式(1-paypal)
          source: Number(this.$store.state.mediaDevices) // 下单来源(0-pc 1-h5)
        }
        console.log('下单参数：', shoppingData)
        // 用户下单
        this.$store.dispatch('postFetch', {api: 'submitOrderInfo', data: orderData}).then(data => { // 调用下单接口
          // this.$seoFn.onCheckoutOption(3, 'Pay')
          this.clearCarts() // 清空购物车
          this.payPalpal(data.orderNo, orderData.email) // 下单成功后调用PP支付
        }).catch(error => {
          this.fullscreenLoading = false
          this.$utils.showErrorMes(this, error)
        })
      },
      payPalpal (orderNo, email) { // 提交给pp支付
        this.$store.dispatch('postFetch', {api: 'paypalOrder', data: { orderNo, email }}).then(data => {
          window.location.href = data.successUrl
        }).catch(error => {
          this.$message.error(error)
        })
      },
      clearCarts () { // 清空购物车 直接刷新购物车列表
        invokeGetShoppingCart(this)
      },
      deleteAddress (item) { // 登陆状态下删除地址
        this.$confirm('Are you sure you want to delete this shipping address ?', 'Tips', this.messageBoxOp).then(() => {
          this.$store.dispatch('postFetch', {api: 'deleteAddress', data: [item.addressUuid]}).then(data => {
            // 如果删除的地址是选中的地址 则需要重新选中第一地址
            this.getInAddress(item.addressUuid !== this.selAddress.addressUuid)
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        }).catch(() => {})
      },
      updateAddress (item) { // 登陆状态下更新地址
        this.upAddressData = JSON.parse(JSON.stringify(this.selAddress))
        this.dialogVisible = true
        event.stopPropagation()
      },
      cancelRess () { // 登陆状态下 取消地址编辑
        if (this.selAddress.addressUuid) this.isGoPay = true
        this.dialogVisible = false
      },
      clickAddress (item) { // 登陆状态下选中地址
        this.selAddress = item
        this.isGoPay = true
        this.getOrderTax() // 获取税费
      },
      clickCont () { // 确定选择地址并下一步选中支付方式
        this.isGoPay = true
        // this.$seoFn.onCheckoutOption(2, 'checkoutOption');
      }
    }
  }
</script>
<style lang='less' scoped >
  .shopping-order-pay {
    width: 100%;
    background: #FAFAFA;
    .shopping-step{
      background-color: #FFF;
      margin-bottom: 20px;
      padding: 0 150px;
    }
    .order-pay-edit{
      display: flex;
      justify-content: center;
      padding-bottom: 40px;
      .slide-left {
        width: 850px;
        display: inline-block;
      }
      .box-address {
        padding: 0px 0px 10px 0px;
        width: 100%;
        .title{
          background: #666666;
          height: 60px;
          line-height: 60px;
          font-family: SFCompactDisplay-Regular;
          font-size: 20px;
          color: #FFFFFF;
          padding-left: 20px;
        }
        .active {
          background: #fff;
          color: #000;
          border-bottom: 1px solid #eee;
        }
        .box-list {
          background: #FFFFFF;
          padding: 20px;
          text-align: center;
          .list {
            display: flex;
            text-align: left;
            flex-wrap: wrap;
            .item{
              padding: 20px;
              background: #FFFFFF;
              border: 1px dotted #EEEEEE;
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #333333;
              line-height: 20px;
              width: 397px;
              margin-right: 15px;
              margin-bottom: 15px;
              cursor: pointer;
              min-height: 175px;
              transition: all .2s linear;
              transform: translate3d(0, -2px, 0);
              .desc {
                border-top: 1px solid #EEEEEE;
                margin-top: 6px;
                padding-top: 6px;
              }
              .add-icon {
                border: 1px solid #E0E0E0;
                padding: 11px;
                width: 44px;
                height: 44px;
                line-height: 22px;
                margin: 0 auto;
                border-radius: 50%;
                margin-top: 7%;
                i {
                  font-size: 20px;
                  text-align: center;
                  color: #979797;
                }
              }
              .text {
                text-align: center;
                font-family: SFCompactDisplay-Regular;
                font-size: 14px;
                color: #333333;
                line-height: 20px;
              }
              .abs-op {
                position: absolute;
                right: 20px;
                bottom: 20px;
                display: none;
                i {
                  width: 16px;
                  margin-right: 15px;
                  color: #666666;
                  &:hover{
                  color: #13bed3;
                  }
                  &:last-child {
                    margin-right: 0px;
                  }
                }
              }
              &:hover{
                border: 1px solid transparent;
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
                .abs-op {
                  display: block;
                }
              }
              &:nth-child(2n) {
                margin-right: 0px;
              }
            }
            .active {
              border: 1px solid transparent;
              border-image-slice: 1;
            }
          }
          .check-address{
            margin-top: 20px;width: 180px;max-height: 45px;
          }
        }
        .detail {
          font-family: SFCompactDisplay-Regular;
          background: #FFFFFF;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          text-align: left;
          position: relative;
          .desc{
            color: #666666;
            line-height: 20px;
          }
          .abs-edit{
            position: absolute;
            top: 20px;
            right: 20px;
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: @base-color;
            line-height: 20px;
            cursor: pointer;
          }
        }
      }
      .pay-methods {
        width: 100%;
        .title {
          font-family: SFCompactDisplay-Regular;
          font-size: 20px;
          height: 60px;
          line-height: 60px;
          padding-left: 20px;
          background: #fff;
          color: #000;
          border-bottom: 1px solid #eee;
        }
        .bg-ddd {
          background: #ddd;
        }
        .box-list {
          padding: 20px;
          background: #FFFFFF;
          .item {
            position: relative;
            padding: 20px;
            .right-block {
              position: absolute;
              top: 32px;
              right: 30px;
            }
            .sub-title{
              font-size: 16px;
              line-height: 22px;
            }
            p {
              font-family: SFCompactDisplay-Regular;
              font-size: 14px;
              color: #666666;
              line-height: 20px;
            }
          }
          .desc {
            font-family: SFCompactDisplay-Regular;
            font-size: 12px;
            color: #999999;
            margin-top: 10px;
          }

        }
      }
      .btn-gray {
        background: #DDDDDD;
        border-radius: 22px;
        margin-top: 35px;
        border: 0px;
        color: #fff;
        &:hover{
          box-shadow: 0 8px 24px #DDDDDD;
        }
      }
    }
    .order-pay-summary{
      margin-left: 20px;
    }
  }
</style>

<style lang='less'>
  .dialog-ress{
    .el-dialog--center .el-dialog__body {
      padding-top: 0px;
    }
  }
  .error {
    .el-input__inner {
      border-color: #f56c6c;
    }
  }
  .el-dialog__header {
    .el-dialog__title{
      font-family: SFCompactDisplay-Thin;
      font-size: 32px;
      color: #666666;
      padding-top: 10px;
    }
  }
  .box-code {
    .el-input__inner {
      height: 32px;
    }
  }
</style>

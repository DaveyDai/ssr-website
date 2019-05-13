<template>
  <div class="couponCode">
    <!-- 订单确认页内优惠码页 -->
    <h3 class="title">
      <i class="el-icon-arrow-left expand" @click='goBack'></i>
      <span>Coupon Code</span>
    </h3>
    <div class="searchWrap">
      <div class="searchCoupon">
        <el-form ref="form" :model="form" :rules='rules' class='coupon-form' @submit.native.prevent>
          <el-form-item prop="couponCode">
            <el-input v-model="form.couponCode" @blur="showerror = false" @keyup.native.enter.prevent="submitForm('form')"></el-input>
          </el-form-item>
          <el-form-item class="applyBtnItem">
            <el-button class='bg40 bg-gradient applyBtn' @click="submitForm('form')">Apply</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="searchResult">
        <p class="noResult" v-if="showerror && searchCouponList && !Array.isArray(searchCouponList)">{{searchCouponList}}!</p>
        <div class="result-list" v-for="(item, index) in searchCouponList" :key="index" v-show="searchCouponList && Array.isArray(searchCouponList)">
          <div :class="{'result-item': true, 'active': selectIdx === index}" @click="setCoupon(item, index)">
            {{item.couponName}}
          </div>
        </div>
      </div>
      <div class="notice" v-if="form.couponCode && showerror && searchCouponList && !Array.isArray(searchCouponList)">
        <p>Suggestions:</p>
        <p>1.Check your code.</p>
        <p>2.Please do not enter Spaces</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next((vm) => {
        vm.fromRouter = from.fullPath
      })
    },
    data() {
      return {
        fromRouter: '',
        form: {
          couponCode: ''
        },
        rules: {
          couponCode: [
            { required: true, message: 'Coupon Code is empty!', trigger: 'change' }
          ]
        },
        userAuthToken: '',
        searchCouponList: [], // 搜索的coupon的数据
        selectIdx: -1,
        showerror: true
      }
    },
    watch: {
      form: {
        handler: function (val) {
          this.searchCouponList = '';
          console.log(1111)
        },
        deep: true
      }
    },
    mounted() {
      this.userAuthToken = this.$cookie.get('userAuthToken');
      if (this.couponInfo && JSON.stringify(this.couponInfo) !== '{}') {
        this.form.couponCode = this.couponInfo.couponCode
        setTimeout(() => {
          const arr = []
          arr.push(this.couponInfo)
          this.searchCouponList = arr
          this.selectIdx = 0
        }, 100);
      }
    },
    methods: {
      // 选择使用code 码
      setCoupon(item, index) {
        this.selectIdx = index
        this.$store.commit('SET_COUPON', item)
        setTimeout(() => {
          this.$router.push(this.fromRouter)
        }, 500);
      },
      // 校验表单
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            this.selectIdx = -1
            try {
              await this.getCouponInfo()
            } catch (e) {
              console.log(e)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 获取coupon 信息
       */
      async getCouponInfo () {
        let obj = {
          api: 'getCouponCode',
          data: {
            token: this.userAuthToken,
            couponCode: this.form.couponCode,
            subTotal: this.cartList.totalAmount
          }
        };
        this.$store.dispatch('FETCH_GET_ALL', obj).then(json => {
          let data = json.payload.data;
          if (json.code !== 200) {
            this.showerror = true
            if (json.code === 40000) {
              this.searchCouponList = 'Coupon Code is not exist'
            } else {
              this.searchCouponList = json.message
            }
          } else {
            if (!this.$common.isNull(data) && JSON.stringify(data) !== '{}') {
              const conponInfo = {
                couponName: data.couponName,
                directDiscount: data.directDiscount / 100,
                promotionType: 1,
                couponCode: this.form.couponCode
              }
              const arrTemp = []
              arrTemp.push(conponInfo)
              this.searchCouponList = arrTemp
            }
          }
          console.log(json)
        }).catch((error) => {
          console.log(error)
        })
      },
      // 返回上一级
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .couponCode{
    background-color: #f5f5f5;
    padding-top: 44px;
    height: 100%;
    .title{
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      position: relative;
      text-align: center;
      margin-bottom: 10px;
      font-family: SFCompactDisplay-Regular;
      font-size: 16px;
      color: #333333;
      background-color: white;
      text-align: center;
      i{
        position: absolute;
        left: 15px;
        top: 13px;
        font-size: 18px;
      }
    }
    .searchWrap{
      padding: 0 15px;
      .searchCoupon{
        position: relative;
        .coupon-form{
          .applyBtnItem{
            position:absolute;
            right: 0;
            top: 0;
            .applyBtn{
              width: 130px;
              font-family: SFCompactDisplay-Regular;
              font-size: 16px;
              color: #FFFFFF;
              text-align: center;
            }
          }
        }
      }
      .searchResult{
        .noResult{
          padding: 0 16px;
          font-family: SFCompactDisplay-Regular;
          color: #f56c6c;
          font-size: 12px;
          line-height: 1;
          padding-top: 4px;
        }
        .result-list{
          margin-top: 10px;
          margin-bottom: 40px;
          .result-item{
            font-family: SFCompactDisplay-Regular;
            font-size: 14px;
            color: #666666;
            line-height: 40px;
            padding: 0 16px;
            height: 40px;
            border: 1px dashed  #E0E0E0;
            background-color: white;
            border-radius: 3px;
            &.active{
              border: 1px dashed #13BED3;
              color: #13BED3;
            }
          }
        }
      }
      .notice{
        font-family: SFCompactDisplay-Regular;
        font-size: 14px;
        color: #999999;
        line-height: 18px;
        margin: 32px 16px;
      }
    }
  }
</style>

<style lang="less">
  .searchCoupon{
    .el-form-item{
      margin-bottom: 0;
    }
  }
</style>
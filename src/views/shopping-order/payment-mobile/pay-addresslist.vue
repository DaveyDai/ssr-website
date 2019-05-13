<template>
  <div class="payAddressList">
    <!-- 订单确认页内地址列表页 -->
    <div class='list-wrap' v-loading='isLoading'>
      <div class="title">
        <i @click='goBack' class="el-icon-arrow-left expand"></i>
        <span>Shipping Address</span>
      </div>
      <div class="addNewAddress">
        <a class='infoA' href="/pay-addressdetail"><i class='el-icon-circle-plus-outline'></i>Add a new address</a>
      </div>
      <div class="list-main" v-if="addressList.length > 0 && isLogin">
        <div :class="{'list-item': true, 'active': selectIdx === item.id}" v-for="(item, index) in addressList" :key="index" @click="selectAddr(item, index)">
          <div class="name">
            <strong>{{ item.firstName }} {{ item.lastName }} </strong>
            <p class="abs-op">
              <i class="el-icon-edit" @click.stop="goEdit(item)" ></i>
              <i class="el-icon-delete" @click.stop="goDel(item)"></i>
            </p>
          </div>
          <p class="email">{{ email }}</p>
          <div class="addr-info">
            <div class="desc">
              <p>{{ item.address1 }} {{ item.address2 }}</p>
              <p> {{ item.city }}, {{ item.regionCode }} {{ item.postcode }}</p>
              <p> {{ item.countryCode }}</p>
              <p> Phone: {{item.telephone}}</p>
            </div>
            <p>
              <el-checkbox @click.native.stop="updateAddress(item, index)" v-model="item.active">Default Address</el-checkbox>
            </p>
          </div>
        </div>
      </div>
      <el-dialog class="confirmInfo"
        :visible.sync="dialogTableVisible">
        <div class="dialog-wrap">
          <div class="dialog-main">
            <i class="el-icon-warning"></i>
            <span>Delete Address</span>
          </div>
          <div class="dialog-footer">
            <a class="confirm-btn" @click="dialogTableVisible = false">Cancel</a>
            <a class="cancel-btn" type="primary" @click="delAddress(delAddr)">Confirm</a>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      isLogin () {
        if (this.userList && this.userList.accountId !== undefined) {
          return true;
        }
        return false
      }
    },
    data() {
      return {
        userAuthToken: '',
        addressList: [],
        isLoading: false,
        dialogTableVisible: false, // 删除地址信息的二次确认弹框
        delAddr: {},
        selectIdx: -1
      }
    },
    watch: {
      dialogTableVisible(val) {
        if (!val) {
          this.delAddr = {}
        }
      }
    },
    async mounted() {
      await this.$store.dispatch('fetchIsLogin');
      this.userAuthToken = this.$cookie.get('userAuthToken');
      if (this.isLogin) {
        await this.getAddressList()
        this.email = this.userList.email;
      } else {
        this.email = this.$route.query.email;
      }
      this.selectIdx = Number(this.$cookie.get('currentAddrId'))
    },
    methods: {
      // 选择一个地址并跳转
      selectAddr(item, idx) {
        this.selectIdx = item.id
        setTimeout(() => {
          this.$router.push(`/pay?selectId=${item.id}`)
        }, 500);
        // 选择地址
        this.$seoFn.onCheckoutOption(2, 'checkoutOption');
      },
      // 删除地址
      goDel(item) {
        this.delAddr = JSON.parse(JSON.stringify(item));
        this.dialogTableVisible = true
      },
      // 跳转到地址编辑页面编辑当条地址数据
      goEdit(item) {
        this.$router.push(`/pay-addressdetail?editId=${item.id}`)
      },
      /**
       * [getInAddress 获取登陆]
       * @author luke 2018-12-15
       */
      getAddressList () {
        this.isLoading = true
        // 获取地址列表
        let obj = {
          api: 'getAddressList',
          data: {
            userAuthToken: this.userAuthToken
          }
        }
        let ths = this;
        this.$store.dispatch('FETCH_ADDRESS_ALL', obj).then(json => {
          if (json && json.payload && json.payload.data && Array.isArray(json.payload.data) && json.payload.data.length > 0) {
            let dataList = json.payload.data
            dataList = dataList.map((item) => {
              item.active = !!item.active
              return item
            })
            this.addressList = dataList
          }
          this.isLoading = false
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
          this.isLoading = false
        });
      },
      /**
       * [delAddress 删除地址]
       * @author luke 2018-12-15
       */
      async delAddress (item) {
        let obj = {
          api: 'delAddress',
          data: {
            userAuthToken: this.userAuthToken,
            id: item.id
          }
        };
        await this.$store.dispatch('FETCH_ADDRESS_ALL', obj);
        this.dialogTableVisible = false
        // 获取新的地址
        this.getAddressList();
        let inObj = {
          api: 'getAddressList',
          data: {
            userAuthToken: this.userAuthToken
          }
        }
        this.$store.dispatch('FETCH_ADDRESS_ALL', inObj).then(json => {
          if (json && json.payload && json.payload.data && Array.isArray(json.payload.data) && json.payload.data.length > 0) {
            let dataList = json.payload.data
            dataList = dataList.map((item) => {
              item.active = !!item.active
              return item
            })
            this.addressList = dataList
          }
        });
        // 阻止事件冒泡
        event.stopPropagation();
      },
      /**
       * [updateAddress 修改地址]
       * @author luke 2018-12-17
       */
      async updateAddress (item, index) {
        setTimeout(async() => {
          item = JSON.parse(JSON.stringify(item))
          let obj = {
            api: 'updateActive',
            data: {
              userAuthToken: this.userAuthToken,
              id: item.id
            }
          }
          this.isLoading = true
          await this.$store.dispatch('UPDATE_ADDRESS', obj);
          this.addressList.forEach((item, key) => {
            if (key !== index) {
              item.active = false
            }
          })
          // if (this.isLogin) {
          //   await this.getAddressList()
          // }
          this.isLoading = false
          // 阻止事件冒泡
          event.stopPropagation();
        }, 50);
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
.payAddressList{
  padding-top: 44px;
  background-color: #f5f5f5;
  height: 100%;
  .list-wrap{
    min-height: 200px;
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
    .addNewAddress{
      margin: 10px 15px;
      background-color: white;
      border: 1px dashed #E0E0E0;
      .infoA{
        font-family: SFCompactDisplay-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        }
      i {
        margin-right: 8px;
        font-size: 24px;
      }
    }
    .list-main{
      text-align: center;
      display: flex;
      text-align: left;
      flex-wrap: wrap;
      margin-bottom: 70px;
      .list-item{
        background: #FFFFFF;
        padding: 8px 15px 16px;
        font-family: SFCompactDisplay-Regular;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        width: 100%;
        margin-bottom: 1px;
        border: 1px solid  transparent;
        &.active{
          border: 1px solid  #00C1D6;
        }
        .name{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          span{
            font-family: SFCompactDisplay-Medium;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
          }
        }
        .addr-info{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-end;
        }
        .abs-op {
          i {
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: inline-block;
            padding: 5px;
            margin-right: 10px;
            color: #13bed3;
            &:last-child {
              margin-right: 0px;
            }
          }
        }
      }
      .active {
        border: 1px solid transparent;
        border-image: linear-gradient(125deg, #c8eb91 10%, #13bed3 100%);
        border-image-slice: 1;
      }
    }
  }
}
</style>
<style lang="less">
  .addr-info{
    .el-checkbox__label{
      padding-left: 8px;
    }
    .el-checkbox__inner{
      width: 16px;
      height: 16px;
      border-radius: 8px;
      &::after{
        top: 2px;
        left: 5px;
      }
    }
  }
</style>
<template>
  <div class="payAddressList">
    <!-- 订单确认页内地址列表页 -->
    <div class='list-wrap'>
      <div class="title">
        <i @click='goBack' class="el-icon-arrow-left expand"></i>
        <span>Shipping Address</span>
      </div>
      <div class="addNewAddress">
        <a class='infoA' href="/pay-addressdetail"><i class='el-icon-circle-plus-outline'></i>Add a new address</a>
      </div>
      <div class="list-main" v-if="inAddressList.length > 0">
        <div :class="{'list-item': true, 'active': selAddress.addressUuid === item.addressUuid }" v-for="(item, index) in inAddressList" @click="clickAddress(item)" :key="index">
          <div class="name">
            <strong>{{ item.firstName }} {{ item.lastName }} </strong>
            <p class="abs-op">
              <i class="el-icon-edit" @click.stop="goEdit(item)" ></i>
              <i class="el-icon-delete" @click.stop="deleteAddress(item, index)"></i>
            </p>
          </div>
          <p class="email">{{ item.notificationEmail }}</p>
          <div class="addr-info">
            <div class="desc">
              <p>{{ item.address1 }} {{ item.address2 }}</p>
              <p> {{ item.city }}, {{ item.regionCode }} {{ item.postcode }}</p>
              <p> {{ item.countryCode }}</p>
              <p> Phone: {{ item.telephone }}</p>
            </div>
            <!-- <p>
              <el-checkbox @click.native.stop="updateAddress(item, index)" v-model="item.active">Default Address</el-checkbox>
            </p> -->
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
    data() {
      return {
        dialogTableVisible: false,
        selAddress: {}, // 选中的地址列表
        inAddressList: [], // 登陆状态下的地址列表
        // 弹出对话框设置option
        messageBoxOp: { title: '', confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning', roundButton: true, center: true, cancelButtonClass: 'cance-confirm-class', confirmButtonClass: 'sure-confirm-class' }
      }
    },
    beforeMount () {
      this.inAddressList = this.$store.state.inAddressList || []
      this.selAddress = this.$store.state.selAddress || {}
      this.getInAddress()
    },
    methods: {
      deleteAddress (item, index) { // 登陆状态下删除地址
        this.$confirm('Are you sure you want to delete this shipping address ?', 'Tips', this.messageBoxOp).then(() => {
          this.$store.dispatch('postFetch', {api: 'deleteAddress', data: [item.addressUuid]}).then(data => {
            this.inAddressList.splice(index, 1)
            this.$store.commit('setInAddressList', this.inAddressList) // 保存地址列表
            if (item.addressUuid === this.selAddress.addressUuid) {
              this.$store.commit('setSelAddress', {}) // 保存选中的地址
            }
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        }).catch(() => {})
      },
      getInAddress (isNoDefault) { // 获取地址列表 只有在登陆状态下 进入页面的时候调用
        this.$store.dispatch('postFetch', {api: 'findAddressInfoListVo', data: {pageNo: 1, pageSize: 20, condition: {}}}).then(data => {
          this.inAddressList = data.records
          this.$store.commit('setInAddressList', this.inAddressList) // 保存地址列表
        }).catch(error => {
          this.$message.error(error)
        })
      },
      // deleteAddress (item) { // 登陆状态下删除地址
      //   this.$confirm('Are you sure you want to delete this shipping address ?', 'Tips', this.messageBoxOp).then(() => {
      //     this.$store.dispatch('postFetch', {api: 'deleteAddress', data: [item.addressUuid]}).then(data => {
      //       // 如果删除的地址是选中的地址 则需要重新选中第一地址
      //       this.getInAddress(item.addressUuid !== this.selAddress.addressUuid)
      //     }).catch(error => {
      //       this.$utils.showErrorMes(this, error)
      //     })
      //   }).catch(() => {})
      // },
      clickAddress (item) { // 登陆状态下选中地址
        this.selAddress = item
        this.$store.commit('setSelAddress', this.selAddress) // 保存选中的地址
        setTimeout(() => {
          this.$router.push(`/pay-m?addressUuid=${item.addressUuid}`)
        }, 500);
      },
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
.payAddressList{
  // padding-top: 44px;
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
          border: 1px solid  #6244BB;
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
            color: #666666;
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
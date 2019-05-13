<template>
  <div class="payment-edit" ref="addressContent">
    <message-card @editCard="editCard" :card-data="dataList" @deleteCard="deleteAddress" @setDefalut="setDefalut" v-if="showCard" :type="2"></message-card>
    <transition name="slide-fade">
      <div class="payment-edit-content" v-show="isShowEdit" ref="addressEdit">
        <el-form :model="addressData" class="payment-edit-from">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="addressData.firstName" class="payment-edit-input" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="addressData.lastName" class="payment-edit-input" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="countryId">
            <el-select v-model="addressData.countryId" class="payment-edit-input" placeholder="Please Choose" no-data-text="No Data" @change="selectCountry">
              <el-option v-for="item of countryList" :value="item.id" :label="item.countryName" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="State/Province/Region" prop="regionId">
            <el-select v-model="addressData.regionId" class="payment-edit-input" placeholder="Please Choose" no-data-text="No Data">
              <el-option v-for="item of regionData" :value="item.id" :label="item.regionName" :key="item.id" clearable></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="City/Town" prop="city">
            <el-input v-model="addressData.city" class="payment-edit-input" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="Address line 1" prop="address1">
            <el-input v-model="addressData.address1" class="payment-edit-input" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Address line 2" prop="address2">
            <el-input v-model="addressData.address2" class="payment-edit-input" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Zip/Post Code" prop="zipCode">
            <el-input v-model="addressData.zipCode" class="payment-edit-input" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="Notification Email" prop="notificationEmail">
            <el-input v-model="addressData.notificationEmail" class="payment-edit-input" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="Phone Number" prop="telephone">
            <el-input v-model="addressData.telephone" class="payment-edit-input" maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div class="payment-edit-default"><vava-checkbox v-model="addressData.isPrimary"><span class="payment-edit-check">Set as default address</span></vava-checkbox></div>
        <vava-button class="payment-edit-button" @click="editRessAdd">{{editType==='add'?'ADD ADDRESS':'UPDATE ADDRESS'}}</vava-button>
        <div class="payment-edit-cancel" @click="closeEdit">CANCEL</div>
      </div>
    </transition>
  </div>
</template>
<script>
  import MessageCard from './message-card.vue'
  export default {
    components: { MessageCard },
    props: {
      dataList: Array // 地址列表
    },
    data () {
      return {
        showCard: true, // 是否显示卡片 当直接点击预览时不显示
        addressData: {}, // 编辑卡片数据
        isShowEdit: false, // 是否显示编辑表单
        regionData: [], // 区域数据
        editType: 'add', // 表单编辑类型
        messageBoxOp: { title: '', confirmButtonText: 'Yes', cancelButtonText: 'No', type: 'warning', roundButton: true, center: true, cancelButtonClass: 'cance-confirm-class', confirmButtonClass: 'sure-confirm-class' }
      }
    },
    computed: {
      countryList () {
        return this.$store.state.saleCountry
      }
    },
    mounted () {
      if (this.countryList.length === 0) this.selectShopCountryVo()
    },
    methods: {
      editCard (type, item, showCard) { // 打开表单
        this.editType = type
        this.showCard = !showCard
        this.addressData = type === 'add' ? {} : JSON.parse(JSON.stringify(item))
        if (this.$store.state.accountData.emailAddress && !this.addressData.notificationEmail) this.addressData.notificationEmail = this.$store.state.accountData.emailAddress
        this.isShowEdit = true
        this.$nextTick(() => {
          this.$utils.setScroll(this.$refs.addressEdit.offsetTop)
        })
      },
      showEditCard () { // 提供给父组件调用 重置显示该组件
        this.showCard = true
        this.isShowEdit = false
      },
      closeEdit () {
        this.isShowEdit = false
        this.$nextTick(() => {
          this.$utils.setScroll(this.$refs.addressContent.offsetTop)
        })
      },
      editRessAdd () { // 编辑收货地址 根据editType来区别是添加还是编辑
        let param = JSON.parse(JSON.stringify(this.addressData))
        this.countryList.forEach(ii => {
          if (ii.id === param.countryId) param.countryName = ii.countryName
        })
        this.regionData.forEach(item => {
          if (item.id === param.regionId) param.regionName = item.regionName
        })
        this.$store.dispatch('postFetch', {api: this.editType === 'add' ? 'addressAdd' : 'addressEdit', data: param}).then(data => {
          this.$utils.message('success')
          this.upAddress()
          this.closeEdit()
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      deleteAddress (item) { // 删除收货地址
        this.$confirm('Are you sure you want to delete this shipping address ?', '提示', this.messageBoxOp).then(() => {
          this.$store.dispatch('postFetch', {api: 'deleteAddress', data: [item.addressUuid]}).then(data => {
            this.$utils.message('delete success')
            this.upAddress()
          }).catch(error => {
            this.$utils.showErrorMes(this, error)
          })
        }).catch(() => {
        })
      },
      setDefalut (item) {
        this.$store.dispatch('postByUrl', {api: 'saveDefaultByUuid', data: item.addressUuid}).then(data => {
          this.$utils.message('success')
          this.upAddress()
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      selectCountry (val) { // 根据国家ID获取省份
        this.$store.dispatch('postByUrl', {api: 'getRegion', data: val}).then(data => {
          this.regionData = data
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      upAddress () { // 通知父组件更新列表
        this.$emit('upList')
      }
    }
  }
</script>
<style lang="less" scoped>
  .payment-edit{
    .payment-edit-content{
      display: flex;
      flex-direction: column;
      align-items: center;
      .payment-edit-from{
        width: 47.9vw;
        min-width: 630px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 6.25vw;
        .payment-edit-input{
          width: 100%;
        }
      }
    }
    .payment-edit-default{
      width: 47.9vw;
      min-width: 630px;
      margin-top: 1vw;
      margin-bottom: 2vw;
      .payment-edit-check{ color: @un-font-color; font-size: 0.83vw;}
    }
    .payment-edit-button{
      font-size: 1vw;
    }
    .payment-edit-cancel{
      margin-top: 1vw;
      font-size: 0.833vw;
      color: @base-font-color;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .payment-edit .payment-edit-content{
    .payment-edit-from{
      .el-form-item{
        width: 20.8vw;
        min-width: 300px;
        .el-form-item__label{
          font-size: 0.83vw;
          color: @base-font-color;
          line-height: 2vw;
        }
        .payment-edit-input .el-input__inner{
          height: 3.125vw;
          line-height: 3.125vw;
          border-radius: 1.56vw;
          font-size: 1vw;
          padding: 0 1.45vw;
          color: @un-font-color;
        }
        .el-select{
          .el-input__inner{padding-right: 2.5vw;}
          .el-input__suffix{
            right: 1vw;
            .el-select__caret{
              font-weight: 700;
              color: @base-font-color;
              font-size: 1vw;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
    .payment-edit .payment-edit-default{ margin-bottom: 24px; .payment-edit-check{ font-size: 12px; }}
    .payment-edit .payment-edit-button{ font-size: 13px;}
    .payment-edit .payment-edit-cancel{ font-size: 12px; margin-top: 15px;}
    .payment-edit .payment-edit-content{
      .payment-edit-from{
        .el-form-item{
          .el-form-item__label{
            font-size: 10px;
            line-height: 24px;
          }
          .payment-edit-input .el-input__inner{
            height: 38px;
            line-height: 38px;
            border-radius: 20px;
            font-size: 12px;
            padding: 0 17px;
          }
          .el-select{
            .el-input__inner{padding-right: 30px;}
            .el-input__suffix{
              right: 12px;
              .el-select__caret{
                font-weight: 700;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 650px) {
    .payment-edit .payment-edit-default{ min-width: 100%; }
    .payment-edit .payment-edit-content{
      padding: 0 20px;
      .payment-edit-from{
        width: 100%;
        min-width: auto;
        .el-form-item{ min-width: auto; width: 48%;}
      }
    }
  }
  @media (max-width: 550px) {
    .payment-edit .payment-edit-content{
      padding: 0 20px;
      .payment-edit-from .el-form-item{ width: 100%;}
    }
  }
  @media (max-width: 450px) {
    .payment-edit .payment-edit-content{
      padding: 0 15px;
    }
  }
</style>

<template>
  <div class="address-edit" ref="addressContent">
    <message-card @editCard="editCard" :card-data="dataList" @deleteCard="deleteAddress" @setDefalut="setDefalut" v-if="showCard" :type="1"></message-card>
    <transition name="slide-fade">
      <div class="address-edit-content" v-show="isShowEdit" ref="addressEdit">
        <el-form :model="addressData" class="address-edit-from">
          <el-form-item label="First Name" prop="firstName">
            <el-input v-model="addressData.firstName" class="address-edit-input" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName">
            <el-input v-model="addressData.lastName" class="address-edit-input" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="Country" prop="countryId">
            <el-select v-model="addressData.countryId" class="address-edit-input" placeholder="Please Choose" no-data-text="No Data" @change="selectCountry">
              <el-option v-for="item of countryList" :value="item.id" :label="item.countryName" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="State/Province/Region" prop="regionId">
            <el-select v-model="addressData.regionId" class="address-edit-input" placeholder="Please Choose" no-data-text="No Data">
              <el-option v-for="item of regionData" :value="item.id" :label="item.regionName" :key="item.id" clearable></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="City/Town" prop="city">
            <el-input v-model="addressData.city" class="address-edit-input" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="Address line 1" prop="address1">
            <el-input v-model="addressData.address1" class="address-edit-input" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Address line 2" prop="address2">
            <el-input v-model="addressData.address2" class="address-edit-input" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="Zip/Post Code" prop="zipCode">
            <el-input v-model="addressData.zipCode" class="address-edit-input" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="Notification Email" prop="notificationEmail">
            <el-input v-model="addressData.notificationEmail" class="address-edit-input" maxlength="200"></el-input>
          </el-form-item>
          <el-form-item label="Phone Number" prop="telephone">
            <el-input v-model="addressData.telephone" class="address-edit-input" maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div class="address-edit-default"><vava-checkbox v-model="addressData.isPrimary"><span class="address-edit-check">Set as default address</span></vava-checkbox></div>
        <vava-button class="address-edit-button" @click="editRessAdd">{{editType==='add'?'ADD ADDRESS':'UPDATE ADDRESS'}}</vava-button>
        <div class="address-edit-cancel" @click="closeEdit">CANCEL</div>
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
        this.$store.dispatch('postByUrl', {api: 'saveDefaultAddressByUuid', data: item.addressUuid}).then(data => {
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
  .address-edit{
    .address-edit-content{
      display: flex;
      flex-direction: column;
      align-items: center;
      .address-edit-from{
        width: 47.9vw;
        min-width: 630px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 6.25vw;
        .address-edit-input{
          width: 100%;
        }
      }
    }
    .address-edit-default{
      width: 47.9vw;
      min-width: 630px;
      margin-top: 1vw;
      margin-bottom: 2vw;
      .address-edit-check{ color: @un-font-color; font-size: 0.83vw;}
    }
    .address-edit-button{
      font-size: 1vw;
    }
    .address-edit-cancel{
      margin-top: 1vw;
      font-size: 0.833vw;
      color: @base-font-color;
      text-decoration: underline;
      cursor: pointer;
    }
  }
</style>
<style lang="less">
  .address-edit .address-edit-content{
    .address-edit-from{
      .el-form-item{
        width: 20.8vw;
        min-width: 300px;
        .el-form-item__label{
          font-size: 0.83vw;
          color: @base-font-color;
          line-height: 2vw;
        }
        .address-edit-input .el-input__inner{
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
    .address-edit .address-edit-default{ margin-bottom: 24px; .address-edit-check{ font-size: 12px; }}
    .address-edit .address-edit-button{ font-size: 13px;}
    .address-edit .address-edit-cancel{ font-size: 12px; margin-top: 15px;}
    .address-edit .address-edit-content{
      .address-edit-from{
        .el-form-item{
          .el-form-item__label{
            font-size: 10px;
            line-height: 24px;
          }
          .address-edit-input .el-input__inner{
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
    .address-edit .address-edit-default{ min-width: 100%; }
    .address-edit .address-edit-content{
      padding: 0 20px;
      .address-edit-from{
        width: 100%;
        min-width: auto;
        .el-form-item{ min-width: auto; width: 48%;}
      }
    }
  }
  @media (max-width: 550px) {
    .address-edit .address-edit-content{
      padding: 0 20px;
      .address-edit-from .el-form-item{ width: 100%;}
    }
  }
  @media (max-width: 450px) {
    .address-edit .address-edit-content{
      padding: 0 15px;
    }
  }
</style>

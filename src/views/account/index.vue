<template>
  <div class="account-index">
    <h5>MY ACCOUNT</h5>
    <p>Hi, There !</p>
    <p>{{accountData.emailAddress}}</p>
    <p class="account-log-out"><span @click="logout">LOG OUT</span></p>
    <div class="account-index-card" ref="accountChang">
      <li>
        <div class="icon icon-account-user"></div>
        <p :title="userName">{{userName}}</p>
        <p :title="accountData.emailAddress">{{accountData.emailAddress}}</p>
        <p :title="accountData.phoneNumber || 'PHONE NUMBER'">{{accountData.phoneNumber || 'PHONE NUMBER'}}</p>
        <div class="account-card-edit" @click="showEdit(1)">Edit login information</div>
      </li>
      <li @click="showEdit(3)">
        <div class="icon icon-account-position"></div>
        <p v-if="addressList.length===0">YOU HAVEN’T <br/>ADDED AN <br/>ADDRESS YET.</p>
        <div class="account-index-address" v-else>
          <p class="card-title" :title="addressList[0].firstName+' '+addressList[0].lastName+' '+(addressList[0].isPrimary?'(DEFAULT)':'')">
            {{addressList[0].firstName}} {{addressList[0].lastName}} {{addressList[0].isPrimary?'(DEFAULT)':''}}
          </p>
          <p :title="addressList[0].address1+' '+addressList[0].address2">{{addressList[0].address1+' '+addressList[0].address2}}</p>
          <p :title="`${addressList[0].city}, ${addressList[0].regionName} ${addressList[0].zipCode}`">{{`${addressList[0].city}, ${addressList[0].regionName} ${addressList[0].zipCode}`}}</p>
          <p :title="addressList[0].countryName">{{addressList[0].countryName}}</p>
          <p :title="addressList[0].telephone">{{addressList[0].telephone}}</p>
        </div>
        <div class="account-card-edit" @click.stop="showEdit(5)">Edit address</div>
      </li>
      <!-- <li @click="showEdit(4)">
        <div class="icon icon-account-card"></div>
        <p>YOU HAVEN’T <br/>ADDED A <br/>PAYMENT METHOD YET.</p>
        <div class="account-card-edit" @click.stop="showEdit(6)">Edit payment method</div>
      </li> -->
      <li>
        <div class="icon icon-account-lock"></div>
        <p class="account-lock-title">SECURITY</p>
        <p class="account-lock">Change my password</p>
        <div class="account-card-edit" @click="showEdit(2)">Change Password</div>
      </li>
    </div>
	  <transition name="slide-fade">
      <div class="account-edit" v-show="editType===1||editType===2" ref="changeFrom">
        <ul v-if="editType===1" class="account-edit-account">
          <div class="account-edit-name">
            <li><p>FIRST NAME</p><vava-input v-model="informationData.firstName" class="account-edit-input" maxlength="50"></vava-input></li>
            <li><p>LAST NAME</p><vava-input v-model="informationData.lastName" class="account-edit-input" maxlength="50"></vava-input></li>
          </div>
          <li><p>PHONE</p><vava-input v-model="informationData.phoneNumber" class="account-edit-input" maxlength="20"></vava-input></li>
        </ul>
        <ul v-if="editType===2">
          <div class="account-edit-name">
            <li><p>OLD PASSWORD</p><vava-input v-model="passwordData.oldPassword" type="password" class="account-edit-input" maxlength="50"></vava-input></li>
            <li><p>NEW PASSWORD</p><vava-input v-model="passwordData.newPassword" type="password" class="account-edit-input" maxlength="50"></vava-input></li>
            <li><p>REENTER NEW PASSWORD</p><vava-input v-model="passwordData.reNewPassword" type="password" class="account-edit-input" maxlength="50"></vava-input></li>
          </div>
        </ul>
        <vava-button class="account-edit-button" @click="saveChange">SAVE CHANGE</vava-button>
        <div class="account-edit-cancel" @click="editType=0">CANCEL</div>
      </div>
    </transition>
    <address-edit v-if="editType===3||editType===5" ref="addressEdit" :data-list="addressList" @upList="queryAddress"></address-edit>
    <payment-edit v-if="editType===4||editType===6" ref="paymentEdit" :data-list="creditList" @upList="queryCredit"></payment-edit>
    <!-- 订单列表 -->
    <div class="order_list">
      <OrderComp/>
    </div>
  </div>
</template>

<script>
  import AddressEdit from './address-edit.vue'
  import PaymentEdit from './payment-edit.vue'
  import OrderComp from '../../components/order-comp.vue'
  export default {
    components: { AddressEdit, PaymentEdit, OrderComp },
    data () {
      return {
        editType: 0, // 1修改个人信息  2 修改密码 3 收货地址管理 4 支付管理 5 编辑收货地址预览 6 编辑支付方式预览
        informationData: {
          firstName: '',
          lastName: '',
          phoneNumber: ''
        },
        passwordData: {
          oldPassword: '',
          newPassword: '',
          reNewPassword: ''
        },
        addressList: [], // 地址列表
        creditList: [], // 支付卡片列表
      }
    },
    computed: {
      accountData () {
        return this.$store.state.accountData
      },
      userName () {
        return (this.$store.state.accountData.firstName || this.$store.state.accountData.lastName) ? `${this.$store.state.accountData.firstName}  ${this.$store.state.accountData.lastName}` : 'YOUR NAME'
      }
    },
    beforeMount () {
      if (!this.$store.state.accountData.emailAddress) {
        this.$cookies.get('token') ? this.fecthAccount() : this.$router.push('/login')
      }
      this.queryAddress()
      this.queryCredit()
      this.selectShopCountryVo()
    },
    methods: {
      async fecthAccount () {
        this.$bar.start()
        await this.$store.dispatch('postFetch', {api: 'getMemberInfo'}).then(data => {
          this.$bar.finish()
          this.informationData = data
          this.$store.commit('setAccountData', JSON.parse(JSON.stringify(data.memberInfoBo)))
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000 || error.code === 14001) {
            this.$utils.message(error.message)
            this.$cookies.set('token', '')
            this.$router.push('/login')
          } else {
            this.$utils.showErrorMes(this, error)
          }
        })
      },
      async queryAddress () { // 获取地址列表
        await this.$store.dispatch('postFetch', { api: 'findAddressInfoListVo', data: { pageNo: 1, pageSize: 20, condition: {} } }).then(data => {
          this.addressList = data.records || []
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      async queryCredit () { // 获取支付卡片列表
        await this.$store.dispatch('postFetch', { api: 'findCreditCardInfoListVo', data: { pageNo: 1, pageSize: 20, condition: {} } }).then(data => {
          this.creditList = data.records || []
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      selectShopCountryVo () { // 获取国家列表
        this.$store.dispatch('postFetch', {api: 'selectShopCountryVo'}).then(data => {
          this.$store.commit('setSaleCountry', data)
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      
      saveChange () {
        this.editType == 1 ? this.changeMemberInfo() : this.editType == 2 ? this.changePassword() : ''
      },
      changeMemberInfo () {
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'saveMemberInfo', data: this.informationData}).then(data => {
          this.fecthAccount()
          this.editType = 0
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000 || error.code === 14001) { // token过期或未登陆
            this.$utils.message('Plases login')
            this.logout()
          } else {
            this.$utils.showErrorMes(this, error)
          }
        })
      },
      changePassword () {
        if (!this.$utils.trim(this.passwordData.oldPassword)) {
          this.$utils.message('Old password cannot be empty.')
          return
        }
        if (!this.$utils.trim(this.passwordData.newPassword)) {
          this.$utils.message('New password cannot be empty.')
          return
        }
        if (this.$utils.trim(this.passwordData.newPassword).length < 6) {
          this.$utils.message('Password must not be less than 6 characters.')
          return
        }
        if (!this.$utils.trim(this.passwordData.reNewPassword)) {
          this.$utils.message('Reenter New Password cannot be empty.')
          return
        }
        if (this.$utils.trim(this.passwordData.newPassword) !== this.$utils.trim(this.passwordData.reNewPassword)) {
          this.$utils.message('Reenter New Password is incorrect.')
          return
        }
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'changePassword', data: this.passwordData}).then(data => {
          this.$bar.finish()
          this.editType = 0
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000 || error.code === 14001) {
            this.logout()
          } else {
            this.$utils.showErrorMes(this, error)
          }
        })
      },
      logout () {
        this.$store.commit('setToken', '')
        this.$store.commit('setAccountData', {})
        this.$utils.removeShoppingCart(this.$store.commit) // 清空购物车数据
        this.$router.push('/login')
      },
      showEdit (type) { // 显示对应主卡片详情
        this.editType = type
        if (type === 1) {
          this.informationData.firstName = this.accountData.firstName
          this.informationData.lastName = this.accountData.lastName
          this.informationData.phoneNumber = this.accountData.phoneNumber
        }
        if (type === 2) this.passwordData.oldPassword = this.passwordData.newPassword = this.passwordData.reNewPassword = ''
        this.$nextTick(() => {
          if (type === 3 || (type === 5 && this.addressList.length === 0)) this.$refs.addressEdit.showEditCard() // 当点击卡片或者没有地址时点击任何地方都弹出地址卡片
          if (type === 5 && this.addressList.length > 0) this.$refs.addressEdit.editCard('edit', this.addressList[0], true) // 直接点击概览编辑地址
          if (type === 4 || (type === 6 && this.creditList.length === 0)) this.$refs.paymentEdit.showEditCard() // 当点击卡片或者没有地址时点击任何地方都弹出支付方式管理卡片
          if (type === 6 && this.creditList.length > 0) this.$refs.paymentEdit.editCard('edit', this.creditList[0], true) // 直接点击概览编辑支付管理
          let refs = type === 1 || type === 2 ? this.$refs.changeFrom : type === 3 || type === 5 ? this.$refs.addressEdit.$el : this.$refs.paymentEdit.$el
          this.$utils.setScroll(refs.offsetTop)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .slide-fade-leave-active, .slide-fade-enter-active{
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(100%);
    opacity: 0;
  }
  .account-index{
    width: 100%;
    min-height: 45vw;
    padding: 7.2vw 0 10.4vw 0;
    h5{
      font-size: 2.6vw;
      color: @base-font-color;
      text-align: center;
      margin-bottom: 0.6vw;
      line-height: 1.3;
    }
    p{
      text-align: center;
      color: @un-font-color;
      font-size: 0.83vw;
      line-height: 1.4;
    }
    p.account-log-out{
      color: @base-button-back;
      text-decoration: underline;
      margin-top: 0.5vw;
      span{cursor: pointer;padding: 5px;}
    }
    .account-index-card{
      margin-top: 2vw;
      padding: 0 5.2vw;
      display: flex;
      // justify-content: center;
      flex-wrap: wrap;
      li{
        position: relative;
        width: 20vw;
        min-width: 150px;
        height: 21.875vw;
        min-height: 160px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;
        transition: transform 0.3s, box-shadow 0.3s;
        margin: 0 1vw;
        margin-bottom: 2vw;
        cursor: pointer;
        &:hover{
          box-shadow: rgba(0, 0, 0, 0.25) 0 0 2vw;
        }
        text-align: center;
        padding: 2vw 2vw 5vw 2.4vw;
        .icon{
          font-size: 2.08vw;
          margin-bottom: 1.5vw;
        }
        p{
          font-size: 1.3vw;
          color: @base-font-color;
          font-family: 'avenir-next-demi';
          text-align: left;
          line-height: 1.5;
          margin: 1vw 0;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p.account-lock-title{
          font-size: 1.56vw;
        }
        p.account-lock{
          font-family: 'avenir-next-regular';
        }
        div.account-card-edit{
          text-align: left;
          font-size: @un-font-color;
          font-size: 0.84vw;
          text-decoration: underline;
          cursor: pointer;
          &:hover{color: @base-button-back;}
          position: absolute;
          bottom: 5vw;
        }
        div.account-index-address{
          p{
            margin: 0;
            font-size: 0.8vw;
            line-height: 1.4;
            font-family: 'avenir-next-regular';
          }
          p.card-title{
            margin-bottom: 1vw;
          }
        }
      }
    }
    .account-edit{
      width: 100%;
      padding: 0 10px;
      margin-top: 10.4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      // height: 0;
      ul{
        display: flex;
        flex-direction: column;
        width: 100%;
        div.account-edit-name{
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.04vw;
        }
        li{
          width: 20.8vw;
          margin: 1vw 0;
          min-width: 280px;
          p{
            font-size: 0.84vw;
            color: @base-font-color;
            text-align: left;
            line-height: 2.5;
          }
        }
      }
      ul.account-edit-account{
        width: auto;
        align-items: flex-start;
        div.account-edit-name{
          flex-wrap: nowrap;
          flex-direction: row;
          margin-bottom: 0;
          li:first-child{margin-right: 6.25vw;}
        }
      }
      .account-edit-button{
        margin: 1vw 0 1vw 0;
        padding: 0 1.56vw;
      }
      .account-edit-cancel{
        font-size: 0.84vw;
        color: @base-font-color;
        text-decoration: underline;
        cursor: pointer;
        &:hover{
          color: @base-button-back;
        }
      }
    }
    .collapse-transition{
      transition: .3s height ease-out;
    }
    .order_list {
      width: 100%;
      background: #fafafa;
      padding: 1.2vw 5.2vw 0;
      overflow: hidden;
    }
  }
  @media (max-width: 1450px) {
    .account-index{
      p{font-size: 12px;}
      .account-index-card{
        margin-top: 25px;
        li div.account-card-edit{font-size: 12px;}
        li div.account-index-address p{font-size: 12px;}
      }
      .account-edit{
        ul{
          li{
            p{
              font-size: 12px;
            }
          }
        }
        .account-edit-button{
          padding: 0 20px;
        }
        .account-edit-cancel{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 920px) {
    .account-index{
      h5{font-size: 20px;}
      .account-index-card{
        padding: 0 10px;
        justify-content: center;
        li{
          &:nth-child(2n) { margin-right: 15vw; }
          &:nth-child(2n-1) { margin-left: 15vw; }
          min-width: 191px;
          min-height: 200px;
          padding: 18px 15px 30px 15px;
          div.account-card-edit{bottom: 30px;}
          .icon{font-size: 19px;}
          p{
            font-size: 12px;
          }
          p.account-lock-title{font-size: 14px;}
        }
      }
      .account-edit{
        ul{
          li{
            p{
              font-size: 12px;
            }
            .vava-common-input input{
              padding: 0 20px;
            }
          }
        }
        .account-edit-button{
          margin: 25px 0 15px 0
        }
        .account-edit-cancel{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 650px) {
    .account-index{
      .account-edit ul.account-edit-account{
        width: 100%;
        align-items: center;
        div.account-edit-name{
          flex-wrap: wrap;
          flex-direction: column;
          margin: 0;
          li:first-child{margin-right: 0;}
        }
      }
    }
  }
  @media (max-width: 600px) {
    .account-index .account-index-card li{
      &:nth-child(2n) { margin-right: 8vw; }
      &:nth-child(2n-1) { margin-left: 8vw; }
    }
  }
  @media (max-width: 500px) {
    .account-index .account-index-card li{
      &:nth-child(2n) { margin-right: 3vw; }
      &:nth-child(2n-1) { margin-left: 3vw; }
    }
  }
  @media (max-width: 450px) {
    .account-index{
      .account-index-card{
        li{
          &:nth-child(2n) { margin-right: 0; }
          &:nth-child(2n-1) { margin-left: 0; }
          min-width: 160px;
          min-height: 180px;
          div.account-card-edit{bottom: 30px;}
          p{
            font-size: 12px;
          }
          p.account-lock-title{font-size: 14px;}
          &:hover{transform: scale(1);}
        }
      }
      .account-edit{
        ul{
          position: relative;
          li{
            margin: 10px 0;
            p{
              font-size: 12px;
            }
            .vava-common-input input{
              padding: 0 20px;
            }
          }
        }
        .account-edit-button{
          margin: 15px 0 15px 0
        }
        .account-edit-cancel{
          font-size: 12px;
        }
      }
    }
  }
  @media (max-width: 360px) {
    .account-index{
      .account-index-card{
        li{
          min-width: 145px;
          min-height: 155px;
          div.account-card-edit{bottom: 20px;}
          p{
            font-size: 11px;
          }
          p.account-lock-title{font-size: 13px;}
        }
      }
    }
  }
</style>

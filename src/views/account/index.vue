<template>
  <div class="account-index">
    <h5>MY ACCOUNT</h5>
    <p>Hi, There !</p>
    <p>{{accountData.emailAddress}}</p>
    <p class="account-log-out" @click="logout">LOG OUT</p>
    <div class="account-index-card">
      <li>
        <div class="icon icon-account-user"></div>
        <p>{{userName}}</p>
        <p>{{accountData.emailAddress}}</p>
        <p>{{accountData.phoneNumber || 'PHONE NUMBER'}}</p>
        <div class="account-card-edit" @click="showEdit(1)">Edit login information</div>
      </li>
      <!-- <li>
        <div class="icon icon-account-position"></div>
        <p>YOU HAVEN’T <br/>ADDED AN <br/>ADDRESS YET.</p>
        <div class="account-card-edit">Edit address</div>
      </li>
      <li>
        <div class="icon icon-account-card"></div>
        <p>YOU HAVEN’T <br/>ADDED A <br/>PAYMENT METHOD YET.</p>
        <div class="account-card-edit">Edit payment method</div>
      </li> -->
      <li>
        <div class="icon icon-account-lock"></div>
        <p class="account-lock-title">SECURITY</p>
        <p class="account-lock">Change my password</p>
        <div class="account-card-edit" @click="showEdit(2)">Change Password</div>
      </li>
    </div>
	  <!-- <transition
      v-on:before-enter="itemHidden"
      v-on:enter="itemShow"
      v-on:after-enter="itemShow"
      v-on:before-leave="itemShow"
      v-on:leave="itemHidden"
      v-on:after-leave="itemHidden"
    > -->
	  <transition
      name="slide-fade"
    >
      <div class="account-edit" v-show="isShowEdit">
        <ul v-if="editType===1">
          <div class="account-edit-name">
            <li><p>FIRST NAME</p><vava-input v-model="informationData.firstName" class="account-edit-input"></vava-input></li>
            <li><p>LAST NAME</p><vava-input v-model="informationData.lastName" class="account-edit-input"></vava-input></li>
          </div>
          <li><p>PHONE</p><vava-input v-model="informationData.phoneNumber" class="account-edit-input"></vava-input></li>
        </ul>
        <ul v-if="editType===2">
          <div class="account-edit-name">
            <li><p>OLD PASSWORD</p><vava-input v-model="passwordData.oldPassword" type="password" class="account-edit-input"></vava-input></li>
            <li><p>NEW PASSWORD</p><vava-input v-model="passwordData.newPassword" type="password" class="account-edit-input"></vava-input></li>
          </div>
        </ul>
        <vava-button class="account-edit-button" @click="saveChange">SAVE CHANGE</vava-button>
        <div class="account-edit-cancel" @click="isShowEdit=false">CANCEL</div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShowEdit: false,
        editType: 1, // 1修改个人信息  2 修改密码
        informationData: {
          firstName: '',
          lastName: '',
          phoneNumber: ''
        },
        passwordData: {
          oldPassword: '',
          newPassword: ''
        }
      }
    },
    beforeMount () {
      this.$cookies.get('token') ? this.fecthAccount() : this.$router.push('/login')
    },
    computed: {
      accountData () {
        return this.$store.state.accountData
      },
      userName () {
        return (this.$store.state.accountData.firstName || this.$store.state.accountData.lastName) ? `${this.$store.state.accountData.firstName}  ${this.$store.state.accountData.lastName}` : 'PHONE NUMBER'
      }
    },
    methods: {
      fecthAccount () {
        this.$bar.start()
        this.$store.dispatch('getFetch', {api: 'getMemberInfo'}).then(data => {
          this.$bar.finish()
          this.informationData = data.data
          this.$store.commit('setAccountData', JSON.parse(JSON.stringify(data.data)))
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000) {
            this.$utils.message('Plases login')
            // this.$router.push('/login')
          } else {
            this.$utils.message(error.message)
          }
        })
      },
      saveChange () {
        this.editType == 1 ? this.changeMemberInfo() : this.editType == 2 ? this.changePassword() : ''
      },
      changeMemberInfo () {
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'saveMemberInfo', data: this.informationData}).then(data => {
          this.fecthAccount()
          this.isShowEdit = false
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000) {
            this.$utils.message('Plases login')
            // this.$router.push('/login')
          } else {
            this.$utils.message(error.message)
          }
        })
      },
      changePassword () {
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'changePassword', data: this.passwordData}).then(data => {
          this.$bar.finish()
          this.isShowEdit = false
        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000) {
            this.$utils.message('Plases login')
            // this.$router.push('/login')
          } else {
            this.$utils.message(error.message)
          }
        })
      },
      logout () {
        this.$store.commit('setToken', '')
        this.$router.push('/login')
      },
      showEdit (type) {
        this.isShowEdit = true
        this.editType = type
        if (type === 2) {
          this.passwordData.oldPassword = this.passwordData.newPassword
          this.passwordData.newPassword = ''
        }
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
    min-height: 70%;
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
      cursor: pointer;
    }
    .account-index-card{
      margin-top: 2vw;
      padding: 0 5.2vw;
      display: flex;
      justify-content: center;
      li{
        position: relative;
        width: 20.8vw;
        min-width: 150px;
        height: 21.875vw;
        min-height: 160px;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;
        transition: transform 0.3s;
        &:first-child{margin-right: 2vw;}
        &:hover{transform: scale(1.05);}
        text-align: center;
        padding: 2vw 2vw 6.25vw 2.4vw;
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
          bottom: 6.25vw;
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
        div.account-edit-name{
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 1.04vw;
          li:first-child{
            margin-right: 6.25vw;
          }
        }
        li{
          width: 20.8vw;
          min-width: 180px;
          p{
            font-size: 0.84vw;
            color: @base-font-color;
            text-align: left;
            line-height: 2.5;
          }
        }
      }
      .account-edit-button{
        margin: 2vw 0 1vw 0;
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
  }
  @media (max-width: 1450px) {
    .account-index{
      p{font-size: 12px;}
      .account-index-card{
        margin-top: 25px;
        li div.account-card-edit{font-size: 12px;}
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
        li{
          min-width: 191px;
          min-height: 200px;
          padding: 18px 15px 30px 15px;
          &:first-child{ margin-right: 18px; }
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
  @media (max-width: 450px) {
    .account-index{
      .account-index-card{
        li{
          min-width: 160px;
          min-height: 180px;
          &:first-child{ margin-right: 15px; }
          div.account-card-edit{bottom: 30px;}
          p{
            font-size: 12px;
          }
          p.account-lock-title{font-size: 14px;}
        }
      }
      .account-edit{
        ul{
          li{
            min-width: 150px;
            p{
              font-size: 12px;
            }
            .vava-common-input input{
              padding: 0 20px;
            }
          }
          div.account-edit-name li{&:first-child{margin-right: 10px;}}
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
  @media (max-width: 360px) {
    .account-index{
      .account-index-card{
        li{
          min-width: 150px;
          min-height: 160px;
          &:first-child{ margin-right: 10px; }
          div.account-card-edit{bottom: 20px;}
          p{
            font-size: 11px;
          }
          p.account-lock-title{font-size: 13px;}
        }
      }
      .account-edit{
        padding: 2vw 5px;
        ul{
          li{
            min-width: 150px;
            p{
              font-size: 12px;
            }
            .vava-common-input input{
              padding: 0 20px;
            }
          }
          div.account-edit-name li{&:first-child{margin-right: 5px;}}
        }
        .account-edit-cancel{
          font-size: 12px;
        }
      }
    }
  }
</style>

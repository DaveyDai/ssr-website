<template>
  <div class="account-index">
    <h5>MY ACCOUNT</h5>
    <p>Hi, There !</p>
    <p>visualgasin@foxmail.com</p>
    <p class="account-log-out">LOG OUT</p>
    <div class="account-index-card">
      <li>
        <div class="icon icon-account-user"></div>
        <p>YOUR NAME</p>
        <p>visualgasin@foxmail.com</p>
        <p>PHONE NUMBER</p>
        <div class="account-card-edit">Edit login information</div>
      </li>
      <li>
        <div class="icon icon-account-position"></div>
        <p>YOU HAVEN’T <br/>ADDED AN <br/>ADDRESS YET.</p>
        <div class="account-card-edit">Edit address</div>
      </li>
      <li>
        <div class="icon icon-account-card"></div>
        <p>YOU HAVEN’T <br/>ADDED A <br/>PAYMENT METHOD YET.</p>
        <div class="account-card-edit">Edit payment method</div>
      </li>
      <li>
        <div class="icon icon-account-lock"></div>
        <p class="account-lock-title">SECURITY</p>
        <p class="account-lock">Change my password</p>
        <div class="account-card-edit">Change Password</div>
      </li>
    </div>
    <div class="account-edit">
      <ul>
        <li>
          <p>FIRST NAME</p>
          <vava-input></vava-input>
        </li>
        <li>
          <p>LAST NAME</p>
          <vava-input></vava-input>
        </li>
        <li>
          <p>PHONE</p>
          <vava-input></vava-input>
        </li>
      </ul>
      <vava-button>SAVE CHANGE</vava-button>
      <div class="account-edit-cancel">CANCEL</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    mounted () {
      this.fecthAccount()
    },
    computed: {
      accountData () {
        return this.$store.state.accountData
      }
    },
    methods: {
      fecthAccount () {
        this.$bar.start()
        this.$store.dispatch('getFetch', {api: 'getMemberInfo'}).then(data => {
          this.$bar.finish()

        }).catch(error => {
          this.$bar.finish()
          if (error.code === 14006 || error.code === 14000) {
            this.$utils.message('Plases login')
            // this.$router.push('/login')
          } else {
            this.$utils.message(error.message)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
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
    }
    .account-index-card{
      margin-top: 2vw;
      padding: 0 5.2vw;
      display: flex;
      justify-content: space-between;
      li{
        position: relative;
        width: 20.8vw;
        height: 21.875vw;
        box-shadow: rgba(0, 0, 0, 0.1) 0 0 2vw;
        transition: transform 0.3s;
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
      padding: 2vw 10px;
      margin-top: 10.4vw;
      display: flex;
      justify-content: center;
    }
  }
</style>

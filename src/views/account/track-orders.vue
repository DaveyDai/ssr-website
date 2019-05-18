<template>
  <div class="track">
    <h5>Track Order</h5>
    <div class="track_order">
      <ul>
        <li>
          <p>Order Info</p>
          <small>Enter Order ID and the billing email address to track</small>
        </li>
        <li :class="infoError.idError ? 'error': ''">
          <span>Order ID</span>
          <input type="text" v-model="id" @focus="inputFocus('idError')" :placeholder="isPc ? '' : 'Order ID'">
          <u>{{infoError.idError}}</u>
        </li>
        <li :class="infoError.emailError ? 'error': ''">
          <span>Email Address</span>
          <input type="text" v-model="email" @focus="inputFocus('emailError')" :placeholder="isPc ? '' : 'Email Adress'">
          <u>{{infoError.emailError}}</u>
        </li>
        <li>
          <button @click="goContinue">Continue</button>
        </li>
      </ul>
      <span class="track_pc"></span>
      <p class="track_m">or</p>
      <div>
        <p>Exsiting Customers</p>
        <small>Log in to check order details</small>
        <router-link to="/login">Sign In</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoError: {
        idError: '',
        emailError: ''
      },
      id: '',
      email: '',
      isPc: true
    }
  },
  mounted() {
    if (typeof window !== 'undefined') {
      window.document.getElementsByTagName('html')[0].scrollTop = 0
      try {window.scrollTo(0,0)}catch(e){console.log(e)}
    }
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) this.isPc = false
  },
  methods: {
    inputFocus(type) {
      this.infoError[type] = ''
    },
    goContinue() {
      let err1 = 'Must be entered'
      if (!this.$utils.trim(this.id)) {
        this.infoError.idError = err1
        return
      }
      if (!this.$utils.trim(this.email)) {
        this.infoError.emailError = err1
        return
      }
      if (!this.$utils.validateEmail(this.$utils.trim(this.email))) {
        this.infoError.emailError = 'Invalid email address'
        return
      }
      let dataObj = {
        orderNo: this.$utils.trim(this.id),
        email: this.$utils.trim(this.email)
      }
      this.$store.dispatch('postFetch', {api: 'getOrderDetails', data: dataObj}).then(data => {
        this.$router.push({path: '/view-details',query: dataObj})
      }).catch(error => {
        this.$utils.showErrorMes(this, error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .track {
    overflow: hidden;
    h5 {
      font-size: 1.5vw;
      color: #333;
      text-align: center;
      margin-top: 2.5vw;
      font-weight: 400;
    }
    .track_order {
      display: flex;
      justify-content: space-between;
      height: fit-content;
      margin: 2.5vw 5.2vw;
      ul {
        width: 28.5vw;
        li:last-of-type {
          margin-top: 0;
        }
        li {
          margin-top: 2vw;
          position: relative;
          > span {
            display: block;
            margin-left: 0.8vw;
            margin-bottom: 10px;
          }
          > span::after {
            content: '*';
            color: #E61515;
          }
        }
        .error {
          input {
            border: 1px solid #E61515;
          }
        }
        input {
          padding: 0.8vw;
          width: 100%;
          height: 2.58vw;
          border-radius: 1.79vw;
          border: 1px solid #e0e0e0;

        }
        u {
          display: block;
          position: absolute;
          text-decoration: none;
          font-size: 13px;
          color: #E61515;
          bottom: -18px;
          left: 0.8vw;
        }
      }
      > span {
        display: block;
        width: 1px;
        background: #e0e0e0;
        margin: 0.8vw 0;
        box-sizing: border-box;
      }
      > .track_pc {
        display: block
      }
      > .track_m {
        display: none;
      }
      > div {
        width: 28.5vw;
      }
      p {
        font-size: 1.1vw;
        color: #333;
        margin-left: 0.8vw;
        font-weight: 500;
        margin-bottom: 3px;
      }
      small {
        font-size: 0.9vw;
        color: #666;
        margin-left: 0.8vw;
      }
    }
    button,a {
      display: block;
      width: 100%;
      height: 2.58vw;
      line-height: 2.58vw;
      text-align: center;
      background: #5D4297;
      color: #fff;
      font-size: 1.1vw;
      border-radius: 1.79vw;
      margin-top: 2vw;
      cursor: pointer;
    }
  }
  @media (max-width: 1200px) {
    .track {
      h5 {
        font-size: 15px;
        margin-top: 25px;
      }
      .track_order {
        margin-top: 25px;
        margin: 25px 5.2vw;
        ul {
          width: 340px;
          li {
            margin-top: 20px;
            > span {
              margin-left: 8px;
            }
          }
          input {
            padding: 8px;
            height: 30px;
            border-radius: 15px;
          }
          u {
            left: 8px;
          }
        }
        > span {
          margin: 8px 0;
        }
        > div {
          width: 340px;
        }
        p {
          font-size: 14px;
          margin-left: 8px;
        }
        small {
          font-size: 12px;
          margin-left: 8px;
        }
      }
      button,a {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border-radius: 15px;
        margin-top: 20px;
      }
    }
  }
  @dw: 1/7.5vw;
  @media (max-width: 820px) {
    .track {
      h5 {
        font-size: @dw*40;
      }
      .track_order {
        margin: @dw*50;
        display: block;
        p {
          font-size: @dw*30;
          margin-bottom: @dw*10;
        }
        small {
          font-size: @dw*26;
        }
        input {
          width: 100%;
          height: @dw*90;
          padding: @dw*10;
        }
        ul {
          width: 100%;
          input {
            width: 100%;
            height: @dw*90;
            padding: @dw*20;
            border-radius: @dw*45;
          }
          li {
            span {
              display: none;
            }
          }
          li:nth-of-type(2) {
            margin-top: @dw*50;
          }
          u {
            left: @dw*20;
          }
          
        }
        > div {
          width: 100%;
        }
        > span {
          width: 100%;
          height: 1px;
          margin: 20px 0;
        }
        > .track_pc {
          display: none;
        }
        > .track_m {
          display: block;
          text-align: center;
          margin-bottom: @dw*50;
          font-size: @dw*30;
          color: #666;
          position: relative;
        }
        > .track_m::before,> .track_m::after {
          display: block;
          content: '';
          width: 42%;
          height: 1px;
          background: #e7e7e9;;
          position: absolute;
          top: @dw*15;
        }
        > .track_m::before {
          left: 0;
        }
        > .track_m::after {
          right: 0;
        }
      }
    }
    .track button, .track a {
      width: 100%;
      height: @dw*90;
      line-height: @dw*90;
      border-radius: @dw*45;
      font-size: @dw*32;
      margin: @dw*50 0;
    }
  }
</style>
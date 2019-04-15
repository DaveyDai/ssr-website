<template>
  <div class="support-influencer">
    <img class="support-influencer-img" src="/static/website-imgages/support/Influencer Banner.jpg">
    <div class="influencer-header">
      <h5>VAVA INFLUENCER</h5>
      <p class="title-p">Become an influencer, and connect with VAVA.</p>
      <p>We understand how much influencers mean to us in elevating our brand and engaging customers. That’s why we’d like to work with you to build a better future for every one of us together.</p>
    </div>
    <div class="influencer-content">
      <h5>SIGN UP | APPLICATION</h5>
      <p>Apply to become a VAVA social media influencer</p>
      <div class="influencer-content-from">
        <div class="influencer-from-left">
          <div class="influencer-from-title">INTEREST</div>
          <div class="influencer-from-p">PICK YOUR TOPICS</div>
          <div class="influencer-from-item">
            <div v-for="(item,index) of influencerData.topics" @click="item.active = !item.active" :class="{'active': item.active}" :key="index" class="influencer-from-button">{{item.dicName}}</div>
          </div>
          <div class="influencer-from-p">YOUR CHANNELS</div>
          <div class="influencer-from-item">
            <div v-for="(item,index) of influencerData.media" @click="item.active = !item.active" :class="{'active': item.active}" :key="index" class="influencer-from-button">{{item.dicName}}</div>
          </div>
        </div>
        <div class="influencer-from-right">
          <div class="influencer-from-title">PERSONAL INFORMATION</div>
          <div class="influencer-from-item">
            <div class="influencer-from-p"><p>FIRST NAME</p><vava-input class="influencer-from-input" v-model="submitData.firstName" maxlength="50"></vava-input></div>
            <div class="influencer-from-p"><p>LAST NAME</p><vava-input class="influencer-from-input" v-model="submitData.lastName" maxlength="50"></vava-input></div>
            <div class="influencer-from-p"><p>EMAIL ADDRESS</p><vava-input class="influencer-from-input1" v-model="submitData.emailAddress" maxlength="200"></vava-input></div>
            <!-- <div class="influencer-from-p"><p>COUNTRY</p><vava-input class="influencer-from-input1" v-model="submitData.countryCode"></vava-input></div> -->
            <div class="influencer-from-p"><p>COUNTRY</p><vava-select class="influencer-from-input1" v-model="submitData.countryCode" :select-data="countryList"></vava-select></div>
          </div>
        </div>
      </div>
      <div class="influencer-submit"><vava-button @click="submitInformation">SUBMIT</vava-button></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        influencerData: {
          topics: [
            {dicName: 'TECH & ELECTRONICS', active: false},
            {dicName: 'BEAUTY & FASHION', active: false},
            {dicName: 'SPORTS & OUTDOOR', active: false},
            {dicName: 'MUSIC LIFESTYLE', active: false},
            {dicName: 'OTHER', active: false}
          ],
          media: [
            {dicName: 'FACEBOOK', active: false},
            {dicName: 'TWITTER', active: false},
            {dicName: 'BLOG', active: false},
            {dicName: 'YOUTUBE', active: false},
            {dicName: 'INSTAGRAM', active: false},
            {dicName: 'FORUM', active: false},
            {dicName: 'OTHER', active: false}
          ]
        },
        submitData: {
          emailAddress: '',
          firstName: '',
          lastName: '',
          countryCode: '',
          interestCode: '',
          channelsCode: ''
        },
        selectData: ['UNITED STATES', 'CHINA', 'JAPAN', 'GERMANY', 'FRANCE', 'UK', 'CANADA']
      }
    },
    computed: {
      countryList () {
        return this.$store.state.dicTreeList.countryList
      }
    },
    mounted () {
      this.submitData.countryCode = this.countryList[0].dicExtra
    },
    methods: {
      submitInformation () {
        if (!this.$utils.trim(this.submitData.firstName)) {
          this.$utils.message('Please enter your first name.')
          return
        }
        if (!this.$utils.trim(this.submitData.lastName)) {
          this.$utils.message('Please enter your last name.')
          return
        }
        if (!this.$utils.trim(this.submitData.emailAddress)) {
          this.$utils.message('Please enter your Email address.')
          return
        }
        if (!this.$utils.validateEmail(this.submitData.emailAddress)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        if (!this.$utils.trim(this.submitData.countryCode)) {
          this.$utils.message('Please enter your user Country.')
          return
        }
        let interestCode = []
        let channelsCode = []
        for (let i = this.influencerData.topics.length; i--;) if (this.influencerData.topics[i].active) interestCode.push(this.influencerData.topics[i].dicName)
        for (let i = this.influencerData.media.length; i--;) if (this.influencerData.media[i].active) interestCode.push(this.influencerData.media[i].dicName)
        this.submitData.interestCode = interestCode.join(',')
        this.submitData.channelsCode = channelsCode.join(',')
        this.$bar.start()
        this.$store.dispatch('postFetch', {api: 'saveTouristsInfoVo', data: this.submitData}).then(data => {
          this.$utils.message('Submit Success.')
          this.$bar.finish()
        }).catch (error => {
          this.$utils.message(error.message || 'Fail')
          this.$bar.finish()
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .support-influencer{
    width: 100%;
    .support-influencer-img{
      width: 100%;
      min-height: 35vw;
    }
    h5{font-size: 2.6vw;color: @base-font-color;margin-bottom: 1vw;text-align: center;}
    p{
      font-size: 1.56vw;
      color: @un-font-color;
      text-align: center;
      line-height: 1.5;
    }
    .influencer-header{
      background-color: #FAFAFA;
      padding: 5.2vw 2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      p{max-width: 73vw;}
      p.title-p{margin-bottom: 2vw;}
    }
    .influencer-content{
      padding: 10.4vw 0;
      .influencer-content-from{
        margin-top: 4vw;
        width: 100%;
        padding: 0 9.89vw;
        display: flex;
        justify-content: space-between;
        line-height: 1.5;
        .influencer-from-title{
          font-size: 1vw;
          color: @base-font-color;
          font-family: 'avenir-next-demi';
        }
        .influencer-from-p{
          font-size: 0.83vw;
          color: @base-font-color;
          line-height: 2;
        }
        .influencer-from-left{
          width: 33.3vw;
          margin-right: 5.2vw;
          flex-shrink: 0;
          .influencer-from-item{
            margin-top: 1vw;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .influencer-from-button{
              width: 15.625vw;
              height: 3.125vw;
              min-height: 35px;
              min-width: 140px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1vw;
              color: @base-font-color;
              border-radius: 10vw;
              border: 0.052vw solid #e2e2e2;
              margin-bottom: 1vw;
              cursor: pointer;
            }
            div.active{
              border-color: @base-button-back;
              background: rgba(98, 68, 187, .2);
            }
          }
        }
        .influencer-from-right{
          width: 41.66vw;
          flex-shrink: 0;
          .influencer-from-item{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .influencer-from-p{
              margin-bottom: 1.8vw;
              p{font-size: 0.83vw;color: @base-font-color;text-align: left;margin-bottom: 0.5vw;}
              .influencer-from-input{
                width: 19.8vw;
                min-width: 140px;
                input{padding: 0 20px;}
              }
              .influencer-from-input1{
                width: 41.66vw;
                min-width: 280px;
                input{padding: 0 20px;}
              }
            }
          }
        }
      }
      .influencer-submit{
        width: 100%;
        text-align: center;
        margin-top: 4vw;
      }
    }
  }
  @media (max-width: 1250px) {
    .support-influencer .influencer-content .influencer-content-from{
      .influencer-from-title{font-size: 13px;}
      .influencer-from-p{font-size: 12px;}
      .influencer-from-left .influencer-from-item .influencer-from-button{font-size: 12px;border-width: 1px;}
    }
  }
  @media (max-width: 920px) {
    .support-influencer{
      .influencer-content{
        .influencer-content-from{
          padding: 0 20px;
          flex-direction: column;
          align-content: center;
          .influencer-from-left{
            width: 100%;
            margin-right: 0;
            margin-bottom: 25px;
            .influencer-from-item{
              margin-top: 0.5vw;
              justify-content: flex-start;
              .influencer-from-button{
                width: 15.625vw;
                margin-right: 15px;
                margin-bottom: 10px;
              }
            }
          }
          .influencer-from-right{
            width: 100%;
            .influencer-from-item{
              justify-content: flex-start;
              .influencer-from-p{
                margin-bottom: 15px;
                p{font-size: 12px;margin-top: 5px;}
                .influencer-from-input{
                  width: 25vw;
                  margin-right: 10px;
                }
                .influencer-from-input1{
                  width: 50vw;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 770px) {
    .support-influencer{
      h5{font-size: 20px;}
      p{font-size: 12px;}
      .influencer-header{
        p{max-width: 90vw;}
      }
      .influencer-content{
        .influencer-content-from{
          padding: 0 10px;
          flex-direction: column;
          align-content: center;
          .influencer-from-left{
            width: 100%;
            margin-right: 0;
            margin-bottom: 25px;
            .influencer-from-item{
              margin-top: 0.5vw;
              justify-content: flex-start;
              .influencer-from-button{
                margin-right: 10px;
              }
            }
          }
          .influencer-from-right{
            width: 100%;
            .influencer-from-item{
              justify-content: flex-start;
              .influencer-from-p{
                margin-bottom: 15px;
                p{font-size: 12px;margin-top: 5px;}
                .influencer-from-input{
                  width: 30vw;
                  margin-right: 10px;
                }
                .influencer-from-input1{
                  width: 70vw;
                }
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 600px) {
    .support-influencer .influencer-content .influencer-content-from .influencer-from-left .influencer-from-item .influencer-from-button{
      width: 29vw;
      min-width: 150px;
    }
  }
  @media (max-width: 500px) {
    .support-influencer .influencer-content .influencer-content-from .influencer-from-left .influencer-from-item .influencer-from-button{
      min-width: 140px;
    }
  }
  @media (max-width: 470px) {
    .support-influencer .influencer-content .influencer-content-from .influencer-from-left .influencer-from-item .influencer-from-button{
      min-width: 170px;
    }
  }
  @media (max-width: 400px) {
    .support-influencer .influencer-content .influencer-content-from .influencer-from-left .influencer-from-item .influencer-from-button{
      min-width: 140px;
    }
  }
</style>

<template>
  <div v-loading.fullscreen.lock="isLoading">
    <div class="social-login-content">
      <span class="line-title">
        or sign in with
      </span>
      <ul>
        <li class="facebook" v-if="showFb" @click="loginFb"><i class="icon icon-facebook"></i></li>
        <!-- <li class="google" v-if="showGoogle" @click="gLogin" id="customBtn"><i class="iconfont icon-google"></i></li> -->
        <li class="amazon" v-if="showAmazon" @click="aLogin"><img src="@/assets/images/amazon.png" alt=""></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'; // 请求插件
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'brand',
        'brandId',
        'lang',
        'langId'
      ])
    },
    data() {
      return {
        ucUrl: 'https://customer.sunvalleytek.com/v1',
        client_type: 'APP',
        auth2: '',
        isLoading: false
      }
    },
    props: {
      showFb: {
        type: Boolean,
        default: true
      },
      showGoogle: {
        type: Boolean,
        default: true
      },
      showAmazon: {
        type: Boolean,
        default: true
      },
    },
    mounted() {
      if (this.showFb) {
        // 加载fb
        this.loadFb()
      }
      // if (this.showGoogle) {
      //   this.gLogin();
      // }
      //亚马逊登录
      window.onAmazonLoginReady = function() {
          amazon.Login.setClientId('amzn1.application-oa2-client.ecc784b126904e6bb6a8c56b251b166b');
      };
      (function(d) {
          var a = d.createElement('script'); a.type = 'text/javascript';
          a.async = true; a.id = 'amazon-login-sdk';
          a.src = 'https://api-cdn.amazon.com/sdk/login1.js';
          //d.getElementById('amazon-root').appendChild(a);
          var s1 = d.getElementsByTagName('head')[0];
          s1.appendChild(a);
      })(document);
      //谷歌验证

    },
    methods: {
      getAccessToken: function() {
        var self = this;
        var token = self.getStoreExp('accessToken');
        if(token == ''){
            self.refreshAccessToken();
        }else {
            return token;
        }
      },
      getStoreExp: function(key){
        var exp = 7000000;
        var data = localStorage.getItem(key);
        if(!data){
            return '';
        }
        var dataObj = JSON.parse(data);
        if (new Date().getTime() - dataObj.time > exp) {
            return '';
        }else{
            //return JSON.parse(dataObj.data);
            return dataObj.data;
        }
      },
      setStoreExp: function(key,value){
        var curTime = new Date().getTime();
        localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
      },
      refreshAccessToken() {
        var self = this;
        var obj = {"clientId": "72ab52a28ec54340c5ab4d9e4bd5f56f","clientSecret": "f7c1b83e31255ebb5290a3611244d644","grantType": "pcCredential"}
        axios({
            url: this.ucUrl + '/security/oauth/accesstoken?brand='+ self.brand +'&lang=en&accessToken=0&timeStamp=' + self.getTimeStamp() + '&clientType=' + self.client_type,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(obj)
        }).then((response) => {
          self.setStoreExp('accessToken',response.data.accessToken);
        }).catch((error) => {
          console.log(error)
        });
      },
      getTimeStamp: function(){
        var self = this;
        return self.dateFormat(new Date, 'yyyyMMddhhmmss');
      },
      dateFormat: function(time, fmt) { //author: meizz 
        if(time == null || time == ""){
            return "";
        }
        else
        {
            var date = new Date(time);
            var o = { 
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时 
                "m+" : date.getMinutes(),                 //分 
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度 
                "S"  : date.getMilliseconds()             //毫秒
            }; 
            if(/(y+)/.test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
            for(var k in o) 
                if(new RegExp("("+ k +")").test(fmt)) 
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));

            return fmt;
        }
      },
      aLogin:function () {
        var self=this;
        amazon.Login.authorize({ scope : 'profile', response_type : 'code', state: this.getAccessToken()  }, (response) => {
          if (response.error){
            alert('oauth error ' + response.error); return;
          }
          // 登录
          this.isLoading = true
          this.$jsonp(`https://customer.sunvalleytek.com/noaccount/amazon/login`, {
            callbackName: 'loginCallback',
            "code":response.code,
            "brandName":'taotronics',
            "brandId": 2,
            "langId": 1,
            "originalSource": "amazon"
          }).then(async (res) => {
            if (res && res.email) {
              // {"backto":"/","SUCCESS":true,"email":"amazon-affiliate@sunvalley.com.cn"}
              await this.getAccountToken(res.email)
            } else {
              this.isLoading = false
            }
          }).catch((error) => {
            console.log('fail')
            this.isLoading = false
          });
        });
        return false;
      },
      gLogin:function () {
        var self=this;
        gapi.load('auth2', () => {
          gapi.auth2.init({
            client_id: '614317980690-ktopocq227l2tqbg9rjiq8jg249a8lac.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
          }).attachClickHandler(document.getElementById('customBtn'), {},
            (googleUser) => {
              var profile = googleUser.getBasicProfile();
              var authProfile = googleUser.getAuthResponse();
              if (profile.wea) {
                self.firstName = profile.wea;
              }
              if (profile.ofa) {
                self.lastName = profile.ofa;
              }
              this.isLoading = true
              // 登录
              this.$jsonp(`https://customer.sunvalleytek.com/noaccount/google/login`, {
                "idToken": authProfile.id_token,
                "userType": '3',
                "brandId": 2, 
                "brand": "TaoTronics", 
                "langId": 1, 
                "langCode": "en",
                "originalSource":"google"
              }).then(async (res) => {
                if (res && res.email) {
                  // {"backto":"/","SUCCESS":true,"email":"amazon-affiliate@sunvalley.com.cn"}
                  await this.getAccountToken(res.email)
                } else {
                  this.isLoading = false
                }
              }).catch((error) => {
                console.log('fail')
                this.isLoading = false
              });
            }, function(error) {
                // alert(JSON.stringify(error, undefined, 2));
            });
        });
      },
      loginFb() {
        FB.login((response) => {
          this.statusChangeCallback(response);
        },{scope: 'public_profile,email'});
      },
      /**
       * [loadFb 初始化加载fb]
       * @author napier 2019-01-15
       */
      async loadFb () {
        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        // 加载fb
        window.fbAsyncInit = function() {
          FB.init({
            // 待申请
            appId: '353041842200910', // facebook APP id  // 新
            // appId: 149074655701825,
            cookie: true,
            xfbml: true,
            version: 'v3.0'
          });
          FB.AppEvents.logPageView();
        };
      },
      // fb 的登陆状态
      statusChangeCallback(response) {
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          this.fbLoginSuccess();
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          //document.getElementById('status').innerHTML = 'Please log '	+ 'into this app.';
          console.log('Please log ' + 'into this app.');
          this.loginFb();
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
          //document.getElementById('status').innerHTML = 'Please log '	+ 'into Facebook.';
          console.log('Please log ' + 'into Facebook.');
          this.loginFb();
        }
      },
      // 登陆fb
      fbLoginSuccess() {
        FB.api('/me?fields=id,name,email,gender,first_name,last_name', (response) => {
          //response: {"id":"541249856352040","name":"You Shuo","email":"napierandzk@gmail.com","first_name":"You","last_name":"Shuo"}
          var jsonData = { 
            'userId': response.id, 
            'name': response.name,
            'email': response.email,
            'gender': response.gender,
            'firstName': response.first_name,
            'lastName': response.last_name,
            'originalSource': 'facebook'
          };
          var jsonStr = JSON.stringify(jsonData);
          this.isLoading = true
          this.$jsonp(`https://customer.sunvalleytek.com/noaccount/facebook/login`, {
            callbackName: 'loginCallback',
            "jsonData":jsonStr,
            "brandId": 2,
            "brand": "TaoTronics",
            "langId": this.langId,
            "langCode": this.lang
          }).then(async(res) => {
            // res: {"backto":"/","SUCCESS":true,"email":"napierandzk@gmail.com"}
            if (res) {
              if (res.email) {
                // {"backto":"/","SUCCESS":true,"email":"amazon-affiliate@sunvalley.com.cn"}
                await this.getAccountToken(res.email)
              } else {
                this.$vueOnToast.pop({
                  type: 'warning',
                  title: 'Login error!',
                  body: 'Your FB account does not contain email information.',
                  timeout: 5000
                })
                this.isLoading = false
              }
            } else {
              this.isLoading = false
            }
          }).catch(() => {
            console.log('fail')
            this.isLoading = false
          })
        });
      },
      /**
       * [getAccountToken 获取token]
       * @author luke 2018-12-14
       * @return {[type]} [description]
       */
      async getAccountToken (email) {
        // 如果没有登录获取userAuthToken
        if (email) {
          let accountObj = {
            api: 'getAccount',
            data: {
              'accountEmail': email,
              'brand': 'RAVPower',
              'brandId': 1,
              'langId': 1,
              'originalSource': 'shopOrder'
            }
          }
          let account = await this.$store.dispatch('FETCH_POST_ALL', accountObj)
          const userAuthToken = account.payload.data.userAuthToken;
          this.$cookie.set('userAuthToken', userAuthToken);
          // 三方登录成功
          this.$emit('loginSuccess')
        }
      },
    }
  }
</script>

<style lang="less" scoped>
.social-login-content{
  margin-top: 26px;
  padding: 30px 0 0;
  border-top: 1px solid #EEEEEE;
  position: relative;
  span.line-title{
    position: absolute;
    display: block;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    font-family: SFCompactDisplay-Regular;
    font-size: 14px;
    color: #999999;
    line-height: 16px;
    background-color: white;
    padding: 0 5px;
    margin-top: -1px;
  }
  ul{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    li{
      width: 32px;
      height: 32px;
      background: #F1F1F1;
      border-radius: 50%;
      margin: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &.facebook{
        .icon{
          font-size: 22px;
          color: #3C5999;
          margin-left: 2px;
        }
      }
      &.google{
        .icon{
          font-size: 21px;
          color: #DB4337;
          margin-top: 1px;
          margin-left: 1px;
        }
      }
      &.amazon{
        overflow: hidden;
        img{
          width: 32px;
        }
      }
    }
  }
}
</style>
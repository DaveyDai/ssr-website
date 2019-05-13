<template>
  <div class="payAddrDetail">
    <!-- 订单确认页内地址填写页 -->
    <address-item  @newAddress="showAddress" v-if="updateRess" :updateRess="updateRess">
    </address-item>
  </div>
</template>

<script>
  import address from './address-edit.vue'
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
        selAddress: {}, // 选中的地址列表
        updateRess: {}, // 修改地址对象
        userAuthToken: '',
        type: '',
        email: ''
      }
    },
    async mounted() {
      await this.$store.dispatch('fetchIsLogin');
      this.userAuthToken = this.$cookie.get('userAuthToken');
      await this.init();
    },
    methods: {
      // 获取要编辑的地址
      async init() {
        const editId = this.$route.query.editId
        if (this.isLogin && editId) {
          // 获取地址列表
          let obj = {
            api: 'getAddressList',
            data: {
              userAuthToken: this.userAuthToken
            }
          }
          const json = await this.$store.dispatch('FETCH_ADDRESS_ALL', obj)
          if (json && json.payload && json.payload.data && Array.isArray(json.payload.data) && json.payload.data.length > 0) {
            let dataList = json.payload.data
            const addrInfo = dataList.filter(item => item.id === Number(editId))
            this.updateRess = addrInfo[0]
          }
        } else if (!this.isLogin) {
          this.updateRess = JSON.parse(localStorage.getItem('currentAddrInfo')) || {}
        }
      },
      /**
       * [showAddress 地址点击确认之后执行]
       * @author luke 2018-12-13
       * @param  {[type]} form [地址对象]
       */
      async showAddress (form) {
        // 登陆了才保存地址
        if (this.isLogin) {
          // 保存地址
          await this.saveAddress(form);
          this.$router.go(-1)
        } else {
          // 选择地址
          this.$seoFn.onCheckoutOption(2, 'checkoutOption');
          this.$router.go(-1)
          // 没有登录
          this.selAddress = form;
          localStorage.setItem('currentAddrInfo', JSON.stringify(this.selAddress))
        }
        
      },
      /**
       * [saveAddress 登陆之后要保存地址]
       * @author luke 2018-12-14
       */
      async saveAddress (form) {
        form.userAuthToken = this.userAuthToken;
        let api = 'editAddress'
        if (form.id === '' || form.id === undefined || form.id === null) {
          api = 'addAddress'
          if (form.active === 1) {
            form.id = -1
            await this.updateAddress(form)
          }
        } else {
          if (form.active === 1) {
            await this.updateAddress(form)
          }
        }
        let obj = {
          api: api,
          data: form
        }
        await this.$store.dispatch('FETCH_POST_ALL', obj);
      },
      async updateAddress(form) {
        let obj = {
          api: 'updateActive',
          data: {
            userAuthToken: this.userAuthToken,
            id: form.id
          }
        }
        await this.$store.dispatch('UPDATE_ADDRESS', obj);
      },
      /**
       * [getInAddress 获取登陆]
       * @author luke 2018-12-15
       */
      async getAddressList () {
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
            this.addressList = dataList
          }
        }).catch(error => {
          this.$vueOnToast.pop('error', error)
        });
      },
    },
    components: {
      'address-item': address
    }
  }
</script>

<style lang="less" scoped>
.payAddrDetail{
  padding-bottom: 120px;
}
</style>
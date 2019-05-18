<template>
  <div class="payAddrDetail">
    <!-- 订单确认页内地址填写页 -->
    <address-item  @newAddress="changeAddress" :default-address="selAddress" :is-cancel="!!selAddress.firstName">
    </address-item>
  </div>
</template>

<script>
  import address from './address-edit.vue'
  export default {
    components: { 'address-item': address },
    computed: {
    },
    data() {
      return {
        selAddress: this.$store.state.selAddress || {}, // 选中的地址列表
        inAddressList: this.$store.state.inAddressList || [],
      }
    },
    methods: {
      changeAddress (addressData) {
        if (this.$cookies.get('token')) {
          this.loginSaveAddress(addressData)
        } else {
          this.selAddress = addressData
          this.$store.commit('setSelAddress', this.selAddress) // 保存选中的地址
          this.$router.push('/pay-m/')
        }
      },
      loginSaveAddress (addressData) { // 登陆状态 编辑地址点击保存处理方法
        this.$store.dispatch('postFetch', {api: addressData.addressUuid ? 'addressEdit' : 'addressAdd', data: addressData}).then(data => {
          this.selAddress.addressUuid = addressData.addressUuid || data // 设置收货地址uuid
          Object.assign(this.selAddress, addressData)
          this.inAddressList.push(this.selAddress) // 添加到地址列表供用户选择
          this.$store.commit('setInAddressList', this.inAddressList) // 保存地址列表
          this.$store.commit('setSelAddress', this.selAddress) // 保存选中的地址
          this.$router.push(`/pay-m?addressUuid=${this.selAddress.addressUuid}`)
        }).catch(error => {
          // 即时报错也不中断用户购买流程
          // this.changeAddress(addressData)
          this.$message.error(error)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.payAddrDetail{
  padding-bottom: 120px;
}
</style>
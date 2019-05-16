<template>
  <div class="shopping-customer-mobile">
    <keep-alive>
      <component :is="getCurrentView"></component>
    </keep-alive>
  </div>
</template>
<script>
  import CustomerGuest from './customer-guest.vue'
  import CustomerLogin from './customer-login.vue'
  export default {
    components: { CustomerGuest, CustomerLogin },
    computed: {
      getCurrentView () {
        if (this.$route.params.id === 'guest') {
          return CustomerGuest
        } else {
          return CustomerLogin
        }
      }
    }
  }
</script>

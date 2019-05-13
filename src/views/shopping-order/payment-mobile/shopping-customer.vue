<template>
  <div class="shopping-customer-mobile">
    <!-- <customer-guest></customer-guest> -->
    <customer-login></customer-login>
  </div>
</template>
<script>
  import CustomerGuest from './customer-guest.vue'
  import CustomerLogin from './customer-login.vue'
  export default {
    components: { CustomerGuest, CustomerLogin }
  }
</script>

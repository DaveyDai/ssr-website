<template>
  <div class="shopping-pay">
    <keep-alive>
      <component :is="getCurrentView"></component>
    </keep-alive>
  </div>
</template>
<script>
  import ShoppingEdit from './payment-pc/shopping-edit.vue'
  import ShoppingEditMobile from './payment-mobile/shopping-edit.vue'
  export default {
    components: { ShoppingEdit, ShoppingEditMobile },
    computed: {
      getCurrentView () {
        if (this.$utils.browserRedirect()) {
          return ShoppingEditMobile
        } else {
          return ShoppingEdit
        }
      }
    }
  }
</script>
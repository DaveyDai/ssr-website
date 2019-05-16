<template>
  <div class="shoppint-cart">
    <shopping-cart-header></shopping-cart-header>
    <!-- 购物车列表组件 -->
    <shopping-list v-if="shoppingCart.totalNum > 0" @refresh="getShoppingCart"></shopping-list>
    <!-- 购物车为空时 -->
    <shopping-no-commodity v-else></shopping-no-commodity>
  </div>
</template>
<script>
  import { invokeGetShoppingCart } from '@/api/invoke.js'
  import ShoppingCartHeader from './shopping-cart-header.vue'
  import ShoppingNoCommodity from './shopping-no-commodity.vue'
  import ShoppingList from './shopping-list.vue'
  export default {
    components: { ShoppingCartHeader, ShoppingNoCommodity, ShoppingList },
    computed: {
      shoppingCart () { // 购物车列表
        return this.$store.state.shoppingCart
      }
    },
    data () {
      return {
        loading: true
      }
    },
    beforeMount () {
      this.getShoppingCart()
    },
    methods: {
      getShoppingCart() {
        invokeGetShoppingCart(this) // 获取购物车列表
      }
    }
  }
</script>
<style lang='less' scoped >
  .shoppint-cart{
    width: 100%;
    background-color: #fafafa;
  }
</style>

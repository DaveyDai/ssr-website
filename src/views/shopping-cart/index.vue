<template>
  <div class="shoppint-cart">
    <shopping-cart-header></shopping-cart-header>
    <shopping-list v-if="cartList.length > 0"></shopping-list>
    <!-- 购物车为空时 -->
    <shopping-no-commodity v-if="cartList.length === 0"></shopping-no-commodity>
  </div>
</template>
<script>
  import ShoppingCartHeader from './shopping-cart-header.vue'
  import ShoppingNoCommodity from './shopping-no-commodity.vue'
  import ShoppingList from './shopping-list.vue'
  export default {
    components: { ShoppingCartHeader, ShoppingNoCommodity, ShoppingList },
    computed: {
      cartList () {
        // return this.$store.state.cartList.productList
        return [{}]
      }
    },
    data () {
      return {
        inCartList: [], // 已经登录
        loading: true
      }
    },
    props: {},
    methods: {
      isLength (val) {
        return val && val.length > 0
      },
      refresh () {
        this.loading = false;
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

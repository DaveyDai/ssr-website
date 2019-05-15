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
        inCartList: [], // 已经登录
        loading: true
      }
    },
    beforeMount () {
      this.getShoppingCart()
    },
    methods: {
      getShoppingCart () { // 获取购物车列表， 未登陆时根据购物车ID
        this.$store.dispatch('postByUrl', {api: 'getShopCartListNl', data: this.shoppingCart.shoppingCartId}).then(data => {
          this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(data)) // 保存购物车信息到本地和store
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
        // setTimeout(() => {
        //   this.$utils.setShoppingCart(this.$store.commit, this.$utils.calculationCart(
        //   [{ // 模拟数据
        //     "skuProductMainUrl":"https://dqqvg67sziwi8.cloudfront.net/prod/2018/09/28/11f59b5914.jpg",
        //     "productName":"VAVA Dash Cam 2K-VD005",
        //     "shortName":"VAVA Dash Cam 2K-VD005",
        //     "description":"",
        //     "colourCode":"Black",
        //     "colourName":"#000000",
        //     "listingPrice":149.99,
        //     "sellPrice":139.99,
        //     "model":"VA-VD005",
        //     "state":true,
        //     "productSkuId":"83-05000-018",
        //     "totalQtyOrdered":8
        //   }, { // 模拟数据
        //     "skuProductMainUrl":"https://dqqvg67sziwi8.cloudfront.net/prod/2018/09/28/11f59b5914.jpg",
        //     "productName":"VAVA Dash Cam 2K-VD005",
        //     "shortName":"VAVA Dash Cam 2K-VD005",
        //     "description":"",
        //     "colourCode":"Black",
        //     "colourName":"#000000",
        //     "listingPrice":149.99,
        //     "sellPrice":139.99,
        //     "model":"VA-VD005",
        //     "state":true,
        //     "productSkuId":"83-05000-0188",
        //     "totalQtyOrdered":8
        //   }], this.shoppingCart.shoppingCartId || 1234))
        // }, 100)
        console.log(this.$store.state);
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

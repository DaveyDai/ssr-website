<template>
  <div class="shopping-no-commodity" >
    <img src="@/assets/images/shopping/no.png" width="100%" >
    <p>Your Shopping Cart is Still Empty!</p>
    <vava-button class="button-standard no-wrap mt20" @click="goShopping">GO SHOPPING</vava-button>
    <p class="no-commodity-login" @click="signIn">Sign In</p>
  </div>
</template>
<script>
  export default {
    methods: {
      goShopping () {
        this.$router.push('/')
      },
      signIn () {
        this.$router.push({path: '/login', query: {redirect: 'shopping-cart'}})
      }
    }
  }
</script>

<style lang="less" scoped>
  .shopping-no-commodity{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8vw;
    padding-bottom: 10vw;
    img{
      width: 20vw;
      min-width: 230px;
    }
    p{
      font-family: AvenirNext-Regular;
      font-size: 0.83vw;
      color: #666;
      line-height: 1.2;
    }
    .button-standard{
      padding: 0 4.3vw;
      min-width: 250px;
    }
    .no-commodity-login{
      display: none;
      margin-top: 15px;
      font-size: 16px;
      text-decoration: underline;
      color: @base-color;
    }
  }
  @media (max-width: 920px) {
    .shopping-no-commodity{
      padding-top: 100px;
      padding-bottom: 10vw;
      p{
        margin-top: 10px;
        font-size: 13px;
      }
      .button-standard{
        margin-top: 180px;
        width: 80%;
      }
      .no-commodity-login{
        display: block;
        margin-top: 15px;
        font-size: 16px;
        text-decoration: underline;
        color: @base-color;
      }
    }
  }
  @media (max-width: 500px) {
    .shopping-no-commodity{
      .button-standard{
        width: 90%;
      }
    }
  }
</style>

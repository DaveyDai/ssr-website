<template>
  <div class="view_details">
    <OrderComp/>
  </div>
</template>
<script>
import OrderComp from "../../components/order-comp.vue";
export default {
  components: { OrderComp }
};
</script>
<style lang="less" scoped>
.view_details {
  width: 100%;
  background: #fafafa;
  padding: 1.2vw 5.2vw 0;
  overflow: hidden;
}
</style>



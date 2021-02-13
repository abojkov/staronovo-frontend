<template>
  <div>
    <h5>Побарувања</h5><hr/>
    <img id="loading" src="@/assets/imgs/loading.gif" alt="" v-if="orders === undefined"/>
    <div v-if="orders !== undefined">
      <div class="row" v-if="orders.length === 0">
        <div class="col-sm-3"/>
        <div class="col-sm-6">
          <div class="alert alert-info">
            Никој нема порачано од вас до сега!
          </div>
        </div>
        <div class="col-sm-3"/>
      </div>
      <Order v-for="order in orders" :key="order.id" v-bind:order-item="order"/>
    </div>
  </div>
</template>

<script>
import Order from "@/components/order/Order";
import axios from "axios";
export default {
  name: "Orders",
  components: {Order},
  data(){
    return{
      orders: undefined
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get('api/purchases/orders').then(res => {
        this.orders = res.data;
        console.log(res.data);
      }).catch(() => {
        this.$router.push({name: 'NotAllowed'});
      });
    }
  }
}
</script>

<style scoped>
  #loading{
    height: 50px;
    width: 50px;
  }
</style>
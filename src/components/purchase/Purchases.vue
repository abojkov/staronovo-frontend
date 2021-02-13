<template>
  <div>
    <h5>Мои нарачки</h5><hr/>
    <img id="loading" src="@/assets/imgs/loading.gif" alt="" v-if="purchases === undefined"/>
    <div v-if="purchases !== undefined">
      <div class="row" v-if="purchases.length === 0">
        <div class="col-sm-3"/>
        <div class="col-sm-6">
          <div class="alert alert-info">
            Не постојат ваши нарачки! Започнете да купувате сега!
          </div>
        </div>
        <div class="col-sm-3"/>
      </div>
      <Purchase v-for="purchase in purchases" :key="purchase.id" v-bind:purchase-item="purchase" @remove-purchase="cancelPurchase"/>
    </div>
    <button style="display: none;" class="btn btn-sm btn-primary w-100" data-toggle="modal" data-target="#dialogInfoModal" ref="dialogTrigger"></button>
    <DialogInfo v-bind:message="'Во моментот не може да се процесира вашето барање!'"/>
  </div>
</template>

<script>
import Purchase from "@/components/purchase/Purchase";
import DialogInfo from "@/components/popups/DialogInfo";
import axios from "axios";

export default {
  name: "Purchases",
  components: {DialogInfo, Purchase},
  data(){
    return{
      purchases: undefined
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    cancelPurchase(id) {
      axios.delete('api/purchases/' + id)
          .then(() => {
            this.getData();
          })
          .catch(() => {
            this.$refs.dialogTrigger.click();
          });
    },
    getData(){
      axios.get('api/purchases').then(res => {
        this.purchases = res.data;
      }).catch(() => {
        this.$refs.dialogTrigger.click();
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
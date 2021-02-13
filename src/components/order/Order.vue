<template>
  <div>
    <div class="container-fluid my-5 d-sm-flex justify-content-center">
      <div class="card px-2">
        <div class="card-header bg-white">
          <div class="row justify-content-between">
            <div class="col">
              <p class="text-muted"> ID на нарачка <span class="font-weight-bold text-dark">{{ order.id }}</span></p>
              <p class="text-muted"> Датум на нарачка <br/><span class="font-weight-bold text-dark">{{ order['datetime_purchased'] }}</span> </p>
              <p class="text-muted"> Порачал <br/><span class="font-weight-bold text-dark"><a href="#" @click="viewProfile">{{ order['buyer_username'] }}</a></span> </p>
            </div>
            <div class="flex-col my-auto">
              <h6 class="ml-auto mr-3">
                <button type="button" class="btn btn-outline-primary d-flex" data-toggle="modal" :data-target="'#rawPostModal-'+order.id" @click="removeModalBackdrop">Види го постот</button>
                <RawPost v-bind:purchaseId="order.id" v-bind:post="order.post"/>
              </h6>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="media flex-column flex-sm-row">
            <div class="media-body mr-4">
              <h5 class="bold">{{ order.post.name }}</h5>
              <p class="text-muted"> Количина: {{ order.quantity }}</p>
              <h4 class="mt-3 mb-4 bold"> <span class="mt-5"></span> {{ order['total_price'] }} <span class="small text-muted"> МКД </span></h4>
            </div><img class="align-self-center img-fluid" :src="order.post.image" style="border-radius: 5px;" width="180 " height="180">
          </div>
        </div>
        <div class="row px-3">
          <div class="col">
            <ul id="progressbar">
              <li class="step0 active" id="step1">ПОРАЧАНО</li>
              <li class="step0 text-center" id="step2" v-bind:class="[order['datetime_delivered']!=null ? 'active' : '']">
                <button class="btn btn-sm btn-outline-primary" v-if="order['datetime_delivered'] == null" @click="deliver">ИСПРАТИ</button>
                <span v-if="order['datetime_delivered'] != null">ИСПРАТЕНО</span>
              </li>
              <li class="step0 text-muted text-right" id="step3" v-bind:class="[order['datetime_confirmation']!=null ? 'active' : '']">ПРИСТИГНАТО</li>
            </ul>
          </div>
        </div>
        <div class="card-footer bg-white px-sm-3 px-0">
          <div class="row text-center ">
            <p v-if="order['datetime_delivered'] != null && order['datetime_confirmation'] == null" style="width: 100%; text-align: center">Се чека потврда од корисникот кога ќе ја прими пратката!</p>
            <div v-if="order['datetime_confirmation'] != null" style="width: 100%; text-align: center">
              <p>Нарачката е завршена!</p>
              <p v-if="order.rating == null">Корисникот сѐ уште нема оставено рејтинг</p>
              <p v-if="order.rating != null">Рејтинг од корисникот: {{ order.rating }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button style="display: none;" class="btn btn-sm btn-primary w-100" data-toggle="modal" data-target="#dialogInfoModal" ref="dialogTrigger"></button>
    <DialogInfo v-bind:message="'Во моментот не може да се процесира вашето барање!'"/>
  </div>
</template>

<script>
import axios from "axios";
import DialogInfo from "@/components/popups/DialogInfo";
import RawPost from "@/components/post/RawPost";

export default {
  name: "Order",
  components: {RawPost, DialogInfo},
  props: ["order-item"],
  data(){
    return{
      order: this.$props['orderItem']
    }
  },
  mounted() {

  },
  methods: {
    removeModalBackdrop(){
      setTimeout(function(){
        document.querySelector('.modal-backdrop').remove();
      }, 5)
    },
    viewProfile(){
      window.open("/profile/" + this.order['buyer_username']);
    },
    deliver(){
      axios.post('/api/purchases/deliver/' + this.order.id)
          .then(res => {
            console.log(res.data);
            this.order = res.data;
          })
          .catch(() => {
            this.$refs.dialogTrigger.click();
          });
    }
  }
}
</script>

<style scoped>
  .text-muted{
    text-align: left;
  }
  body {
    letter-spacing: 0.8px;
    background: linear-gradient(0deg, #fff 50%, #74a0ff) no-repeat;
  }

  .container-fluid {
    margin-top: 80px !important;
    margin-bottom: 80px !important
  }

  p {
    font-size: 14px;
    margin-bottom: 7px
  }

  .cursor-pointer {
    cursor: pointer
  }

  a {
    text-decoration: none !important;
    color: #651FFF !important
  }

  .bold {
    font-weight: 600
  }

  .small {
    font-size: 12px !important;
    letter-spacing: 0.5px !important
  }

  .Today {
    color: rgb(83, 83, 83)
  }

  .btn-outline-primary {
    background-color: #fff !important;
    color: #fa3e5b !important;
    border: 1.3px solid #fa3e5b;
    font-size: 12px;
    border-radius: 0.4em !important
  }

  .btn-outline-primary:hover {
    background-color: #fa3e5b !important;
    color: #fff !important;
    border: 1.3px solid #fa3e5b
  }

  .btn-outline-primary:focus,
  .btn-outline-primary:active {
    outline: none !important;
    box-shadow: none !important;
    border-color: #fa3e5b !important
  }

  #progressbar {
    margin-bottom: 30px;
    overflow: hidden;
    color: #455A64;
    padding-left: 0px;
    margin-top: 30px
  }

  #progressbar li {
    list-style-type: none;
    font-size: 13px;
    width: 33.33%;
    float: left;
    position: relative;
    font-weight: 400;
    color: #455A64 !important
  }

  #progressbar #step1:before {
    content: "1";
    color: #fff;
    width: 29px;
    margin-left: 12px !important;
  }

  #progressbar #step2:before {
    content: "2";
    color: #fff;
    width: 29px
  }

  #progressbar #step3:before {
    content: "3";
    color: #fff;
    width: 29px;
    margin-right: 15px !important;
    padding-right: 11px !important
  }

  #progressbar li:before {
    line-height: 29px;
    display: block;
    font-size: 12px;
    background: #455A64;
    border-radius: 50%;
    margin: auto
  }

  #progressbar li:after {
    content: '';
    width: 121%;
    height: 2px;
    background: #455A64;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 15px;
    z-index: -1
  }

  #progressbar li:nth-child(2):after {
    left: 50%
  }

  #progressbar li:nth-child(1):after {
    left: 25%;
    width: 121%
  }

  #progressbar li:nth-child(3):after {
    left: 25% !important;
    width: 50% !important
  }

  #progressbar li.active:before,
  #progressbar li.active:after {
    background: #fa3e5b
  }

  .card {
    background-color: #fff;
    box-shadow: 2px 4px 15px 0px rgb(0, 108, 170);
    z-index: 0
  }

  small {
    font-size: 12px !important
  }

  .a {
    justify-content: space-between !important
  }

  .border-line {
    border-right: 1px solid rgb(226, 206, 226)
  }

  .card-footer img {
    opacity: 0.3
  }

  .card-footer h5 {
    font-size: 1.1em;
    color: #8C9EFF;
    cursor: pointer
  }
</style>
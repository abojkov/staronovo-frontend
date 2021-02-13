<template>
  <div>
    <div class="container-fluid my-5 d-sm-flex justify-content-center">
      <div class="card px-2">
        <div class="card-header bg-white">
          <div class="row justify-content-between">
            <div class="col">
              <p class="text-muted"> ID на нарачка <span class="font-weight-bold text-dark">{{ purchase.id }}</span></p>
              <p class="text-muted"> Датум на нарачка <br/><span class="font-weight-bold text-dark">{{ purchase['datetime_purchased'] }}</span> </p>
            </div>
            <div class="flex-col my-auto">
              <h6 class="ml-auto mr-3">
                  <button type="button" class="btn btn-outline-primary d- flex" data-toggle="modal" :data-target="'#rawPostModal-'+purchase.id" @click="removeModalBackdrop">Види го постот</button>
                  <RawPost v-bind:purchaseId="purchase.id" v-bind:post="purchase.post"/>
              </h6>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="media flex-column flex-sm-row">
            <div class="media-body mr-4">
              <h5 class="bold">{{ purchase.post.name }}</h5>
              <p class="text-muted"> Количина: {{ purchase.quantity }}</p>
              <h4 class="mt-3 mb-4 bold"> <span class="mt-5"></span> {{ purchase['total_price'] }} <span class="small text-muted"> МКД </span></h4>
            </div><img class="align-self-center img-fluid" :src="purchase.post.image" style="border-radius: 5px;" width="180 " height="180">
          </div>
        </div>
        <div class="row px-3">
          <div class="col">
            <ul id="progressbar">
              <li class="step0 active" id="step1">ПОРАЧАНО</li>
              <li class="step0 text-center" id="step2" v-bind:class="[purchase['datetime_delivered']!=null ? 'active' : '']">ИСПРАТЕНО</li>
              <li class="step0 text-muted text-right" id="step3" v-bind:class="[purchase['datetime_confirmation']!=null ? 'active' : '']">ПРИСТИГНАТО</li>
            </ul>
          </div>
        </div>
        <div class="card-footer bg-white px-sm-3 px-0">
          <div class="row text-center ">
            <button type="button" class="btn btn-outline-primary d-flex mr-3" v-if="purchase['datetime_delivered'] == null" @click="cancelPurchase">Откажи</button>
            <button type="button" class="btn btn-outline-primary d-flex mr-3" v-if="purchase['datetime_delivered'] != null && purchase['datetime_confirmation'] == null" @click="confirmPurchase">Потврди примено</button>
            <div v-if="purchase['datetime_confirmation'] != null" style="width: 100%; text-align: center">
              <p>Нарачката е завршена!
                <span v-if="$store.state.ratingsLeft(purchase['nth_rating'])">
                  Имате можност да дадете уште {{ $store.state.ratingsLeft(purchase['nth_rating']) }} оценки!<br/>
                  <button class="btn btn-outline-primary" data-toggle="modal" :data-target="'#newRatingModal-'+purchase['id']" @click="removeModalBackdrop">Оцени</button>
                </span><br/>
                <span v-if="!$store.state.ratingsLeft(purchase['nth_rating'])">
                  Не можете веќе да давате рејтинг!
                </span><br/>
                <span v-if="purchase.rating != null">
                  Вашата моментална оценка е: {{ purchase.rating }}
                </span>
              </p>

              <NewRating v-bind:purchaseId="purchase['id']"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewRating from "@/components/rating/NewRating";
import RawPost from "@/components/post/RawPost";

export default {
  name: "Purchase",
  components: {RawPost, NewRating},
  props: ["purchase-item"],
  data(){
    return{
      purchase: this.$props['purchaseItem']
    }
  },
  mounted() {
    console.log(this.purchase);
  },
  methods: {
    removeModalBackdrop(){
      setTimeout(function(){
        document.querySelector('.modal-backdrop').remove();
      }, 5)
    },
    cancelPurchase(){
      this.$emit('remove-purchase', this.purchase.id);
    },
    confirmPurchase(){
      axios.post('/api/purchases/confirm/' + this.purchase.id)
          .then(res => {
            console.log(res.data);
            this.purchase = res.data;
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
    color: #4bb8a9 !important;
    border: 1.3px solid #4bb8a9;
    font-size: 12px;
    border-radius: 0.4em !important
  }

  .btn-outline-primary:hover {
    background-color: #4bb8a9 !important;
    color: #fff !important;
    border: 1.3px solid #4bb8a9
  }

  .btn-outline-primary:focus,
  .btn-outline-primary:active {
    outline: none !important;
    box-shadow: none !important;
    border-color: #42A5F5 !important
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
    background: #4bb8a9
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
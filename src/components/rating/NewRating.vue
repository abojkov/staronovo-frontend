<template>
  <div class="modal fade" :id="'newRatingModal-'+purchaseId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Рејтинг за нарачка со ID {{ purchaseId }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container register">
            <div class="row">
              <div class="col-md-1 register-left"/>
              <form class="col-md-10 register-right">
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 class="register-heading">Дадете рејтинг</h3>
                    <br/>
                    <div class="row register-form">
                      <div class="col-sm-3"/>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input v-model="rating" type="number" min="1.0" max="5.0" step="0.1" class="form-control" placeholder="* Рејтинг"/>
                          <p class="error" id="error-rating"></p>
                        </div>
                        <div class="form-group">
                          <input v-model="comment" type="text" class="form-control" placeholder="* Коментар"/>
                          <p class="error" id="error-comment"></p>
                        </div>
                      </div>
                      <div class="col-sm-3"/>
                    </div>
                  </div>
                </div>
              </form>
              <div class="col-md-1 register-left"/>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Откажи</button>
          <button type="button" class="btn btn-primary" @click="addRating">Објави</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewRating",
  props: ["purchaseId"],
  data(){
    return{
      rating: 1.0,
      comment: ''
    }
  },
  mounted() {

  },
  methods: {
    addRating(){
      var body = {
        rating: this.rating,
        comment: this.comment
      }

      axios.post('/api/purchases/rate/' + this.purchaseId, body)
          .then(() => {
            window.location.href = '/purchases';
          })
          .catch(err => {
            if(err.response.status === 422){
              var allErrors = err.response.data;
              Object.keys(allErrors).forEach(key => {
                this.$el.querySelector('#error-' + key).innerHTML = allErrors[key];
                console.log(allErrors[key])
              })
            }
          });
    }
  }
}
</script>

<style scoped>
  .error{
    text-align: left;
    color: red;
  }
</style>
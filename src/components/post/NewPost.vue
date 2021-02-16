<template>
  <div class="modal fade" id="newPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Нов пост</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container register">
            <div class="row">
              <div class="col-md-1 register-left"/>
              <form @submit.prevent="addPost" class="col-md-10 register-right">
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <h3 class="register-heading">Додавање нов пост</h3>
                    <br/>
                    <div class="row register-form">
                      <div class="col-md-6">
                        <div class="form-group">
                          <input v-model="name" type="text" class="form-control" placeholder="* Наслов"/>
                          <p class="error" id="error-name"></p>
                        </div>
                        <div class="form-group">
                          <input id="image" @change="encodeImage" type="file" class="form-control" placeholder="* Слика"/>
                          <p class="error" id="error-image"></p>
                        </div>
                        <div class="form-group">
                          <textarea v-model="description" type="email" class="form-control" placeholder="* Опис"></textarea>
                          <p class="error" id="error-description"></p>
                        </div>
                        <div class="form-group">
                          <input v-model="quantity_left" type="number" min="1" class="form-control" placeholder="* Количина"/>
                          <p class="error" id="error-quantity_left"></p>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input v-model="price" type="email" class="form-control" placeholder="* Цена (МКД)"/>
                          <p class="error" id="error-price"></p>
                        </div>
                        <div class="form-group">
                          <select class="form-control" v-model="category_id">
                            <option value="0" disabled="disabled">Одбери категорија</option>
                            <option v-for="item in categories" :value="item.id" :key="item.id">{{  item.name }}</option>
                          </select>
                          <p class="error" id="error-category_id"></p>
                        </div>
                        <div class="form-group">
                          <select class="form-control" v-model="city_id">
                            <option value="0" disabled="disabled">Одбери град</option>
                            <option v-for="item in cities" :value="item.id" :key="item.id">{{  item.name }}</option>
                          </select>
                          <p class="error" id="error-city_id"></p>
                        </div>
                      </div>
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
          <button type="button" class="btn btn-primary" @click="addPost">Објави</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewPost",
  props: ["username"],
  data(){
    return{
      categories: [],
      cities: [],
      name: '',
      description: '',
      quantity_left: '',
      price: '',
      category_id: 0,
      city_id: 0,
      image: ''
    }
  },
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    encodeImage(){
      this.getBase64(this.$el.querySelector('input[type="file"]').files[0]).then(data => this.image=data);

    },
    addPost(){
      this.$el.querySelectorAll(".error").forEach(element => element.innerHTML = "");

      // eslint-disable-next-line no-unused-vars
      var newPost = {
        name: this.name,
        description: this.description,
        quantity_left: this.quantity_left,
        price: this.price,
        category_id: this.category_id,
        city_id: this.city_id,
        image: this.image
      }

      // eslint-disable-next-line no-unused-vars
      var self = this;
      axios.post('/api/posts',newPost)
          .then(() => {
              window.location.href = './' + this.username;
          })
          .catch(err => {
            console.log(err.response);
            if(err.response.status === 422){
              var alLErrors = err.response.data;
              Object.keys(alLErrors).forEach(key => {
                this.$el.querySelector('#error-' + key).innerHTML = alLErrors[key];
                console.log(alLErrors[key])
              })
            }
          });

      console.log(newPost);
    },
    getCities(){
      axios.get("/api/cities")
          .then(res => {
            this.cities = res.data;
          })
          .catch();
    },
    getCategories(){
      axios.get("/api/categories/active")
          .then(res => {
            this.categories = res.data;
          })
          .catch();
    }
  },
  mounted() {
    this.getCategories();
    this.getCities();
  }
}
</script>

<style scoped>
  .error{
    text-align: left;
    color: red;
    font-size: 0.7rem;
  }
</style>
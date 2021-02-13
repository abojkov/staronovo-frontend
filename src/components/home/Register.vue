<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-1 register-left"/>
      <form @submit.prevent="registerUser" class="col-md-10 register-right">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 class="register-heading">Креирање корисничка сметка</h3>
            <br/>
            <div class="row register-form">
              <div class="col-md-6">
                <div class="form-group">
                  <input v-model="name" type="text" class="form-control" placeholder="* Име"/>
                  <p class="error" id="error-name"></p>
                </div>
                <div class="form-group">
                  <input v-model="surname" type="text" class="form-control" placeholder="* Презиме"/>
                  <p class="error" id="error-surname"></p>
                </div>
                <div class="form-group">
                  <input v-model="email" type="email" class="form-control" placeholder="* Емаил адреса"/>
                  <p class="error" id="error-email"></p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <input v-model="username" type="text" class="form-control" placeholder="* Корисничко име"/>
                  <p class="error" id="error-username"></p>
                </div>
                <div class="form-group">
                  <input v-model="password" type="password" class="form-control" placeholder="* Лозинка"/>
                  <p class="error" id="error-password"></p>
                </div>
                <div class="form-group">
                  <input v-model="repeatPass" type="password" class="form-control" placeholder="* Повторно лозинка"/>
                  <p class="error" id="error-repeatPass"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" class="btn btn-primary"  value="Регистрирај се"/>
      </form>
      <div class="col-md-1 register-left"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Register",
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      username: '',
      password: '',
      repeatPass: ''
    }
  },
  methods: {
    registerUser(){
      this.$el.querySelectorAll(".error").forEach(element => element.innerHTML = "");

      var newUser = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        username: this.username,
        password: this.password,
        repeatPass: this.repeatPass
      }

      axios.post('api/users', newUser)
          .then(() => {
            this.$el.querySelector('.row').innerHTML = '<div class="alert alert-success" style="width: 100%;">Успешно ја креиравте вашата корисничка сметка!</div>';
          })
          .catch(error => {
            if(error.response.status === 409){
              var alLErrors = error.response.data;
              Object.keys(alLErrors).forEach(key => {
                this.$el.querySelector('#error-' + key).innerHTML = alLErrors[key];
                console.log(alLErrors[key])
              })
            }
            console.log(error.response);
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
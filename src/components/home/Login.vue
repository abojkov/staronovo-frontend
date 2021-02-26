<template>
  <div class="container register">
    <div class="row">
      <div class="col-md-1 register-left"/>
      <form @submit.prevent="loginUser" class="col-md-10 register-right">
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 class="register-heading">Најава</h3>
            <br/>
            <div class="row register-form">
              <div class="col-md-4"/>
              <div class="col-md-4">
                <div class="form-group">
                  <input v-model="username" type="text" class="form-control" placeholder="Корисничко име"/>
                  <p class="error" id="error-username"></p>
                </div>
                <div class="form-group">
                  <input v-model="password" type="password" class="form-control" placeholder="Лозинка"/>
                  <p class="error" id="error-password"></p>
                </div>
                <p id="user-not-found"></p>
              </div>
              <div class="col-md-4"/>
            </div>
          </div>
        </div>
        <input type="submit" class="btn btn-primary" value="Најави се"/>
      </form>
      <div class="col-md-1 register-left"/>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {

  },
  methods: {
    loginUser(){
      var self = this;

      this.$el.querySelector('#user-not-found').innerHTML = "";
      this.$el.querySelectorAll(".error").forEach(element => element.innerHTML = "");

      var loginUser = {
        username: this.username,
        password: this.password
      }

      axios.post('/api/auth/login', loginUser)
          .then(res => {
            this.$store.state.logInUser(res.data.token);
            setTimeout(function(){self.$router.push('/');}, 1000)
          })
          .catch(error => {
            if(error.response.status === 422){
              var allErrors = error.response.data;

              Object.keys(allErrors).forEach(key => {
                this.$el.querySelector('#error-' + key).innerHTML = allErrors[key];
              })
            } else if(error.response.data[0] === 'user_not_found'){
              this.$el.querySelector('#user-not-found').innerHTML = "<p class='alert alert-danger' id='user-not-found'>Невалидни податоци за најава!</p>";
              this.password = '';
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
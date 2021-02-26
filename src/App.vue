<template>
  <div id="app">
    <div id="nav" style="">
      <div class="row align-items-center">
        <div class="col-sm-2">
          <a href="/" style="text-decoration: none; color: white;"><img src="../public/logo_light.png" style="width: 20%; margin-right: 25px;"/> СтароНово</a>
        </div>
        <div class="col-sm-7">
          <router-link class="link" to="/">Почетна</router-link>
          <router-link class="link" to="/about">За апликацијата</router-link>
        </div>
        <div class="col-sm-3">
          <div v-if="$store.state.user === null">
            <router-link to="/login" class="btn btn-sm btn-outline-primary mr-3"><i class="fa fa-sign-in" aria-hidden="true"></i> Најава</router-link>
            <router-link to="/register" class="btn btn-sm btn-outline-primary"><i class="fa fa-sign-in" aria-hidden="true"></i> Регистрација</router-link>
          </div>
          <div v-if="$store.state.user !== null">
            <div class="dropdown show" style="display: inline-block;">
              <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <router-link v-if="$store.state.user !== null" class="dropdown-item" :to="'/profile/' + $store.state.user.username" :key="$router.fullPath">Мој профил</router-link>

                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/purchases" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_USER'">Мои нарачки</router-link>
                <router-link class="dropdown-item" to="/orders" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_USER'">Продажба</router-link>
                <router-link class="dropdown-item" to="/favourite" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_USER'"><i class="fa fa-bookmark" aria-hidden="true"></i>  Омилени</router-link>
                <router-link class="dropdown-item" to="/categories" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_ADMIN'">Категории</router-link>

                <div class="dropdown-divider"></div>
                <router-link to="/logout" class="dropdown-item"><i class="fa fa-sign-out" aria-hidden="true"></i> Одјава</router-link>
              </div>
            </div>
            <form @submit="searchUser" style="display: inline-block;">
              <input v-model="search" placeholder="Барај..." class="ml-2"/>
              <button hidden/>
            </form>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data(){
    return {
      search: ''
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    // При рефреш, ако беше нешто сменето во меѓувреме рачно во базата, немаше да се смени тука, затоа е додадено ова
    this.$store.state.changeLoggedInUser();
  },
  methods: {
    searchUser(e){
      e.preventDefault();

      this.$router.push({name: 'Users', params: {username: this.search}})
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav{
  padding: 15px 0 15px 0;
  background: #000033;
  margin-bottom: 20px;
  color: white;
}
.link{
  color: white;
  border: 1px solid white;
  padding: 5px;
  border-radius: 5px;
  margin: 0 2px;
  text-decoration: none;
}
.link:hover{
  background: white;
  color: black;
}
.row{
  margin-left: 0;
  margin-right: 0;
}
</style>

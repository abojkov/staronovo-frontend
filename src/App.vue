<template>
  <div id="app">
    <div id="nav" style="">
      <div class="row align-items-center">
        <div class="col-sm-2">
          <img src="../public/logo_light.png" style="width: 20%; margin-right: 25px;"/> СтароНово
        </div>
        <div class="col-sm-8">
          <router-link class="link" to="/" v-if="$store.state.user === null">Почетна</router-link>
          <router-link class="link" to="/timeline" v-if="$store.state.user !== null">Почетна</router-link>
          <router-link class="link" to="/categories" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_ADMIN'">Категории</router-link>
          <router-link class="link" to="/purchases" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_USER'">Мои нарачки</router-link>
          <router-link class="link" to="/orders" v-if="$store.state.user !== null && $store.state.user.role.role === 'ROLE_USER'">Побарувања</router-link>
          <router-link v-if="$store.state.user !== null" class="link" :to="'/profile/' + $store.state.user.username" :key="$router.fullPath">Мој профил</router-link>
          <router-link class="link" to="/about">За апликацијата</router-link>
        </div>
        <div class="col-sm-2">
          <div v-if="$store.state.user === null">
            <router-link to="/login" class="btn btn-sm btn-outline-primary mr-3"><i class="fa fa-sign-in" aria-hidden="true"></i> Најава</router-link>
            <router-link to="/register" class="btn btn-sm btn-outline-primary"><i class="fa fa-sign-in" aria-hidden="true"></i> Регистрација</router-link>
          </div>
          <div v-if="$store.state.user !== null">
            <form @submit="searchUser">
              <input v-model="search" placeholder="Барај..." class="mr-2"/>
              <router-link to="/logout"><i class="fa fa-sign-out" aria-hidden="true"></i></router-link>
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

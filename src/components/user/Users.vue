<template>
  <div>
    <img id="loading" src="@/assets/imgs/loading.gif" alt="" v-if="users === undefined"/>
    <div class="container mt-5">
      <div id="errorMessage">

      </div>
      <div class="row">
        <User v-model="users" v-for="item in users" v-bind:key="item.id" v-bind:user="item"/>
      </div>
    </div>
  </div>

</template>

<script>
import User from "@/components/user/User";
import axios from "axios";
export default {
  name: "Users",
  components: {User},
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route'(to, from){
      this.searchString = to.params.username;
      this.getData();
    }
  },
  data(){
    return {
      searchString: this.$route.params['username'],
      users: undefined
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      this.$el.querySelector('#errorMessage').innerHTML = ""
      axios.get('/api/users/search?username='+this.searchString)
          .then(res => {
            this.users = res.data

            if(this.users.length === 0){
              this.$el.querySelector('#errorMessage').innerHTML = "Не постојат резултати за вашето барање!"
            }
          })
          .catch(error => {
            if(error.response.status === 500){
              this.users = []
              this.$el.querySelector('#errorMessage').innerHTML = "Настана интерна серверска грешка! Обидете се повторно!"
            }
            console.log(error)
          });
    }
  }
}
</script>

<style scoped>
  img{
    height: 50px;
    width: 50px;
  }
</style>
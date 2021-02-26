<template>
  <div>
    <h5>Омилени</h5><hr/>
    <img id="loading" src="@/assets/imgs/loading.gif" alt="" v-if="posts === undefined"/>
    <div v-if="posts !== undefined">
      <div class="row" v-if="posts.length === 0">
        <div class="col-sm-3"/>
        <div class="col-sm-6">
          <div class="alert alert-info">
            Не постојат производи кои ви се омилени!
          </div>
        </div>
        <div class="col-sm-3"/>
      </div>
      <Post v-for="post in posts" :key="post.id" v-bind:post="post"/>
    </div>
  </div>
</template>

<script>
import Post from "@/components/post/Post";
import axios from "axios";

export default {
  name: "Favourite",
  components: {Post},
  data(){
    return{
      posts: undefined
    }
  },
  mounted() {
    this.getFavourites();
  },
  methods: {
    getFavourites(){
      axios.get('/api/favourites')
          .then(res => {
            this.posts = res.data;
          }).catch(error => {
        if(error.response.status === 401){
          this.$router.push({name: 'NotAllowed'});
        }
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
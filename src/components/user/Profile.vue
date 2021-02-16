<template>
  <div>
    <img id="loading" src="@/assets/imgs/loading.gif" alt="" v-if="user === undefined"/>
    <div class="container mt-5 justify-content-center" v-if="user !== undefined">
      <div class="card p-3" style="width: 50%; margin: auto;">
        <div class="d-flex align-items-center">
          <div class="image"> <img src="@/assets/imgs/user-profile.png" class="rounded" width="155"> </div>
          <div class="ml-3 w-100">
            <h4 class="mb-0 mt-0">{{ user.name + " " + user.surname }}</h4> <span>{{ user.username }}</span>
            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
              <div class="d-flex flex-column"> <span class="card-title">Објави</span> <span class="number1">{{  user.posts.length }}</span> </div>
              <div class="d-flex flex-column"> <span class="card-title">Следбеници</span> <span class="number2">{{  user.followers.length }}</span> </div>
              <div class="d-flex flex-column"> <span class="card-title">Следи</span> <span class="number3">{{  user.following.length }}</span> </div>
              <div class="d-flex flex-column"> <span class="card-title">Рејтинг</span> <span class="number3">{{ user.rating }}</span> </div>

            </div>
            <div class="mt-2">
              <div v-if="$store.state.user.id !== user.id">
                <button class="btn btn-sm btn-outline-primary w-100" v-if="!doesLoggedInFollowThisProfile()" @click="toggleFollow">Заследи</button>
                <div style="width: 100%;">
              <span v-if="doesLoggedInFollowThisProfile()">
                <span style="font-size: 0.7rem">√ Ја следиш личноста</span>
                <button class="btn btn-sm btn-danger w-100" @click="toggleFollow">Одследи</button>
              </span>
                </div>
              </div>
              <span class="w-100" v-if="$store.state.user != null && username === $store.state.user.username">
              <button class="btn btn-sm btn-primary w-100" data-toggle="modal" data-target="#newPostModal">Нов пост</button>
              <NewPost v-bind:username="username"/>
            </span>
            </div>
          </div>
        </div>
      </div><br/>
      <Post v-for="post in user.posts" v-bind:key="post.id" v-bind:post="post"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Post from "@/components/post/Post";
import NewPost from "@/components/post/NewPost";

export default {
  name: "Profile",
  components: {NewPost, Post},
  watch: {
    // eslint-disable-next-line no-unused-vars
    '$route'(to, from){
      this.user = undefined;
      this.username = to.params.username;

      if(to.fullPath.includes('profile'))
        this.getData().then(res => this.user = res);
    }
  },
  data(){
    return{
      username: this.$route.params['username'],
      user: undefined
    }
  },
  mounted: async function(){
    this.user = await this.getData();
  },
  methods: {
    getData: function(){
      return axios.post('/api/users/profile', {username: this.username})
          .then(res => res.data)
          .catch(error => {
            if(error.response.status === 401){
              this.$router.push({name: 'NotAllowed', params: {message: error.response.data.message }});
            } else if(error.response.status === 404){
              this.$router.push({name: 'NotAllowed', params: {message: 'Ресурсот кој го баравте не постои!' }});
            }
          });
    },
    doesLoggedInFollowThisProfile(){
      if(this.$store.state.user !== null &&
          this.user.followers.map(item => item.follower_id).includes(this.$store.state.user.id)){
        return true
      }

      return false;
    },
    toggleFollow(){
      var obj = {
        follower_id: this.$store.state.user.id,
        following_id: this.user.id
      }

      axios.post('/api/follow/toggle', obj).then(() => {
        this.getData().then(res => this.user = res);
      }).catch();
    }
  }
}
</script>

<style scoped>
  .card-title{
    color: lightgray;
    font-size: 10px;
  }
  #loading{
    height: 50px;
    width: 50px;
  }
</style>
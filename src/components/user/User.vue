<template>
  <div class="col-md-4 mb-2">
    <div class="card p-3" id="mainClickable" @click="viewProfile">
      <div class="d-flex flex-row align-items-center">
        <img src="@/assets/imgs/user-profile.png" width="70">
        <div class="d-flex flex-column ml-2" style="width: 100%;">
          <span>{{ user.name + " " + user.surname }}</span>
          <span class="text-black-50">{{ user.username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  props: ["user"],
  mounted() {

  },
  methods: {
    viewProfile(){
      this.$router.push({name: 'Profile', params: {username: this.user.username}})
    }
  }
}
</script>

<style scoped>
  #mainClickable{
    transition: 0.3s;
  }
  #mainClickable:hover{
    background: lightgray;
    cursor: pointer;
  }
</style>
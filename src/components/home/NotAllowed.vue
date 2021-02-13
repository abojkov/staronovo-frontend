<template>
  <div class="row">
    <div class="col-sm-3"/>
    <div id="main-message" class="col-sm-6 alert alert-danger">
      Немате пристап до овој дел од веб апликацијата!
    </div>
    <div class="col-sm-3"/>
  </div>
</template>

<script>
export default {
  name: "Error",
  data(){
    return {
      message: this.$route.params['message']
    }
  },
  mounted() {
    if(this.message !== undefined){
      this.$el.querySelector('#main-message').innerHTML = this.message;
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="row">
    <div class="col-sm-3"/>
    <div class="col-sm-6 alert alert-danger">
      Успешно се одјавивте!
    </div>
    <div class="col-sm-3"/>
  </div>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.logout();
  },
  methods: {
    logout(){
      this.$store.state.logoutUser();
    }
  }
}
</script>

<style scoped>

</style>
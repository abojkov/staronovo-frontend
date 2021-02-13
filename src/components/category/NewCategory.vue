<template>
  <div>
    <form @submit="add">
      <div style="width: 30%; display: inline-block; text-align: left;">
        <input style="display: inline-block; width: 80%;" class="form-control" placeholder="Нова категорија..." @keydown="removeErrors" @focus="removeErrors" @focusout="removeErrors" v-model="newTitle"/>
        <button class="btn btn-sm btn-info" style="margin-left: 15px;" v-on:click="add">Додади</button>
        <div id="errors" v-if="errors.length>0">
          <span style="color: red; display: block;" v-for="error in errors" v-bind:key="error">
            {{ error.toString() }}
          </span>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewCategory",
  category: '',
  methods: {
    add(e){
      e.preventDefault();

      var item = {
        name: this.newTitle
      }
      console.log(item);
      axios.post('/api/categories', item).
      then(
          res => {
            this.$emit('add-category', res.data);
            this.newTitle = '';
          }
      ).catch(
          error => {
            console.log(error.response);
            this.errors = Object.values(error.response.data);
          }
      );
    },
    removeErrors(){
      if(this.errors !== [])
      this.errors = [];
    }
  },
  data(){
    return {
      newTitle: '',
      errors: []
    }
  }
}
</script>

<style scoped>

</style>
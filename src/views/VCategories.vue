<template>
  <div id="view-categories">
    <NewCategory @add-category="add"></NewCategory>
    <br/>
    <Categories
        v-bind:categories="categories"
        @remove-category="remove"
        @toggle-status-category="toggleStatus"
        />
  </div>
</template>

<script>
import axios from "axios";

import Categories from '@/components/category/Categories.vue'
import NewCategory from "@/components/category/NewCategory";

export default {
  name: 'VCategories',
  components: {
    Categories,
    NewCategory
  },
  data() {
    return {
      categories: [],
      errors: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get('/api/categories').
      then(
          res => this.categories = res.data
      ).catch(err => {
        console.log(err.response);
        this.$router.push({name: 'NotAllowed', params: {message: err.response.data.message }});
          console.log(err.response.data)
          //this.$router.push({name: 'NotAllowed'})
      });
    },
    add(category){
      this.categories = [...this.categories, category];
    },
    remove(id){
      axios.delete("/api/categories/"+id).then(()=>{
        this.getData();
      })
    },
    toggleStatus(id){
      var item = Object.values(this.categories.filter(c => c.id === id))[0];
      item.is_active = !item.is_active;

      axios.put('/api/categories/'+id, item).then(()=>{
        this.getData();
      })
    }
  }
}
</script>

<style>

</style>

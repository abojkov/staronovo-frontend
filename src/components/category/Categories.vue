<template>
  <div class="container">
      <div class="row h-100" v-if="categories.length>0">
        <div class="col-sm-3 mb-1" v-for="category in categories" v-bind:key="category.id">
          <Category v-bind:category="category" @remove-category="remove" @toggle-status-category="toggleStatus"/>
        </div>
      </div>
    <div class="" v-if="categories.length===0">
      <p>Листата на категории е празна!</p>
    </div>
  </div>
</template>

<script>
import Category from "@/components/category/Category";

export default {
  name: 'Categories',
  components: {
    Category
  },
  response: "",
  props: ["categories"],
  methods: {
    remove(id){
      this.$emit('remove-category', id);
    },
    toggleStatus(id){
      this.$emit('toggle-status-category', id);
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

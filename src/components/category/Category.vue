<template>
  <div class="card" style="padding: 50px;" v-bind:class="[category.is_active ? 'active' : 'not-active']">
    <div>{{ category.name }}</div>
    <br/>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-sm btn-danger" data-toggle="modal" :data-target="'#confirmRemoval' + category.id" style="margin-bottom: 10px;">
      Избриши
    </button>
    <button v-if="category.is_active" class="btn btn-sm btn-primary" @click="toggleStatus(category.id)">Дективирај</button>
    <button v-else-if="!category.is_active" class="btn btn-sm btn-primary" @click="toggleStatus(category.id)">Активирај</button>
    <!-- Modal -->
    <div class="modal fade" :id="'confirmRemoval' + category.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Информација</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Дали навистина сакате да ја избришете категоријата?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="remove(category.id)">Да</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Не</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: ["category"],
  mounted() {

  },
  methods:{
    remove(id){
      this.$emit('remove-category', id);
    },
    toggleStatus(id){
      this.$emit('toggle-status-category', id);
    }
  }
}
</script>

<style scoped>
  .active{
    background: #99ff99;
  }

  .not-active{
    background: #ff99c2;
  }
</style>
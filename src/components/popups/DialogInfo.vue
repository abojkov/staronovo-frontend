<template>
  <div class="modal fade" id="dialogInfoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Информација</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>
            {{ message }}
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closePopup">ОК</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogInfo",
  props: ["message"],
  methods: {

  }
}
</script>

<style scoped>

</style>
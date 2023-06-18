<template>
  <div class="modal fade" :id="id" tabindex="-1" role="dialog" data-backdrop="static"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <h4 class="h4 text-center mb-3 text-primary">
            <slot name="custom-title" />
          </h4>

          <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneratingModal",


  data () {
    return {}
  },

  props : {
    id: {
      type: String,
      default: 'example',
    },

    title: {
      type: String,
      default: 'example',
    },



  },

}
</script>

<style scoped>

</style>
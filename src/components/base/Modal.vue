<template>
  <div class="modal fade" :id="id" :name="name" tabindex="-1" role="dialog" :aria-labelledby="id+'CenterTitle'" aria-hidden="true" >
    <div class="modal-dialog modal-dialog-centered"
         role="document"
         :class="{
         's-width'  : s_width,
         'm-width'  : m_width,
         'lg-width' : lg_width,
         'xl-width' : xl_width,
         'xxl-width' : xxl_width
      }">

      <div class="modal-content" :class="{
        'm-height' : m_height,
        'lg-height' : lg_height,
        'xl-height' : xl_height,
        'xxl-height' : xxl_height,
      }">
        <div class="modal-header">
          <slot name="custom-header"/>
          <button v-if="showHeaderButtonClose" type="button" class="close btn btn-xs" data-dismiss="modal" aria-label="Close" @click="thisCloseEvent">
            <span aria-hidden="true"><h5>&times;</h5></span>
          </button>
        </div>

        <div class="modal-body">
          <slot name="custom-body" />
        </div>

        <div class="modal-footer">
          <slot name="custom-footer"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  data () {
    return {}
  },

  props : {
    id: {
      type: String,
      default: 'example',
    },

    name: {
      type: String,
      default: 'Example',
    },

    s_width:{
      type: Boolean,
      default: false,
    },

    s_height:{
      type: Boolean,
      default: false,
    },

    m_width:{
      type: Boolean,
      default: false,
    },

    m_height:{
      type: Boolean,
      default: false,
    },

    lg_width:{
      type: Boolean,
      default: false,
    },

    lg_height:{
      type: Boolean,
      default: false,
    },

    xl_width:{
     type: Boolean,
     default: false,
    },

    xl_height:{
      type: Boolean,
      default: false,
    },

    xxl_width:{
      type: Boolean,
      default: false,
    },

    xxl_height:{
      type: Boolean,
      default: false,
    },

    showHeaderButtonClose : {
      type : Boolean,
      default : true,
    }
  },

  methods: {
    thisCloseEvent(){
      this.$emit('closingEvent','Hello World');
    }
  },

  computed: {},

  mounted () {},

  created () {},

  destroyed () {},
}
</script>

<style scoped>

.s-width{
  max-width: 250px !important;
}

.s1-width{
  max-width: 252px !important;
}

.s2-width{
  max-width: 254px !important;
}

.s3-width{
  max-width: 256px !important;
}

.s4-width{
  max-width: 258px !important;
}

.s4-width{
  max-width: 260px !important;
}

.m-width{
  max-width: 450px !important;
}

.m1-width{
  max-width: 452px !important;
}

.m2-width{
  max-width: 454px !important;
}

.m3-width{
  max-width: 456px !important;
}

.m4-width{
  max-width: 458px !important;
}

.m5-width{
  max-width: 460px !important;
}

.lg-width{
  max-width: 800px !important;
}

.xl-width{
  max-width: 1280px !important;
}

.xxl-width{
  max-width: 1620px !important;
}

.s-height{
  height: 250px !important;
}

.m-height{
  max-height: 500px !important;
}

.lg-height{
  height: 550px !important;
}

.xl-height{
  height: 750px !important;
}

.xxl-height{
  height: 920px !important;
}

.custom-text-center-alignment {
  text-align: center !important;
  margin: 0 -50% 0 0 !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  margin: 0 -50% 0 0 !important;
  transform: translate(-50%, -50%) !important;
}

</style>

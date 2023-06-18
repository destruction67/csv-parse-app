<template>
<div>
  <top-nav>
    <template slot="nav">
      <top-nav-sub></top-nav-sub>
    </template>

    <template slot="content">
      <top-nav-content></top-nav-content>
    </template>

  </top-nav>
</div>
</template>

<script>
import {vueAppMixin} from "@/mixins/vueAppMixin";
import {mapActions, mapGetters} from 'vuex';

import TopNav from "@/components/applayout/TopNav";
import Nav from "@/components/applayout/_sub/Nav";
import Content from "@/components/applayout/_sub/Content";

export default {
  name: "Main",

  components: {
    'top-nav': TopNav,
    'top-nav-sub': Nav,
    'top-nav-content': Content,
  },

  mixins: [vueAppMixin],

  data() {
    return {};
  },

  methods: {
    ...mapActions(
        [
        ],
    ),


  },

  computed: {
  },

  mounted () {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish()
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  }

}
</script>

<style scoped>

</style>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-blue2">
    <router-link :to="{ name: 'Home' }" class="navbar-brand" tag="a">
     CSV PARSE
    </router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">


        <li class="nav-item">
          <router-link class="nav-link"
                       :to="{name:'CustomerInvite'}"
                       :class="{ 'active' : isActiveRoute('CustomerInvite')}">
            <font-awesome-icon icon="list-check" class="ml-2 mr-1" />
            List
          </router-link>
        </li>

      </ul>


    </div>
  </nav>
</template>

<script>
import {vueAppMixin} from "@/mixins/vueAppMixin";
import {mapActions, mapGetters} from "vuex";
import {AlertService} from "@/service/AlertService";

export default {
  name: "Nav",

  /** mixins **/
  mixins: [vueAppMixin,],

  methods: {
    ...mapActions([
    ]),

  },

  computed: {
    ...mapGetters([
    ]),
  },

  created() {
  },


}
</script>

<style scoped>

.bg-blue1{
  background: #1e3c72;
}

.bg-blue2{
  background: #2a5298;
}

</style>
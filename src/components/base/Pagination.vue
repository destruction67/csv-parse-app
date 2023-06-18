<template>
  <div class="text-left small">
    <div class="row">
      <div class="col-12 font-weight-bold">

        &nbsp
        <ul class="pagination pagination-sm">
          <li class="page-item" :class="{ 'disabled': pageObject.currentPage === 1}">
            <button class="page-link x-small" @click="setPage(1)">
              <font-awesome-icon icon="step-backward"/>
              <small> First</small>
            </button>
          </li>

          <li v-for="(page,index) in paginationPages" :key="page" class="page-item" :class="{ 'disabled': page === '...', 'disabled': page === pageObject.currentPage }">
            <button class="page-link x-small" :class="{'font-weight-bold text-danger' :page === pageObject.currentPage}" @click="setPage(page)">{{ page }}</button>
          </li>

          <li class="page-item x-small" :class="{ 'disabled': pageObject.currentPage === pageObject.lastPage}">
            <button class="page-link x-small" @click="setPage(pageObject.lastPage)">
              <small> Last </small>
              <font-awesome-icon icon="step-forward"/>
            </button>
          </li>
        </ul>
        &nbsp;

        <small>{{ `${pageObject.from} - ${pageObject.to} of ${pageObject.total}` }}</small>

      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    pageObject: {
      type: Object,
      default: {},
    },
  },

  data () {
    return {
      pageFrom : this.pageObject?.from,
      pageTo : this.pageObject?.to,
    }
  },

  methods: {
    setPage (e) {
      this.$emit('settingPage', e)
    },
  },

  computed: {

    paginationPages () {
      let pages = []
      let currentPage = this.pageObject.currentPage
      let lastPage = this.pageObject.lastPage
      if (lastPage > 1) {
        let initialLimit = 1
        if (currentPage + 5 > lastPage) {
          initialLimit = lastPage - 9
        } else if (currentPage > 6) {
          initialLimit = currentPage - 5
        }
        initialLimit = initialLimit < 1 ? 1 : initialLimit
        for (let i = initialLimit; i <= initialLimit + 9; i++) {
          pages.push(i)
          if (i >= lastPage) {
            break
          }
        }
      }
      return pages
    },
  },

  mounted () {

  },

  created () {
  },

  destroyed () {
  },

}
</script>

<style scoped>

</style>

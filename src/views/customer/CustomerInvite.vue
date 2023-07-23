<template>
  <div class="container" style="height: 100vh;">
    <br>
    <br>
    <div class="row py-4">
      <div class="col-md-12">

        <div class="row">
          <div class="col-sm-12">
            <div class="row">
              <div class="form-inline mb-3">

                <div class="form-group mb-2 mr-5">
                  <span class="ml-4 font-weight-bold lead" style="font-size: 22px;"><code>CSV PARSER</code></span>
                </div>

                <div class="form-group">
                  <input
                      type="file"
                      id="customer-csv-file"
                      class="form-control-file"/>
                </div>


                <div class="form-group">
                  <button
                      type="button"
                      class="btn btn-sm btn-outline-primary"
                      @click="save"
                  >
                    <font-awesome-icon icon="plus"/>
                    <span style="font-size: 13px">
                        Parse File
                      </span>
                    <span class="spinner-border spinner-border-sm" role="status" v-if="fetchCustomerInviteLoading">
                     <span class="sr-only">Loading...</span>
                    </span>
                  </button>

                  <span style="font-size: 13px" class="text-danger ml-2" v-if="isEmpty">
                    Nothing to parse
                  </span>

                </div>

              </div>

            </div>
          </div>


          <!--          <div class="col-sm-3 text-right">-->
          <!--            <input-->
          <!--                type="file"-->
          <!--                id="customer-csv-file"-->
          <!--                class="form-control-file"/>-->
          <!--          </div>-->

          <!--          <div class="col-sm-3 text-left">-->


          <!--            <button-->
          <!--                type="button"-->
          <!--                class="btn btn-sm btn-outline-primary"-->
          <!--                @click="save"-->
          <!--            >-->
          <!--              <font-awesome-icon icon="plus"/>-->
          <!--              <span style="font-size: 13px">-->
          <!--                Parse File-->
          <!--              </span>-->

          <!--              <span class="spinner-border spinner-border-sm" role="status" v-if="fetchCustomerInviteLoading">-->
          <!--                <span class="sr-only">Loading...</span>-->
          <!--              </span>-->

          <!--            </button>-->

          <!--            <span style="font-size: 13px" class="text-danger" v-if="isEmpty">-->
          <!--                Nothing to parse-->
          <!--            </span>-->


          <!--          </div>-->


        </div>

        <!--  pagination      -->
        <div class="row py-1">
          <div class="col-md-9">
            <div class="row">
              <div class="col-5">
              </div>
            </div>
          </div>
        </div>


        <!-- table  -->
        <div id="table-section" class="py-3">
          <div class="row justify-content-center">
            <div class="col col-md">
              <div class="table table-responsive border-top table-hover"
                   style="overflow-x: hidden !important; height: 350px">

                <base-table :max-height="330" :loaderColspan="10">
                  <template v-slot:table-header>
                    <tr>
                      <th style="width: 5%;">
                      </th>
                      <!--                      <th style="width: 5%;">-->
                      <!--                        #-->
                      <!--                      </th>-->
                      <th style="width: 10%;" class="text-center align-middle p-1">Type</th>
                      <th style="width: 10%;" class="text-center align-middle p-1">Date</th>
                      <th style="width: 12%;" class="text-center align-middle p-1">Time</th>
                      <th style="width: 10%;" class="text-center align-middle p-1">Customer Number</th>
                      <th style="width: 8%;" class="text-center align-middle p-1">First Name</th>
                      <th style="width: 10%;" class="text-center align-middle p-1">Email</th>
                      <th style="width: 10%;" class="text-center align-middle p-1">Phone</th>
                      <th class="text-center align-middle p-1">Status</th>
                      <th class="text-center align-middle p-1">Sent Via</th>
                    </tr>
                  </template>

                  <template v-slot:table-body>

                    <template v-if="isReloading">
                      <tr>
                        <td colspan="100%">
                          <span class="spinner-border text-primary" role="status" aria-hidden="true"></span>
                          <span style="size: 20px">
                            Loading ...
                          </span>
                        </td>
                      </tr>
                    </template>

                    <template v-else>
                      <tr v-for="(customerInvite, index) in customerInvites">
                        <td class="text-center align-middle p-0">
                        <span class="font-weight-bold custom-title-task-color"
                        >
                          {{ index + 1 }}
                        </span>
                        </td>

                        <td class="text-center align-middle p-0">
                          {{ customerInvite.transType }}
                        </td>

                        <td class="text-center align-middle p-0">
                          {{ customerInvite.date }}
                        </td>
                        <td class="text-center align-middle p-0">
                          {{ customerInvite.transTime }}
                        </td>
                        <td class="text-center align-middle p-0">
                          {{ customerInvite.custNum }}
                        </td>
                        <td class="text-center align-middle p-0">
                          {{ customerInvite.custFname }}
                        </td>
                        <td class="text-center align-middle p-0">
                          {{ customerInvite.custEmail }}
                        </td>


                        <td class="text-center align-middle p-0">
                          {{ customerInvite.custPhone }}
                        </td>

                        <td class="text-center align-middle p-0">
                          <template v-if="customerInvite.isSent">
                            <!--                            <span class="font-weight-bold text-success">-->
                            <!--                            SENT-->
                            <!--                          </span>-->
                            <font-awesome-icon icon="check" style="transform: scale(1.7); color:#28a745;"
                                               title="COMPLETE"/>
                          </template>


                          <template v-if="!customerInvite.isSent">
                            <span class="font-weight-bold text-danger">
                            NOT SENT
                          </span>
                          </template>
                        </td>

                        <td class="text-center align-middle p-0">
                          {{ customerInvite.isSentVia }}
                        </td>

                      </tr>

                      <tr v-if="customerInvites ? (customerInvites.length == 0) : '' ">
                        <td colspan="100%" class="bg-light-danger font-weight-bolder">
                          <p class="text-center mt-3">No Results</p>
                        </td>
                      </tr>

                    </template>


                  </template>

                </base-table>


              </div>
            </div>
          </div>
        </div>


      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {AlertService} from "@/service/AlertService";
import {vueAppMixin} from "@/mixins/vueAppMixin";

export default {
  name: "User",

  mixins: [vueAppMixin],

  data() {
    return {
      file: null,
      fetchCustomerInviteLoading: false,
      isEmpty: false,

      // Generating Modal IDs
      generateCreateTask: 'new-generate-task-modal',
      generateUpdateTask: 'update-generate-task-modal',


    }

  },


  /** methods**/
  methods: {
    ...mapActions([
      'set_customerInvites',
      'save_customer_invite_csv'
    ]),

    async save() {
      let file = document.getElementById('customer-csv-file').files[0]
      if (!file) {
        this.isEmpty = true;
      }

      if (file) {
        this.isEmpty = false;
        this.fetchCustomerInviteLoading = true
        const formData = new FormData()
        formData.append('csv_file', file ? file : null)

        let saveCsv = await this.save_customer_invite_csv(formData);

        if (saveCsv) {
          await AlertService.successAlert('Processing. Please Wait', 'Customer Invite CSV')
          if (!this.isReloading) {
            this.fetchCustomerInviteLoading = false
            AlertService.successAlert('Parse Complete', 'Customer Invite CSV')
            document.getElementById('customer-csv-file').value = '';
          }
          await this.set_customerInvites()
        }
      }


    },


  },

  /** watch **/
  watch: {},

  /**  computed  **/
  computed: {
    ...mapGetters(
        [
          'customerInvites',
          'isReloading'
        ],
    ),
  },

  /**  created  **/
  async created() {
    await this.set_customerInvites();
  },


}
</script>

<style scoped>

</style>
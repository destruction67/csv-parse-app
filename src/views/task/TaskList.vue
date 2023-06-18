<template>
  <div class="container" style="height: 100vh;">
    <br>
    <br>
    <div class="row py-4">
      <div class="col-md-12">

        <div class="row">
          <div class="col-sm-4">
            <div class="row">

              <div class="form-inline mb-3">
                <div class="form-group mb-2 mr-5">
                  <span class="ml-4 font-weight-bold lead" style="font-size: 22px;"><code>List of Tasks</code></span>
                </div>
                <div class="form-group ">
                  <base-outline-button btn-size="sm"
                                       btn-color="success"
                                       data-toggle="modal"
                                       data-target="#new-task-modal"
                                       data-backdrop="static"
                                       data-keyboard="false"
                                       class="btn-xss"
                  >
                    <font-awesome-icon icon="plus"/>
                    <span style="font-size: 13px">
                      Add Task
                    </span>
                  </base-outline-button>
                </div>
              </div>

            </div>
          </div>


          <div class="col-sm-3">
            <div class="input-group mb-2 mr-sm-2">
              <input
                  type="text"
                  class="form-control form-control"
                  id="formdata-searchvalue"
                  placeholder="Search Task"
                  v-model="taskFormParam.searchValue"
                  @keypress.enter="searchTask"
              >

              <button class="btn btn-sm btn-primary" @click="searchTask">
                <font-awesome-icon icon="search"/>
                Search
              </button>
            </div>
          </div>

          <div class="col-sm-2">
            <div class="form-group row">
              <label for="list-count" class="col-sm-3 col-form-label">Count</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-7 text-left">
                <select name="listCount" id="list-count" class="form-control custom-select-sm"
                        v-model="taskFormParam.count"
                        @change="on_change_count"
                >
                  <option :value="count" v-for="(count ,index ) in counts">{{ count }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-sm-3">
            <div class="form-group row">
              <label for="list-stat" class="col-sm-3 col-form-label">Status</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-7 text-left">
                <select name="listCount" id="list-stat" class="form-control custom-select-sm"
                        @change="on_change_status">
                  <option :value="null">--select--</option>
                  <option :value="status.key" v-for="(status,index) in statuses" :key="status.id">
                    {{ status.placeholder }}
                  </option>
                </select>
              </div>
            </div>
          </div>


        </div>

        <!--  pagination      -->
        <div class="row py-1">
          <div class="col-md-9">
            <div class="row">
              <div class="col-5">
                <task-mgmt-pagination :page-object="taskPagination" @settingPage="set_this_page"></task-mgmt-pagination>
              </div>
            </div>
          </div>
        </div>


        <!-- table  -->
        <div id="table-section" class="py-3">
          <div class="row justify-content-center">
            <div class="col col-md">
              <div class="table table-responsive border-top"
                   style="overflow-x: hidden !important; height: 350px">

                <base-table :max-height="330" :loaderColspan="10">
                  <template v-slot:table-header>
                    <tr>
                      <th style="width: 5%;">
                      </th>
                      <!--                      <th style="width: 5%;">-->
                      <!--                        #-->
                      <!--                      </th>-->
                      <th style="width: 20%;" class="text-center align-middle p-1">Title</th>
                      <th style="width: 20%;" class="text-center align-middle p-1">Description</th>
                      <th style="width: 12%;" class="text-center align-middle p-1">Due Date</th>
                      <th style="width: 10%;" class="text-center align-middle p-1">Status</th>
                      <th style="width: 15%;" class="text-center align-middle p-1"></th>
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
                      <tr v-for="(task, index) in tasks">
                        <td class="text-center align-middle p-0">
                          <input
                              type="checkbox"
                              class="form-check form-check-inline ml-2 mt-2"
                              style="transform: scale(1.5);"
                              placeholder="---"
                              v-model="task.status"
                              @change="on_change_mark_task(task.id, task.status)"
                          />
                        </td>
                        <!--                      <td class="text-center align-middle p-0">{{ index + 1 }}</td>-->
                        <td class="text-center align-middle p-0">
                        <span class="font-weight-bold custom-title-task-color"
                              :class="{ 'mark-as-done' : task.status }"

                        >
                          {{ task.title }}
                        </span>
                        </td>

                        <td class="text-center align-middle p-0" :class="{ 'mark-as-done' : task.status }">
                          {{ task.description }}
                        </td>

                        <td class="text-center align-middle p-0" :class="{ 'mark-as-done' : task.status }">
                          {{ task.due_date }}
                        </td>

                        <td class="text-center align-middle p-0">
                          <template v-if="task.status">
                          <span class="font-weight-bold text-success">
                            COMPLETE
                          </span>
                            &nbsp;
                            <font-awesome-icon icon="check" style="transform: scale(1.7); color:#28a745;"
                                               title="COMPLETE"/>
                          </template>

                          <template v-if="!task.status">
                            <font-awesome-icon icon="minus" style="transform: scale(1.7);"
                                               class="text-secondary"
                                               title="INACTIVE"/>
                          </template>

                        </td>

                        <td>

                          <base-outline-button btn-size="sm"
                                               data-toggle="modal"
                                               data-target="#view-task-modal"
                                               data-backdrop="static"
                                               data-keyboard="false"
                                               class="mr-3 btn-xs"
                                               @click="viewTask(task.id)"
                          >
                            <font-awesome-icon icon="bars"/>
                            View
                          </base-outline-button>

                          <base-outline-button btn-size="sm"
                                               btn-color="danger"
                                               class="btn-xs"
                                               @click="delete_task(task.id)"
                          >
                            <font-awesome-icon icon="trash"/>
                            Delete
                          </base-outline-button>

                        </td>
                      </tr>

                      <tr v-if="tasks ? (tasks.length == 0) : '' ">
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

    <!--    Modal Create-->
    <base-modal :id="newTaskModal" :lg_width="true">
      <template slot="custom-header">
        <h5 class="modal-title">NEW TASK</h5>
      </template>

      <template slot="custom-body">
        <div class="row ml-1">
          <div class="col-md-12 text-left ml-2">

            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Title</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-5">
                <input type="text"
                       class="form-control form-control"
                       placeholder="---"
                       v-model="newTask.title"
                />
              </div>
            </div>


            <div class="form-group row mt-2">
              <label class="col-sm-3 col-form-label">Description</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-7">
                <textarea type="text"
                          class="form-control form-control"
                          placeholder="---"
                          v-model="newTask.description"
                />
              </div>
            </div>

            <div class="form-group row mt-2">
              <label class="col-sm-3 col-form-label">Due Date</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-5">
                <input type="date"
                       class="form-control form-control"
                       placeholder="---"
                       v-model="newTask.due_date"
                />
              </div>
            </div>

          </div>
        </div>
      </template>

      <template slot="custom-footer">
        <button
            v-show="!isEditable"
            type="button"
            class="btn btn-sm btn-outline-success"
            @click="createNewTask"
        >
          <font-awesome-icon icon="save"/>
          SAVE
        </button>

        <button
            v-show="!isEditable"
            type="button"
            class="btn btn-sm btn-outline-secondary"
            data-dismiss="modal">
          <font-awesome-icon icon="undo"/>
          CLOSE
        </button>
      </template>
    </base-modal>


    <!--Modal View-->
    <base-modal :id="viewTaskModal" :lg_width="true">
      <template slot="custom-header">
        <h5 class="modal-title">EDIT TASK</h5>
      </template>

      <template slot="custom-body">
        <div class="row ml-1">
          <div class="col-md-12 text-left ml-2">

            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Title</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-5">
                <input type="text"
                       class="form-control form-control"
                       placeholder="---"
                       :disabled="!isEditable"
                       v-model="taskData.title"
                />
              </div>
            </div>


            <div class="form-group row mt-2">
              <label class="col-sm-3 col-form-label">Description</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-5">
                <input type="text"
                       class="form-control form-control"
                       placeholder="---"
                       :disabled="!isEditable"
                       v-model="taskData.description"
                />
              </div>
            </div>

            <div class="form-group row mt-2">
              <label class="col-sm-3 col-form-label">Due Date</label>
              <span class="col-form-label">:</span>
              <div class="col-sm-5">
                <input type="date"
                       class="form-control form-control"
                       placeholder="---"
                       :disabled="!isEditable"
                       v-model="taskData.due_date"
                />
              </div>
            </div>


          </div>
        </div>
      </template>

      <template slot="custom-footer">
        <button type="button"
                class="btn btn-sm btn-warning"
                v-show="!isEditable"
                @click="isEditable = true"
        >
          <font-awesome-icon icon="edit"/>
          EDIT
        </button>

        <button type="button"
                class="btn btn-sm btn-outline-secondary"
                data-dismiss="modal"
                v-show="!isEditable">
          <font-awesome-icon icon="undo"/>
          CLOSE
        </button>

        <button type="button"
                class="btn btn-sm btn-outline-success"
                v-show="isEditable"
                @click="updateTask"
        >
          <font-awesome-icon icon="save"/>
          SAVE
        </button>

        <button type="button" class="btn btn-sm btn-outline-danger"
                v-show="isEditable"
                @click="set_cancel_edit"
        >
          <font-awesome-icon icon="times"/>
          CANCEL
        </button>
      </template>
    </base-modal>


    <base-generating-modal :id="generateCreateTask">
      <template slot="custom-title">
        Creating New Task ...
      </template>
    </base-generating-modal>

    <base-generating-modal :id="generateUpdateTask">
      <template slot="custom-title">
        Updating ...
      </template>
    </base-generating-modal>


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

      counts: [
        5, 10, 15, 20, 30, 40, 50
      ],

      statuses: [
        {
          id: 1,
          key: '',
          placeholder: 'All',
        },
        {
          id: 2,
          key: 1,
          placeholder: 'Complete',
        },
        {
          id: 3,
          key: 0,
          placeholder: 'Incomplete',
        },
      ],

      isEditable: false,

      newTask: {},

      taskData: {},

      pageLastLeft: 1,

      taskCheckbox: false,

      //CRUD Modal IDs
      newTaskModal: 'new-task-modal',
      viewTaskModal: 'view-task-modal',

      // Generating Modal IDs
      generateCreateTask: 'new-generate-task-modal',
      generateUpdateTask: 'update-generate-task-modal',


    }

  },


  /** methods**/
  methods: {
    ...mapActions([
      'set_tasks',
      'set_task',
      'create_task',
      'update_task',
      'delete_task',
      'update_mark_task'
    ]),

    async on_change_mark_task(taskId, status) {
      // console.log(e, 'what')
      // console.log(status, 'checkbox status')
      let params = {
        id: taskId ? taskId : '',
        status: status,
      };

      let update_mark_task = await this.update_mark_task(params);
      if (update_mark_task) {
        await AlertService.successAlert("Update Status", 'Mark Task');
      }
    },

    on_change_status(e) {
      this.taskFormParam.status = e.target.value;
      this.set_tasks(this.taskFormParam);
    },


    set_this_page(e) {
      this.taskFormParam.searchValue = ''
      this.taskPagination.currentPage = e
      this.taskFormParam.page = e
      this.pageLastLeft = e
      this.set_tasks(this.taskFormParam)
    },

    on_change_count(e) {
      this.taskFormParam.page = 1
      this.taskFormParam.searchValue = ''
      this.pageLastLeft = 1
      this.taskFormParam.count = e.target.value
      this.set_tasks(this.taskFormParam)
    },

    searchTask() {
      if (this.taskFormParam.searchValue === '') {
        this.taskFormParam.page = this.pageLastLeft
        this.set_tasks(this.taskFormParam)
      }

      if (this.taskFormParam.searchValue) {
        this.taskFormParam.page = 1
      }

      this.set_tasks(this.taskFormParam)
    },


    async createNewTask() {
      this.showModal(this.generateCreateTask);

      let params = {
        title: this.newTask.title ?? '',
        description: this.newTask.description ?? '',
        due_date: this.newTask.due_date ?? '',
        status: 0,
      };

      let tasks = await this.create_task(params);

      if (!tasks) {
        this.hideModal(this.generateCreateTask);
      }

      if (tasks) {
        this.hideModal(this.generateCreateTask);
        this.hideModal('new-task-modal');
        AlertService.successAlert('Create new task successful', 'New Task');
        this.newTask = {};
        this.set_tasks();
      }
    },

    async updateTask() {
      this.showModal(this.generateUpdateTask);

      let params = {
        id: this.taskData.id ?? '',
        title: this.taskData.title ?? '',
        description: this.taskData.description ?? '',
        due_date: this.taskData.due_date ?? '',
      };

      let tasks = await this.update_task(params);

      if (!tasks) {
        this.hideModal(this.generateUpdateTask);
      }

      if (tasks) {
        this.hideModal(this.generateUpdateTask);
        this.hideModal('view-task-modal');
        AlertService.successAlert('Update task successful', 'Edit Task');
        this.isEditable = false
      }
    },


    viewTask(taskId) {
      this.set_task(taskId);
    },

    set_cancel_edit(e) {
      this.isEditable = false
      this.taskData = Object.assign({}, this.task);
    },


  },

  /** watch **/
  watch: {
    'task'() {
      this.taskData = Object.assign({}, this.task);
    },
  },

  /**  computed  **/
  computed: {
    ...mapGetters(
        [
          'tasks',
          'task',
          'isReloading',
          'taskFormParam',
          'taskPagination',
        ],
    ),
  },

  /**  created  **/
  async created() {
    this.set_tasks();
  },


}
</script>

<style scoped>

</style>
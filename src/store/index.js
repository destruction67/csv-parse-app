import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Task from "@/store/modules/task/task_list.module";

const modules = () => {
  return {
    Task,
  }
}

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: modules(),
  plugins: [
  ],
  storage: window.localStorage
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Customer from "@/store/modules/customer/customer.module";

const modules = () => {
  return {
    Customer,
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

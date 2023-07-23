import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "@/views/Main";
import CustomerInvite from "@/views/customer/CustomerInvite";


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth: false,
    },
    children:[
      {
        path: '',
        name: 'CustomerInvite',
        component: CustomerInvite,
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


// router.beforeEach(function(to, from, next) {
//
// });

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from "@/views/Main";
import TaskList from "@/views/task/TaskList";


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
        name: 'TaskList',
        component: TaskList,
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

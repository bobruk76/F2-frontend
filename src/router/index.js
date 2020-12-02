import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from './../components/Questions/template.vue';
import Login from './../components/Login/template.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

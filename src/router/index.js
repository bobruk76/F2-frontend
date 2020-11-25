import Vue from 'vue'
import VueRouter from 'vue-router'
import Questions from './../components/Questions/template.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Questions',
    component: Questions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

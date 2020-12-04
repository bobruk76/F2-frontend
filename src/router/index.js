import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import Questions from './../components/Questions/template.vue';
import Login from './../components/Login/template.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
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

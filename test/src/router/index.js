import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/container/register.vue'
import Login from '@/container/login.vue'
import Index from '@/container/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    }
  ]
})

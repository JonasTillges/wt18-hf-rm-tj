import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import _404 from '@/components/_404'
import Login from '@/components/Login'
import List from '@/components/List'
import Post from '@/components/Post'
import Verification from '@/components/Verify'
import Activation from '@/components/Activation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      component: Home
    },
    {
      path: '/register',
      name: 'Registrierung',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/list',
      name: 'Liste',
      component: List 
    },
    {
      path: '/post',
      name: 'Beitrag',
      component: Post
    },
    {
      path: '/post/:id',
      name: 'Beitrag xyz',
      component: Post
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verification
    },
    {
      path: '/activate',
      name: 'Activation',
      component: Activation
    }   

  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import _404 from '@/components/_404'
import Login from '@/components/Login'
import List from '@/components/List'
import Post from '@/components/Post'
import Compose from '@/components/Compose'

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
      name: '_404',
      component: _404
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
      name: 'Beitrag verfassen',
      component: Compose
    },
    {
      path: '/post/:id',
      name: 'Beitrag',
      component: Post
    }    
  ]
})

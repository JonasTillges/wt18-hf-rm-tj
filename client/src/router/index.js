import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import List from '@/components/List'
import Post from '@/components/Post'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
    }    
  ]
})

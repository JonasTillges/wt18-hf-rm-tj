import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import NotFound from '@/components/NotFound'
import Login from '@/components/Login'
import AllPosts from '@/components/AllPosts'
import Post from '@/components/Post'
import User from '@/components/User'
import Compose from '@/components/Compose'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
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
      name: 'list',
      component: AllPosts
    },
    {
      path: '/post',
      name: 'Beitrag verfassen',
      component: Compose
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/user',
      name: 'listPosts',
      component: User
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import NotFound from '@/components/NotFound'
import Login from '@/components/Login'
import List from '@/components/List'
import Post from '@/components/Post'
import User from '@/components/User'
import Compose from '@/components/Compose'
import Verification from '@/components/Verify'
import Activation from '@/components/Activation'
import AuthService from '@/services/Auth';

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
      name: 'Post',
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
    },
    {
      path: '/user',
      name: 'listPosts',
      component: User
    }
  ]
})

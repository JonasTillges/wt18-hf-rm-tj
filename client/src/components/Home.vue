<template>
  <div>
    <router-link to="/register">Navigate to RegisterPage</router-link>
    <router-link to="/login">Navigate to Login</router-link>
    <router-link to="/list">Navigate to List</router-link>
    <router-link to="/post">Navigate to Post</router-link>
  </div>
</template>

<script>

export default {
  name: "Home",
  methods: {
    registerPage: function(){
      console.log('hallo');
      router.push({ path: '/register' })
    }
  }
}
</script>

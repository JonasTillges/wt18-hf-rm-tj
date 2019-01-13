<template>
  <div>
    <h1>{{ username }}</h1>
    <router-link to="/register">Navigate to RegisterPage</router-link>
    <router-link to="/login">Navigate to Login</router-link>
    <router-link to="/list">Navigate to List</router-link>
    <router-link to="/post">Navigate to Post</router-link>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "home",
  data() {
    return {
      username: ''
    }
  },
  methods: {
    registerPage: function(){
      console.log('hallo');
      router.push({ path: '/register' })
    },
    logout: function(){
      firebase.auth().signOut().then(()=>{
        this.$router.replace('login');
      })
    }
  },
  mounted() {
      var user = firebase.auth().currentUser;
      var name, email, uid;

      if (user != null) {
        uid = user.uid;
        email = user.email;
        this.username = email;
        console.log(name)
      }else{
        console.log('Kein aktueller User')
        //show register / login button
      }
  }
}
</script>

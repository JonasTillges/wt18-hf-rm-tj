<template>
  <div >
    <h>Login</h>
    <br>

      <input 
      type="email" 
      name="email" 
      v-model="email" 
      placeholder="Email"/>
    <br>
      <input  
      type="password" 
      name="password" 
      v-model="password" 
      placeholder="Password"/>

      <br>
      <button 
      @click="login">Login</button>
      <br>
      <router-link to="/register">Ich habe noch kein Account.</router-link>
      <h1>{{ message }}</h1>
    
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import firebase from 'firebase'


export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async register(){
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log("button clicked", this.email,this.password);
      console.log(response.data);
      this.message = response.data.message;
    },
    login: function() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (data) => {
          let user = data.user;
          console.log('try verified');
          if(user.emailVerified){
            console.log('User verified email.');
          }
          this.$router.replace('home');
        },
        (err) => {
          alert(err.message);
        }
      );
    }

  }
}
</script>

<template>
  <div >
    <h>Register</h>
    <br>
      <input 
      type="name" 
      name="name" 
      v-model="name" 
      placeholder="Username"/>
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
      @click="singUp">Register</button>
      <br>
      <router-link to="/Login">Ich habe schon ein Account.</router-link>
      <h1>{{ message }}</h1>
    
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import firebase from 'firebase'


export default {
  name: 'register',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      message: ''
    }
  },
  methods: {
    singUp: function() {
      
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          var user = firebase.auth().currentUser;
          user.sendEmailVerification().then((verification) => {
            console.log('success');
            console.log(verification);
          }).catch(function(error) {
          // An error happened.
          });
          var uid = user.uid;
          AuthenticationService.register({
              email: this.email,
              name: this.name,
              uid: uid
          });
          console.log(uid);
          this.$router.replace('verify');
        },
        (err) => {
          alert(err.message);
        }
      );
    }

  }
}
</script>

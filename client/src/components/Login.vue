<template>
  <div >
    <h1>Login</h1>
              <div>
                <div class="form-group floating-label-form-group text-white mb-0 pb-2">
                  <label>Email Adresse</label>
                  <input 
                  size="75"
                  v-model="email"
                  name = "email"
                  type="email" placeholder="Email Addresse">
              
                </div>
              </div>
              <div>
                <div class="form-group floating-label-form-group mb-0 pb-2">
                  <label>Passwort</label>
                  <input  size="75" v-model="password" name="password" type="password" placeholder="Passwort">
              
                </div>
              </div>
      <br>
      <button @click="login" class="btn btn-primary btn-xl">Login</button>
      <br>
      <router-link to="/register">Ich habe noch keinen Account.</router-link>
      <h1>{{ message }}</h1>
    
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import ActionService from '@/services/ActionService'
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
          console.log(user.uid);
          ActionService.getUserData({
              params: {
                uid: 'JBYg7hkh8Re1MNNQGvCvnGyRFdO2'
              }
            }).then((response) => {
                console.log(response.data.user);
            });
            this.$router.replace('/');
          
        },
        (err) => {
          alert(err.message);
        }
      );
    }

  }
}
</script>

<template>
  <div class="container">
    <h1>Logge dich eich</h1>
    <hr>
    <div>
      <div class="form-group">
        <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required="required" placeholder="deine@email.bitte">
        <small id="emailHelp" class="form-text text-muted">Deine Email die du bei der Registrierung genutzt hast</small>
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" id="password" required="required" placeholder="Dein Passwort">
      </div>
      <div class="form-group">
        <button @click="login" class="btn btn-primary btn-xl">Login</button>
      </div>
      <br/>
      <i class="fa fa-sign-in" aria-hidden="true"></i>
      <router-link to="/register">Ich habe noch keinen Account.</router-link>
    </div>

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
          console.log('USER')
          console.log(user);
          console.log(user.uid);
          ActionService.getUserData({
                uid: user.uid
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

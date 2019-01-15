<template>
  <div>
    <h1 class="col-lg-8 mx-auto">Register</h1>
    <br>
   
        
    

  <div>
          <div class="col-lg-8 mx-auto">
            <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
            <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
            
              <div>
                <div class="floating-label-form-group mb-0 pb-2" >
                  <label>Username</label>
                  <input size="75" v-model="name" name="name" type="text" placeholder="Username">
                </div>
              </div>
              <div>
                <div class="form-group floating-label-form-group text-white mb-0 pb-2">
                  <label>Email Adresse</label>
                  <input 
                  size ="75"
                  v-model="email"
                  name = "email"
                  type="email" placeholder="Email Addresse">
              
                </div>
              </div>
              <div>
                <div class="form-group floating-label-form-group mb-0 pb-2">
                  <label>Passwort</label>
                  <input size="75" v-model="password" name="password" type="password" placeholder="Passwort">
              
                </div>
              </div>
              <div>
                <button  @click="signUp" class="btn btn-primary btn-xl">Registrieren</button>
              </div>
              <br/>
              <router-link to="/Login">Ich habe schon einen Account.</router-link>
          </div>
        </div>
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
    signUp: function() {
      
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

<template>
    
  <div>
      <h1>{{ name }}</h1>
     <!-- Header -->
    <header class="masthead bg-primary text-white text-center">
      <div class="container">
        <img class="img-fluid mb-5 d-block mx-auto" src="static/img/IMG_0122.PNG" alt="">
        <h1 class="text-uppercase mb-0">Finden Sie die Antwort auf Ihre Frage</h1>
        
        <h2 class="font-weight-light mb-0">Fragen stellen - Antworten geben - Entspannter studieren</h2>
      </div>
      <figure >
        <img class="star-img" src="static/img/white-star.png">
      </figure>
    </header>

    <!-- About Section -->
    <section class="mb-0" id="about">
      <div class="container">
        <h2 class="text-center text-uppercase">Über das Forum</h2>
        <hr/>
        <figure>
          <img class="star-img" src="static/img/black-star.png">
        </figure>
      
        <div class="row">
          <div class="col-lg-4 ml-auto">
            <p class="lead">Dieses Forum bietet Ihnen die Möglichkeit Fragen an alle Mitglieder zu stellen - gleichzeitig können Sie Fragen Ihrer Kommilitonen beantworten. Gegliedert durch Tags lassen sich Fragen spezifizieren und geeignete Antworten finden. </p>
          </div>
          <div class="col-lg-4 mr-auto">
            <p class="lead"> Eine bequeme Alternative zu nervigen Gruppenchats. <br/>Durch Moderatoren werden überflüssige Fragen abgefischt. <br/>Hier finden Sie alle Antworten auf Ihre Fragen kompakt und gegliedert.</p>
          </div>
        </div>
        
      </div>
    </section>
    
    <!-- Register Section -->
    <section class="bg-primary" >   
      <div>
        <h2 class="text-center text-uppercase text-white">Registrierung
        </h2>
        <div>
        <figure>
                  <img class="star-img" src="static/img/white-star.png">
        </figure>
      </div>
        <div>
          <div class="col-lg-8 mx-auto">
            <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
            <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
            
              <div>
                <div class="floating-label-form-group mb-0 pb-2" >
                  <label>Username</label>
                  <input v-model="name" name="name" type="text" placeholder="Username">
                </div>
              </div>
              <div>
                <div class="form-group floating-label-form-group text-white mb-0 pb-2">
                  <label>Email Adresse</label>
                  <input 
                  v-model="email"
                  name = "email"
                  type="email" placeholder="Email Addresse">
              
                </div>
              </div>
              <div>
                <div class="form-group floating-label-form-group mb-0 pb-2">
                  <label>Passwort</label>
                  <input v-model="password" name="password" type="password" placeholder="Passwort">
              
                </div>
              </div>
              <div>
                <button  @click="signUp" class="btn btn-primary btn-xl">Registrieren</button>
              </div>
            
          </div>
        </div>
      </div>
    </section>
  </div>
    
</template>

<script>
import firebase from 'firebase'
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: "home",
  data() {
    return {
      name: '', 
      email: '', 
      password: ''
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
    },
    signUp: function (){
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
  },
  
  mounted() {
      var user = firebase.auth().currentUser;
      var name, email, uid;

      if (user != null) {
        
        uid = user.uid;
        email = user.email;
        this.name = email;
        console.log(user.email)
      }else{
        console.log('Kein aktueller User')
        //show register / login button
      }
  }
}
</script>
<div>
                <div class="form-group floating-label-form-group mb-0 pb-2">
                  <label>Passwort</label>
                  <input v-model="password" name="password" type="password" placeholder="Passwort">
              
                </div>
              </div>
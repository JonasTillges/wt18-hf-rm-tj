<template>
    
  <div>
     <!-- Header -->
    <header class="masthead bg-primary text-white text-center">
      <div class="container">
        <h1 class="text-uppercase">Finde deine Antwort auf deine Frage</h1>
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
        <h2 class="text-center text-uppercase text-white">Registriere dich jetzt</h2>
        <div>
        <figure>
          <img class="star-img" src="static/img/white-star.png">
        </figure>
      </div>
        <div>
          <div class="col-lg-8 mx-auto">
            <div>
              <div class="form-group">
                <input v-model="name" type="text" class="form-control" id="name" aria-describedby="nameHelp" required="required" placeholder="Dein Username">
                <small id="nameHelp" class="form-text">Dein Username wird dich hier repräsentieren.</small>
              </div>
              <div class="form-group">
                <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required="required" placeholder="deine@email.bitte">
                <small id="emailHelp" class="form-text">Wir benötigen deine Email um dir einen Aktivierungslink zu schicken.</small>
              </div>
              <div class="form-group">
                <input v-model="password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" required="required" placeholder="Dein Passwort">
                <small id="passwordHelp" class="form-text">Benutze bitte ein Passwort aus mind. 6 Zeichen, sowie mit Groß- und Kleinschreibung.</small>
              </div>
              <div class="form-group">
                <button  @click="signUp" class="btn btn-secondary btn-xl">Registrieren</button>
              </div>
              <br/>
              <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              <router-link to="/Login">Ich habe schon einen Account.</router-link>
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
      console.log(this.email, this.password);
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          var user = firebase.auth().currentUser;

          console.log(user);

          user.sendEmailVerification().then((verification) => {
            console.log('success');
            console.log(verification);
          }).catch(function(error) {
          // An error happened.
          });

          var uid = user.uid;
          console.log({
            email: this.email,
            name: this.name,
            uid: uid
          });
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
        this.$data.name = email;
        console.log(name)
      }else{
        console.log('Kein aktueller User')
        //show register / login button
      }
  }
}
</script>

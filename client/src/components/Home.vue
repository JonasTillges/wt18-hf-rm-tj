<template>
    
  <div>
      <h1>{{ username }}</h1>
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
    <section id="contact" class="bg-primary" >   
      <div class="container">
        <h2 class="text-center text-uppercase text-white">Registrierung
        </h2>
        <div>
        <figure>
                  <img class="star-img" src="static/img/white-star.png">
        </figure>
      </div>
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
            <!-- The form should work on most web servers, but if the form is not working you may need to configure your web server differently. -->
            <form name="sentMessage" id="contactForm" novalidate="novalidate">
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2" >
                  <label>Nickname</label>
                  <input class="form-control" id="name" type="text" placeholder="Nickname" required="required" data-validation-required-message="Please enter your name.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group text-white controls mb-0 pb-2">
                  <label>Email Adresse</label>
                  <input class="form-control" id="email" type="email" placeholder="Email Addresse" required="required" data-validation-required-message="Please enter your email address.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Passwort</label>
                  <input class="form-control" id="phone" type="password" placeholder="Passwort" required="required" data-validation-required-message="Please enter your phone number.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              
              <div id="success"></div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-xl" id="sendMessageButton">Abschicken</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
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

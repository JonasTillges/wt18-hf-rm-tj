<template>
  <div class="container">
    <h1>Registriere dich jetzt</h1>
    <hr>
    <div>
        <div class="form-group">
          <input v-model="name" type="text" class="form-control" id="name" aria-describedby="nameHelp" required="required" placeholder="Dein Username">
          <small id="nameHelp" class="form-text text-muted">Dein Username wird dich hier repräsentieren.</small>
        </div>
        <div class="form-group">
          <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required="required" placeholder="deine@email.bitte">
          <small id="emailHelp" class="form-text text-muted">Wir benötigen deine Email um dir einen Aktivierungslink zu schicken.</small>
        </div>
        <div class="form-group">
          <input v-model="password" type="password" class="form-control" id="password" aria-describedby="passwordHelp" required="required" placeholder="Dein Passwort">
          <small id="passwordHelp" class="form-text text-muted">Benutze bitte ein Passwort aus mind. 6 Zeichen, sowie mit Groß- und Kleinschreibung.</small>
        </div>
        <div class="form-group">
          <button  @click="checkForm" class="btn btn-primary btn-xl">Registrieren</button>
        </div>
        <br/>
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <router-link to="/Login">Ich habe schon einen Account.</router-link>
    </div>
  </div>
</template>

<script>
import Auth from '@/services/Auth'
import { EventBus } from '@/global/event-bus.js';

export default {
  name: 'register',
  data () {
    return {
      errors: [],
      email: '',
      name: '',
      password: '',
      message: ''
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (this.name == "" && this.name.length < 2) {
        EventBus.$emit('notification', "Name required.");
        this.errors.push('Name required.');
      }
      if (this.email == "") {
        EventBus.$emit('notification', "Email required!");
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        EventBus.$emit('notification', "Valid email required.");
        this.errors.push('Valid email required.');
      }

      if (!this.errors.length) {
        this.signUp();
      }

      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    signUp: function() {
      Auth.register(this.email, this.name, this.password);
    }
  }
}
</script>

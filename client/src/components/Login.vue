<template>
  <div class="container">
    <h1>Logge dich ein</h1>
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
import AuthService from '@/services/Auth'

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
    login: function() {
      AuthService.loginUser(this.email, this.password);
    }
  }
}
</script>

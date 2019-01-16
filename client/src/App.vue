<template>

  <div id="app">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-secondary text-uppercase" id="mainNav">
      <router-link class="navbar-brand" to="/">
        <img class="navigation_logo" src="static/img/IMG_0122.PNG" alt="">
       <span class="navigation_project"></span>StudyUp
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <i class="fa fa-th-list" aria-hidden="true"></i>
            <router-link to="/list">Antworten</router-link>
          </li>
          <li class="nav-item">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
            <router-link to="/post">Fragen</router-link>
          </li>
          <li class="nav-item">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
            <router-link to="/register">Register</router-link>
          </li>
          <li class="nav-item">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <router-link to="/login">Login</router-link>
          </li>
        </ul>
        <span class="navbar-text">
          USERNAME
        </span>
      </div>
    </nav>

    <div class="component-wrapper">
      <router-view/>
    </div>

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="copyright py-4 text-center text-white">
        <div class="container">
          <div>
            <p class="lead mb-0">Technische Hochschule Rosenheim
              <br>Hochschulstraße 1, 83024 Rosenheim</p>
          </div>
        </div>
        <div class="container">
          <small>Copyright &copy; StudyUp 2018</small>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'App',
    mounted() {
      console.log(this.$applicationStorage);
    }
  }
</script>

<style lang="scss">
  @import './sass/app.scss';
</style>


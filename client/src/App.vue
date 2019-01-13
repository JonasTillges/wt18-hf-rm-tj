<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
    <div class="container">
    
      <a  class="navbar-brand" href="#page-top">  <router-link to="/">StudyUp</router-link></a>
      <button class="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item mx-0 mx-lg-1">
            <router-link to="/register">Navigate to RegisterPage</router-link>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <router-link to="/login">Navigate to Login</router-link>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <router-link to="/list">Navigate to List</router-link>
          </li>
          <li class="nav-item mx-0 mx-lg-1">
            <router-link to="/post">Navigate to Post</router-link>
          </li>
        </ul>
      </div>
    </div>
    </nav>

    <router-view/>

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="container">
        
          <div>
            <h4 class="text-uppercase mb-4">Adresse</h4>
            <p class="lead mb-0">Technische Hochschule Rosenheim
              <br>Hochschulstraße 1, 83024 Rosenheim</p>
          </div>
          </div>
          <div class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright &copy; StudyUp 2018</small>
      </div>
    </div>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import './sass/app.scss'
</style>


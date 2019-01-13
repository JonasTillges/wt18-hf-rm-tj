<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
    <div class="container">
      <a  class="navbar-brand" href="#page-top">StudyUp</a>
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
    <div>
        <router-link to="/register">Navigate to RegisterPage</router-link>
        <router-link to="/login">Navigate to Login</router-link>
        <router-link to="/list">Navigate to List</router-link>
        <router-link to="/post">Navigate to Post</router-link>
    </div>
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>



<template>

  <div id="app">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-secondary text-uppercase" id="mainNav">
      <router-link class="navbar-brand" to="/">
        <img class="navigation_logo" src="static/img/IMG_0122.PNG" alt="">
       <span class="navigation_project"></span>StudyUp
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/list">
              <i class="fa fa-th-list" aria-hidden="true"></i>
              Gestelle Fragen
            </router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" to="/post">
              <i class="fa fa-question-circle" aria-hidden="true"></i>
              Frage stellen
            </router-link>
          </li>
          <li v-if="!loggedIn" class="nav-item">
            <router-link class="nav-link" to="/register">
              <i class="fa fa-sign-in" aria-hidden="true"></i>
              Register
            </router-link>
          </li>
        </ul>
        <span class="navbar-text user_nav">
           <div v-if="loggedIn">
             <router-link to="/user" class="nav-item nav-user">
               <i class="fa fa-user-circle-o" aria-hidden="true"></i> {{userName}}
             </router-link>
             <button type="button" class="logout_button btn btn-sm btn-danger" @click="logout">
              <router-link to="/">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Logout
              </router-link>
              </button>
           </div>
            <div v-if="!loggedIn">
              <button type="button" class="btn btn-sm btn-success">
                <router-link to="/login">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                  Login
                </router-link>
              </button>
            </div>
        </span>
      </div>
    </nav>

    <div class="notification_wrapper container">
      <notification/>
    </div>


    <div class="component-wrapper">
      <router-view/>
    </div>

    <div class="toasts_wrapper">
      <toasts/>
    </div>

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="copyright py-4 text-center text-white">
        <div class="container">
          <div>
            <p class="lead mb-2">Technische Hochschule Rosenheim
              <br>Hochschulstraße 1, 83024 Rosenheim
            </p>
          </div>
          <small>Copyright &copy; StudyUp 2018</small>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
  import Notification from './components/Notification.vue';
  import Toasts from './components/Toasts.vue';
  import AuthService from '@/services/Auth';
  import ActionService from '@/services/Action';
  import { EventBus } from './global/event-bus.js';

  export default {
    name: 'App',
    components: {
      'notification': Notification,
      'toasts': Toasts
    },
    data () {
        return {
          loggedIn: false,
          userName: ""
        }
    },
    methods: {
      logout: function() {
        AuthService.signOut();
      },
      emitListUpdate() {
        console.log('list-updated');
        EventBus.$emit('list-updated', true);
      }
    },
    mounted() {

      let _this = this;

      // Firebase Auth init
      AuthService.init(_this.$applicationStorage);

      // Listen for login-status event
      EventBus.$on('login-status', function(a, b) {
        console.log("on login status");
        console.log(a);
        console.log(b);
        if (_this.$applicationStorage.isLoggedIn) {
          _this.$data.loggedIn = true;
          _this.$data.userName = _this.$applicationStorage.user.name;
          console.log('logged in');
        } else {
          _this.$data.loggedIn = false;
          _this.$data.userName = "";
          console.log('logged out');
        }
      });

      console.log(this.$applicationStorage);

      // get initial list of post
      if(this.$applicationStorage.posts.length) {
        console.log('documents from chache');
      } else {
        //TODO prüfen mit server auth
        ActionService.getList({}).then(
          function (answer) {
            _this.$applicationStorage.addPosts(answer.data.documents, _this.$applicationStorage);
            console.log('documents from server');
            _this.emitListUpdate();
          },
          function (error) {
            console.log(error.message);
          }
        );
      }
    },
    updated() {
      //clear notification
      EventBus.$emit('notification', "");
    }
  }
</script>

<style lang="scss">
  @import './sass/app.scss';
</style>


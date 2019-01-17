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
          <li v-if="show" class="nav-item">
            <i class="fa fa-sign-in" aria-hidden="true"></i>
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="show" class="nav-item">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <router-link to="/login">Login</router-link>
          </li>
            <li v-if="!show" @click="logout" class="nav-item">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            <router-link to="/">Logout</router-link>
          </li>
        </ul>
        <span class="navbar-text">
           <router-link to="/user">{{name}}</router-link>
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
  import firebase,{ auth } from 'firebase';
  import Auth from '@/services/Auth'
  import ActionService from '@/services/ActionService';
  import { EventBus } from './global/event-bus.js';

  export default {
    name: 'App',
    data() {
      return {
        name: '',
        show: true
      }
    },
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          console.log('Signed Out');
          this.name = ''
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      },
      emitListUpdate() {
        EventBus.$emit('list-updated', true);
      }
    },
    mounted() {
      //handels token changes
      Auth.onTokenChanged();

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in State.
          ActionService.getUserData({
                uid: user.uid
            }).then((response) => {
                console.log(response.data.user);
                this.name = response.data.user.name;
            });
            this.show = false;
            } else {
            // No user is signed in.
            this.show = true;
          }
      });

      let _this = this;

      if(this.$applicationStorage.posts.length) {
        console.log('documents from chache');
      } else {
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
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     ActionService.getUserData({
      //           uid: user.uid
      //       }).then((response) => {
      //           console.log(response.data.user);
      //           this.name = response.data.user.name;
      //       });
      //       this.show = false;
      //       // User is signed in.
      //       } else {
      //       this.show = true;
      //       // No user is signed in.
      //     }
      // });
    },
  }
</script>

<style lang="scss">
  @import './sass/app.scss';
</style>


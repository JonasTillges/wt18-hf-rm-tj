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
          <li class="nav-item" v-if="!show">
            <router-link class="nav-link" to="/post">
              <i class="fa fa-question-circle" aria-hidden="true"></i>
              Frage stellen
            </router-link>
          </li>
          <li v-if="show" class="nav-item">
            <router-link class="nav-link" to="/register">
              <i class="fa fa-sign-in" aria-hidden="true"></i>
              Register
            </router-link>
          </li>
          <li v-if="show" class="nav-item">

          </li>
        </ul>
        <span class="navbar-text user_nav">
           <div v-if="!show">
             <router-link to="/user" class="nav-item nav-user">{{name}}</router-link>
             <button type="button" class="logout_button btn btn-sm btn-danger" @click="logout">
              <router-link to="/">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Logout
              </router-link>
              </button>
           </div>
            <div v-if="show">
              <button type="button" class="btn btn-sm btn-success" @click="logout">
                <router-link to="/login">
                  <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                  Login
                </router-link>
              </button>
            </div>
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
          this.name = '';
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      },
      emitListUpdate() {
        EventBus.$emit('list-updated', true);
      }
    },
    mounted() {


      let _this = this;

      //handels token changes
      Auth.onTokenChanged();


      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          _this.$applicationStorage.firebase = user;
          console.log('__________firebase-user____________');
          console.log(_this.$applicationStorage.firebase);
          console.log('___________________________________');
          // User is signed in State.
          ActionService.getUserData({
                uid: user.uid
            }).then((response) => {
                console.log('HALLOOO!!!!!'+ response.data.user);
                this.name = response.data.user.name;
                _this.$applicationStorage.user = response.data.user;
            });
            this.show = false;
            } else {
            // No user is signed in.
          _this.show = true;
          }
      });

      console.log(this.$applicationStorage);

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


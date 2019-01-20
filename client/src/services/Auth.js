import firebase, {auth} from 'firebase';
import ActionService from '@/services/Action'
import Router from '@/router/index.js'
import { EventBus } from '@/global/event-bus.js';

// Initialize Firebase 
var config = {
    apiKey: "AIzaSyBVRMdtss2rCWB3UpyfX_2eXjLcoIhP-gQ",
    authDomain: "forum-7ed19.firebaseapp.com",
    databaseURL: "https://forum-7ed19.firebaseio.com",
    projectId: "forum-7ed19",
    storageBucket: "forum-7ed19.appspot.com",
    messagingSenderId: "593613711325"
  };
  firebase.initializeApp(config);

export default {

    $applicationStorage: Object,

    isReal(){
        return this.$applicationStorage.isLoggedIn;
    },

    loginUser(email, password){
        console.log('call Auth.loginUser');
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
              let user = data.user;
              console.log('try verified');
              if (user.emailVerified) {
                  console.log('User verified email.');
              }
              console.log('USER');
              console.log(user);
              console.log(user.uid);
              ActionService.getUserData({
                  token: this.$applicationStorage.token
              }).then((response) => {
                  this.$applicationStorage.user = response.data.user;
                  console.log(response.data.user);
                  // TODO authchanged should call
                  //EventBus.$emit('login-status', true);
                  Router.push('/list');
              });
          },
          (err) => {
              //TODO Notification no user with this login credentials
              console.log(err.message);
          }
        );
    },
    register(email, name, password){
        console.log('call Auth.register');
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {

              this.$applicationStorage.firebase = firebase.auth().currentUser;

              user.sendEmailVerification().then((verification) => {

                  console.log('success');
                  console.log(verification);

                  ActionService.register({
                      email: email,
                      name: name,
                      token: this.$applicationStorage.token
                  }).then((response) => {
                      console.log(response);
                      console.log("register");
                      EventBus.$emit('login-status', true);
                      Router.push('verify');
                  });


              }).catch(function (error) {
                  // An error happened.
              });

          },
          (err) => {
              console.log(err.message);
          }
        );
    },
    signOut(){
        console.log('call Auth.logout');
        firebase.auth().signOut().then(()=> {
            this.loggedOut();
            console.log("log out");
            EventBus.$emit('login-status', true);
            Router.push('login');
        })
    },
    applyActivationCode(code) {
        console.log('call Auth.applyActivationCode');
        firebase.auth().applyActionCode(code).then(function () {
            // Email address has been verified.
            console.log('Email has been verified!');
        }).catch(function (error) {
            console.log(error);
        });
    },
    getTokenPromise() {
        return new Promise((resolve, reject) => {
           if (firebase.auth().currentUser)  {
               firebase.auth().currentUser.getIdToken(true).then(
                 idToken => {
                     this.$applicationStorage.token = idToken;
                     console.log('token prom');
                     resolve(idToken);
                 },
                 error => {
                     reject(error);
                 }
               );
           } else {
               reject({error: "No User found on client"});
           }
        });
    },
    onAuthChanged() {

        console.log('register onAuthStateChanged');
        firebase.auth().onAuthStateChanged((user) => {
            console.log('EVENT onAuthStateChanged');
            if (user) {


                this.getTokenPromise().then((idToken) => {
                    console.log('USER VERIFIED __________________');
                    ActionService.getUserData({
                        token: this.$applicationStorage.token
                    }).then((response) => {
                        console.log('onauthch');
                        console.log(response);
                        this.$applicationStorage.firebase = user;
                        this.$applicationStorage.user = response.data.user;
                        this.$applicationStorage.isLoggedIn = true;
                        EventBus.$emit('login-status', true);
                    });

                }).catch((error) => {
                    console.log('USER NOT VERIFIED !!!!!!!!!!!!!!!!!!');
                    // Handle error
                    console.log(error);
                });

                this.$applicationStorage.firebase = user;
                console.log('__________firebase-user3____________');
                console.log(this.$applicationStorage);
                console.log('___________________________________');

                console.log(user.uid, this.$applicationStorage.token);
                // User is signed in State.

                
            } else {
                console.log('Auth-loggedOUT()');
                this.loggedOut();
                EventBus.$emit('login-status', false);

                // No user is signed in.
                
            }
        });
    },
    loggedOut() {
        this.$applicationStorage.token = "";
        this.$applicationStorage.firebase = Object;
        this.$applicationStorage.user = Object;
        this.$applicationStorage.isLoggedIn = false;
    },
    init(applicationStorage) {
        console.log("call Auth init");
        this.$applicationStorage = applicationStorage;
        this.onAuthChanged();
    }
}


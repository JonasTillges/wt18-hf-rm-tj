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
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (data) => {
              this.getTokenPromise().then(
                idToken => {
                    let user = data.user;
                    ActionService.getUserData({
                        token: idToken
                    }).then((response) => {
                        if(!response.data.error) {
                            this.$applicationStorage.user = response.data.user;
                            EventBus.$emit('login-status', true);
                            Router.push('list');
                        } else {
                            EventBus.$emit('notification', response.data.error);
                        }
                    });
                },
                error => {
                    EventBus.$emit('notification', error);
                }
              );


          },
          (err) => {
              EventBus.$emit('notification', err.message);
          }
        );
    },
    /**
     * register user
     * @param email
     * @param name
     * @param password
     */
    register(email, name, password){
        //HOTFIX
        this.$applicationStorage.user.name = name;

        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {

              this.$applicationStorage.user.name = name;
              this.$applicationStorage.firebase = user.user;

              this.getTokenPromise().then(
                idToken => {
                    ActionService.register({
                        email: email,
                        name: name,
                        token: idToken,
                        uid: user.user.uid
                    }).then((response) => {
                        if(!response.data.error) {
                            this.$applicationStorage.user = response.data.user;
                            this.$applicationStorage.loggedIn = true;
                            EventBus.$emit('login-status', true);
                            Router.push('list');
                        } else {
                            EventBus.$emit('notification', response.data.error);
                        }
                    });
              }, error => {
                    EventBus.$emit('notification', error);
              });

          },
          err => {
              EventBus.$emit('notification', err.message);
          }
        );
    },
    signOut(){
        firebase.auth().signOut().then(()=> {
            this.loggedOut();
            EventBus.$emit('login-status', true);
            Router.push('login');
        })
    },
    getTokenPromise() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser)  {
                firebase.auth().currentUser.getIdToken(true).then(
                  idToken => {
                      this.$applicationStorage.token = idToken;
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

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                this.getTokenPromise().then((idToken) => {
                    //TODO register will fail
                    ActionService.getUserData({
                        token: this.$applicationStorage.token
                    }).then((response) => {
                        if(!response.data.error) {
                            this.$applicationStorage.firebase = user;
                            this.$applicationStorage.user = response.data.user;
                            this.$applicationStorage.isLoggedIn = true;
                            EventBus.$emit('login-status', true);
                        }
                    });

                }).catch((error) => {
                    // Handle error
                    console.log(error);
                });

                this.$applicationStorage.firebase = user;

            } else {
                this.loggedOut();
                EventBus.$emit('login-status', false);
            }
        });
    },
    loggedOut() {
        this.$applicationStorage.token = "";
        this.$applicationStorage.firebase = Object;
        this.$applicationStorage.user = {name: ""};
        this.$applicationStorage.isLoggedIn = false;
    },
    init(applicationStorage) {
        this.$applicationStorage = applicationStorage;
        this.onAuthChanged();
        this.$applicationStorage = applicationStorage;
  
    }
}


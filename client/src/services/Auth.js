import firebase from 'firebase'
import ActionService from '@/services/ActionService'
import AuthenticationService from '@/services/AuthenticationService'
import Router from '@/router/index.js'

export default {
    loginUser(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).then(
            (data) => {
              let user = data.user;
              console.log('try verified');
              if(user.emailVerified){
                console.log('User verified email.');
              }
              console.log('USER')
              console.log(user);
              console.log(user.uid);
              ActionService.getUserData({
                    uid: user.uid
                }).then((response) => {
                    console.log(response.data.user);
                });
                Router.push('/');
              
            },
            (err) => {
              alert(err.message);
            }
          );
    },
    register(email, name, password){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (user) => {
              var user = firebase.auth().currentUser;
              user.sendEmailVerification().then((verification) => {
                console.log('success');
                console.log(verification);
              }).catch(function(error) {
              // An error happened.
              });
              var uid = user.uid;
              AuthenticationService.register({
                  email: email,
                  name: name,
                  uid: uid
              });
              console.log(uid);
              Router.push('verify');
            },
            (err) => {
              alert(err.message);
            }
          );
    },
    logout(){
        firebase.auth().signOut().then(()=>{
            Router.push('login');
          })
    },
    onTokenChanged(){
        firebase.auth().onIdTokenChanged((user) => {
          if (user) {
            let accessToken = user.getIdToken();
            // User is signed in or token was refreshed.
          }
        });
    }
}


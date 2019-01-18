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
              firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
                // Send token to your backend via HTTPS
                console.log(idToken);
                AuthenticationService.register({
                  email: email,
                  name: name,
                  uid: idToken
              }).then((response) => {
                console.log(response);
              });
                // ...
              }).catch((error) => {
                // Handle error
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
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
              console.log(idToken);
              //Updated Token an backend senden
            }).catch((error) => {
              // Handle error
            });
            // User is signed in or token was refreshed.
          }
        });
    }
}


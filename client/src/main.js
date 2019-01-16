// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from "firebase";
import App from './App'
import router from './router'
import wysiwyg from "vue-wysiwyg";
import "./global/storage";
import moment from 'moment'

//TODO good for what?
Vue.config.productionTip = false;

// Initialize Firebase TODO security (do on server ?!)
var config = {
  apiKey: "AIzaSyBVRMdtss2rCWB3UpyfX_2eXjLcoIhP-gQ",
  authDomain: "forum-7ed19.firebaseapp.com",
  databaseURL: "https://forum-7ed19.firebaseio.com",
  projectId: "forum-7ed19",
  storageBucket: "forum-7ed19.appspot.com",
  messagingSenderId: "593613711325"
};
firebase.initializeApp(config);

// TODO options for safe text for plain text copy paste OR search for other, auslagern?
Vue.use(wysiwyg, {
  hideModules: { "code": true },
  forcePlainTextOnPaste: true
});

// TODO auslagern?
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY HH:mm')
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});




//TODO SPINNER use fa-spin !!!

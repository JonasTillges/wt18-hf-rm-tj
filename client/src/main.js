// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wysiwyg from "vue-wysiwyg";
import "./global/storage";

//TODO good for what?
Vue.config.productionTip = false;

Vue.use(wysiwyg, {
  hideModules: { "code": true },
  forcePlainTextOnPaste: true
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});





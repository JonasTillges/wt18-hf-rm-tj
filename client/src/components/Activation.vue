<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Activation',
  data () {
    return {
      msg: 'Du bist jetzt startklar!!!'
    }
  },
  methods: {
  },
  mounted() {
        console.log(this.$route.query.oobCode);
        console.log('test');
        // Try to apply the email verification code.
        firebase.auth().applyActionCode(this.$route.query.oobCode).then(function() {
        // Email address has been verified.
        console.log('Email has been verified!');


      }).catch(function(error) {
          console.log(error);
          var user = firebase.auth().currentUser;
          console.log(user.email);
      });
  },
}
</script>
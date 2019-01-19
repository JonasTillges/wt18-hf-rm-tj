<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'verify',
  data () {
    return {
      msg: 'verify your email'
    }
  },
  mounted() {
      var user = this.$applicationStorage.firebase;
      console.log(user);
      if (user != null && user.emailVerified()) {
        this.$router.replace('home');
      }else{
        console.log('No user or not verified!');
      }
    }
}

</script>

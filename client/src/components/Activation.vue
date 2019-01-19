<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>

import Auth from '@/services/Auth'

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
        Auth.applyActionCode(this.$route.query.oobCode);
  }
}
</script>
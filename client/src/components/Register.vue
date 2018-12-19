<template>
  <div >
    <h>Register</h>
    <div>
        <input type="email" name="email" v-model="email" placeholder="Email"/>
      <input  type="password" name="password" v-model="password" placeholder="Password"/>
    </div>
    <div>
      <button @click="register">Register</button>
    </div>
  </div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register(){
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.log);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<template>
<<<<<<< HEAD
  <div >
    <h>Register</h>
    <br>

      <input 
      type="email" 
      name="email" 
      v-model="email" 
      placeholder="Email"/>
    <br>
      <input  
      type="password" 
      name="password" 
      v-model="password" 
      placeholder="Password"/>

      <br>
      <button 
      @click="register">Register</button>
      <br>

      <h1>{{ message }}</h1>
    
=======
  <div>
    <h1>Register</h1>
    
    

>>>>>>> master
  </div>
</template>

<script>

import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'register',
<<<<<<< HEAD
  data () {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    async register(){
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log("button clicked", this.email,this.password);
      console.log(response.data);
      this.message = response.data.message;
=======
  data: {
    form: {
      email: '',
      name: ''
>>>>>>> master
    }

  }
}
</script>
<<<<<<< HEAD

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
=======
>>>>>>> master

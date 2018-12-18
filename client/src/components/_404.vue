<template>
  <div >
    <link href="app.scss" rel="stylesheet" type="text/scss"/> 
    <router-link to="/Home">Navigate to RegisterPage</router-link>
  </div>
</template>

<script>

export default {
  name: "Home",
  methods: {
    registerPage: function(){
      console.log('hallo');
      router.push({ path: '/register' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

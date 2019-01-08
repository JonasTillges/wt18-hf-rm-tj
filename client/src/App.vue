<template>
  <div id="app">
    <router-link to="/">
      <img src="./assets/logo.png">
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

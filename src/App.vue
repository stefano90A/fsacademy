<template>
  <div id="app">
    <b-img src="./assets/logo.png" class="logoFincons" fluid alt="Fincons Group"></b-img>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logoFincons {
  position: absolute;
  top: 0;
  width: 150px;
  right: 0;
  margin-right: 10px;
}
</style>

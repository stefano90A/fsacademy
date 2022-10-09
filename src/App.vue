<template>
  <div id="app">
    <b-img src="./assets/logo.png" class="logoFincons" fluid alt="Fincons Group"></b-img>
    <LoginComp v-if="show=='loginPanel'"
      @register = "register()"
    />
    <RegisterComp v-else />
  </div>
</template>

<script>

import LoginComp from "./components/Login.vue"
import RegisterComp from "./components/Register.vue"

export default {
  name: 'App',
  components: {
    LoginComp,
    RegisterComp
  },
  data() {
    return{
      show: 'loginPanel'
    }
  },
  methods: {
    register: function() {
      alert("Regist User!");
      this.show = 'registerPanel';
    }
  }
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

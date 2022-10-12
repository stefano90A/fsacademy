<template>
  <div id="app">
    <b-img src="./assets/logo.png" class="logoFincons" fluid alt="Fincons Group"></b-img>
    <LoginComp v-if="show=='loginPanel'" @register="register()" @login="login" />
    <RegisterComp v-else-if="show=='registerPanel'" @registered="login"/>
    <HomePage v-else :userId="userId" @logout="logout"></HomePage>
  </div>
</template>

<script>

import LoginComp from "./components/Login.vue"
import RegisterComp from "./components/Register.vue"
import HomePage from "./components/HomePage.vue";

export default {
  name: 'App',
  components: {
    LoginComp,
    RegisterComp,
    HomePage
  },
  data() {
    return {
      show: 'loginPanel',
      userId: "1"
    }
  },
  methods: {
    register: function () {
      this.show = 'registerPanel';
    },
    login(value) {
      this.userId = value.userId;
      this.show = 'homePanel';
    },
    logout() {
      this.show = 'loginPanel';
      this.$session.remove("bearer");
      this.$session.remove("user");
      //this.userId = undefined;
    }
  },
  beforeMount() {
    if( this.$session.exists("bearer") )
      this.show = 'homePanel';

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

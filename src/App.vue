<template>
  <div id="app">
    <b-img src="./assets/logo.png" class="logoFincons" fluid alt="Fincons Group"></b-img>
    
    <LoginComp v-if="show=='loginPanel'"
      @login = "login"
      @register = "register()"
    />

    <RegisterComp v-else-if="show=='registerPanel'" 
      @registered = "login"
    />

    <HomeComp v-else :userId="userId" 
      @logout = "logout()"
    />

  </div>
</template>

<script>

import LoginComp from "./components/Login.vue"
import RegisterComp from "./components/Register.vue"
import HomeComp from "./components/HomePage.vue"

export default {
  name: 'App',
  components: {
    LoginComp,
    RegisterComp,
    HomeComp
  },
  data() {
    return{
      show: 'loginPanel',
      userId: null
    }
  },
  methods: {
    register: function() {
      alert("Regist User!");
      this.show = 'registerPanel';
    },
    login: function(el) {
      this.show = 'homePanel'
      this.userId = el.userId
    },
    logout: function() {
      this.show = 'loginPanel'
      this.$session.remove("bearer")
      this.$session.remove("userId")
      this.$session.remove("user")
      this.userId = null
    }
  },
  beforeMount() {
    if( this.$session.exists( "bearer" ) && this.$session.exists( "userId" ) ) {
      this.show = "homePanel"
      this.userId = this.$session.get( "userId" ).toString()
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

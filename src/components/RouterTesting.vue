<template>
    <div>
        hello {{$session.get("user").name + ' ' + $session.get("user").surname}}
        <nav>
            <b-button pill class="m-1" 
              :class="{ activeCustom: isActive == 'home' }" 
              @click="isActive = 'home'"
              variant="outline-primary"><router-link to="/">Home</router-link></b-button>
            <b-button pill class="m-1" 
              :class="{ activeCustom: isActive == 'about' }" 
              @click="isActive = 'about'"
              variant="outline-primary">
              <router-link to="/about">Una vista...</router-link></b-button>
            <b-button pill class="m-1" 
              :class="{ activeCustom: isActive == 'data' }" 
              @click="isActive = 'data'"
              variant="outline-primary" v-if="this.numero" ><RouterLink :to="{name:'data', params: { id: this.numero }}">Rotta con parametro</RouterLink></b-button>
        </nav>

        <input v-model="numero" placeholder="Inserisci numero" :class="[{ activeCustom: isActive == 'data' }, redTextClass]" />
        <p :style="styleObject">Link: {{numero}}</p>

        
        
          <transition name="fade" mode="out-in">
            <div key=1 class="h-50 d-inline-block p-4" v-if="showPanel" @click="showPanel = !showPanel" style="background-color: red">
              Hello
            </div>
            <div key=2 class="h-50 d-inline-block p-4" v-else @click="showPanel = !showPanel" style="background-color: blue">
              Bye
            </div>
          </transition>

          <Transition name="bounce">
            <p v-if="showPanel" style="text-align: center;">
              Hello here is some bouncy text!
            </p>
          </Transition>
        
        <router-view></router-view>
    </div>    
</template>
  
  <script>
  export default {
    name: 'RouterTest',
    props: {},
    data(){
      return {
        showPanel: false,
        isActive: 'home',
        color: 'coral',
        redTextClass: 'redText', 
        numero: null,
        styleObject: {
          color: 'orange',
          fontSize: '28px',
          fontWeight: '600'
        }
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    .activeCustom {
      background-color: v-bind(color);
      font-weight: 600;
    }

    button a {
      text-decoration: none;
    }

    .redText {
      color: red;
      font-size: xx-large;
    }

    .fade-enter-active, .fade-leave-active { 
      transition: opacity .5s ease;
    }
    .fade-enter-from, .fade-leave-to {
      opacity: 0;
    }
    
    .bounce-enter-active {
      animation: bounce-in 0.5s;
    }
    .bounce-leave-active {
      animation: bounce-in 0.5s reverse;
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.25);
      }
      100% {
        transform: scale(1);
      }
    }
  </style>
  
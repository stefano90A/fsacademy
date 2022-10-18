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

        <router-view></router-view>
    </div>    
</template>
  
  <script>
  export default {
    name: 'RouterTest',
    props: {},
    data(){
      return {
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

  </style>
  
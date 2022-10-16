<template>
    <div>
        hello {{$session.get("user").name + ' ' + $session.get("user").surname}}
        <nav>
            <b-button pill class="m-1" variant="outline-primary"><router-link to="/">Home</router-link></b-button>
            <b-button pill class="m-1" variant="outline-primary"><router-link to="/about">Una vista...</router-link></b-button>
            <b-button pill class="m-1" variant="outline-primary" v-if="this.numero" ><RouterLink :to="{name:'data', params: { id: this.numero }}">Rotta con parametro</RouterLink></b-button>
        </nav>

        <input v-model="numero" placeholder="Inserisci numero"/>
        <p>Link: {{numero}}</p>

        <router-view></router-view>
    </div>    
</template>
  
  <script>
  export default {
    name: 'RouterTest',
    props: {},
    data(){
      return {
        numero: null
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  
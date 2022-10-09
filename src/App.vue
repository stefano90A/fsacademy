<template>
  <div id="app">
    <b-img src="./assets/logo.png" class="logoFincons" fluid alt="Fincons Group"></b-img>
    <h1>Benvenuti al corso Vue, Accademy 2022!!</h1>
    <h2>Studente: {{fullname}}</h2>
    <h6 v-show="precedente" style="color:red">Creato da {{precedente}}</h6>
    <p>
      <input type="text" v-model="nome" />
      <input type="text" v-model="cognome" />
    </p>
    <p>
      <button v-if="!hidePanel" @click="togglePanelFunc()">Type for hide me!</button>
      <button v-else @click="togglePanelFunc()">But you have to see me !!</button>
    </p>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      nome: 'Stefano',
      cognome: 'Romano',
      precedente: null,
      hidePanel: false
    }
  },
  computed: {
    fullname: function() {
      return this.nome + " " + this.cognome
    }
  },
  watch: {
    fullname(newName, oldName) {
      if( this.precedente == null )
        this.precedente = oldName;
    }
  },
  methods: {
    togglePanelFunc: function() {
      this.hidePanel = !this.hidePanel;
    }
  },
  beforeCreate() { console.log("App - before Create") },
  created() { console.log("App - Created") },
  beforeMount() { console.log("App - before Mount") },
  mounted() { console.log("App - Mount") },
  beforeUpdate() { console.log("App - before Update") },
  updated() { console.log("App - Updated") },
  beforeDestroy() { console.log("App - before Destroy") },
  destroyed() { console.log("App - Destroyed") }
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

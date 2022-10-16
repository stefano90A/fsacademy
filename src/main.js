import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSessionStorage from "vue-sessionstorage";
import router from './router'

Vue.use(VueSessionStorage);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

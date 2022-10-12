import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import VueSessionStorage from "vue-sessionstorage";

Vue.use(VueSessionStorage);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

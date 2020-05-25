import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(firestorePlugin)

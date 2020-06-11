import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

const socket = io('http://localhost:3000/alert', {
  reconnectionAttempts: 3
})

Vue.prototype.$socket = socket

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')

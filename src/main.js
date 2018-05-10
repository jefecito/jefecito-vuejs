// Default Packages
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import '@fortawesome/fontawesome-free-solid'

// Custom
import localStorageService from './utils/localStorageService'
import App from './App'
import router from './router'
import { store } from './store'

// Vue config & init
Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.devtools = true

// Axios Config
const baseURL = 'http://localhost:3000/'

axios.defaults.baseURL = baseURL
axios.interceptors.request.use((config) => {
  const auth = localStorageService.getToken()

  config.headers.common['x-access-token'] = auth

  return config
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

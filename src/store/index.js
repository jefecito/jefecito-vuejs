import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

import { createModule } from 'vuex-toast'
import 'vuex-toast/dist/vuex-toast.css'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    toast: createModule({
      dismissInterval: 8000
    })
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import admin from './admin'

import { createModule } from 'vuex-toast'
import 'vuex-toast/dist/vuex-toast.css'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    auth,
    admin,
    toast: createModule({
      dismissInterval: 8000
    })
  }
})

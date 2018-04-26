import localStorageService from '@/utils/localStorageService'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const user = localStorageService.getUser()
const token = localStorageService.getToken()

const state = {
  isLoggedIn: user && user.token && token,
  user
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

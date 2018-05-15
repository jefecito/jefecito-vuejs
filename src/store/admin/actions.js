import axios from 'axios'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'
import toastService from '@/utils/toastService'

export default {
  getAllUsers ({ commit, state, dispatch }) {
    axios
      .get('/api/users')
      .then((response) => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
          commit('setUserList', [])
        } else {
          commit('setUserList', response.data.data)
        } // if/else
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.response.data.error.message, 'danger')
      })
  }
}

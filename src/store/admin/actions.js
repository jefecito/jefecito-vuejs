import axios from 'axios'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  getAllUsers ({ commit, state, dispatch }) {
    axios
      .get('/api/users')
      .then((response) => {
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 3000
          }, {
            root: true
          })

          commit('setUserList', [])
        } else {
          commit('setUserList', response.data.data)
        } // if/else
      })
      .catch((err) => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.response.data.error.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })
      })
  }
}

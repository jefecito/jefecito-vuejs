import axios from 'axios'
import router from '@/router'
import localStorageService from '@/utils/localStorageService'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  /*
    uploadAvatar ({ commit, state, dispatch }, image) {
      let formData = new FormData()
      formData.append('avatar', image)

      axios.post('/user/me/change-avatar', formData)
        .then(response => {
          if (response.data.success) {
            let userStored = localStorageService.getUser()

            userStored.avatar = response.data.data.path
            localStorageService.setUser(userStored)
            commit('setAvatar', response.data.data.path)
          } else {
            dispatch(ADD_TOAST_MESSAGE, {
              text: response.data.error.message,
              type: 'danger',
              dismissAfter: 3000
            }, {
              root: true
            })
          }
        })
    },

    updateUserInfo ({ commit, state, dispatch }, payload) {
      axios.put('/user/me', payload)
        .then(res => {
          if (res.data.success) {
            let userStored = localStorageService.getUser()
            userStored.username = payload.username
            userStored.email = payload.email
            userStored.fullName = payload.fullName
            userStored.bio = payload.bio

            localStorageService.setUser(userStored)
            commit('updateUserInfo', payload)
            dispatch(ADD_TOAST_MESSAGE, {
              text: res.data.data.message,
              type: 'success',
              dismissAfter: 3000
            }, {
              root: true
            })
          } else {
            dispatch(ADD_TOAST_MESSAGE, {
              text: 'errr',
              type: 'danger',
              dismissAfter: 3000
            }, {
              root: true
            })
          }
        })
    },
  */

  logIn ({ commit, state, dispatch }, payload) {
    const data = {
      username: payload.email,
      password: payload.password
    }

    axios
      .post('/login', data)
      .then(response => {
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 3000
          }, {
            root: true
          })

          localStorageService.removeUser()
          commit('setLoggedOut')
        } else {
          dispatch(ADD_TOAST_MESSAGE, {
            text: `Bienvenido, ${response.data.data.username}`,
            type: 'success',
            dismissAfter: 3000
          }, {
            root: true
          })

          commit('setLoggedIn', response.data.data)
          localStorageService.setUser(response.data.data)
          router.push('/')
        } // if/else
      })
      .catch((err) => {
        console.log('err: ', err)
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })

        localStorageService.removeUser()
        commit('setLoggedOut')
      })
  },

  getUser ({ commit, state, dispatch }, payload) {
    axios
      .post('/api/user/me', payload)
      .then((response) => {
        console.log('response: ', response)
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 3000
          }, {
            root: true
          })

          localStorageService.removeUser()
          commit('setLoggedOut')
        } else {
          dispatch(ADD_TOAST_MESSAGE, {
            text: `Bienvenido, ${response.data.data.username}`,
            type: 'success',
            dismissAfter: 3000
          }, {
            root: true
          })

          commit('setLoggedIn', response.data.data)
          localStorageService.setUser(response.data.data)
          router.push('/')
        } // if/else
      })
      .catch((err) => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })

        localStorageService.removeUser()
        commit('setLoggedOut')
      })
  },

  logOut ({ commit, state, dispatch }) {
    console.log('state: ', state)
    dispatch(ADD_TOAST_MESSAGE, {
      text: `Hasta luego, ${state.user.username}`,
      type: 'info',
      dismissAfter: 3000
    }, {
      root: true
    })

    localStorageService.removeUser()
    commit('setLoggedOut')
    router.push('/')
  }
}

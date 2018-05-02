import axios from 'axios'
import router from '@/router'
import localStorageService from '@/utils/localStorageService'
import {
  ADD_TOAST_MESSAGE,
  REMOVE_TOAST_MESSAGE
} from 'vuex-toast'

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
            text: `Bienvenido, ${response.data.data.username || response.data.data.email}`,
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

  signUp ({ commit, state, dispatch }, payload) {
    axios
      .post('/register', payload)
      .then((response) => {
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 3000
          }, {
            root: true
          })
        } else {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.data,
            type: 'info',
            dismissAfter: 3000
          }, {
            root: true
          })
        }
      })
      .catch((err) => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })
      })
  },

  logOut ({ commit, state, dispatch }) {
    dispatch(ADD_TOAST_MESSAGE, {
      text: `Hasta luego, ${state.user.username || state.user.email}`,
      type: 'info',
      dismissAfter: 3000
    }, {
      root: true
    })

    localStorageService.removeUser()
    commit('setLoggedOut')
    router.push('/')
  },

  confirmEmail ({ commit, state, dispatch }, payload) {
    dispatch(ADD_TOAST_MESSAGE, {
      text: 'Validando su email, por favor aguarde un instante...',
      type: 'info',
      dismissAfter: 5000
    }, {
      root: true
    })

    axios
      .get('/api/user/confirm', { params: payload })
      .then((response) => {
        // dispatch(REMOVE_TOAST_MESSAGE, 22)
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 3000
          }, {
            root: true
          })
        } else {
          dispatch(ADD_TOAST_MESSAGE, {
            text: `Su email: ${response.data.data.email} ha sido validado. Ya puede iniciar sesión.`,
            type: 'success',
            dismissAfter: 3000
          }, {
            root: true
          })
        } // if/else
      })
      .catch((err) => {
        console.log('err: ', err)
        dispatch(REMOVE_TOAST_MESSAGE, 'validate_email')
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })
      })
  },

  requestPassword ({ commit, state, dispatch }, payload) {
    dispatch(ADD_TOAST_MESSAGE, {
      text: 'Validando su email, por favor aguarde un instante...',
      type: 'info',
      dismissAfter: 5000
    }, {
      root: true
    })

    axios
      .put('/api/user/me/request-password', payload)
      .then(response => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: response.data.data,
          type: 'success',
          dismissAfter: 5000
        }, {
          root: true
        })
      })
      .catch((err) => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })
      })
  },

  resetPassword ({ commit, state, dispatch }, payload) {
    axios
      .put('/api/user/me/reset-password', payload)
      .then((response) => {
        if (!response.data.success) {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.error.message,
            type: 'danger',
            dismissAfter: 8000
          }, {
            root: true
          })
        } else {
          dispatch(ADD_TOAST_MESSAGE, {
            text: response.data.data,
            type: 'success',
            dismissAfter: 8000
          }, {
            root: true
          })

          router.push('/sign')
        }
      })
      .catch((err) => {
        dispatch(ADD_TOAST_MESSAGE, {
          text: err.message,
          type: 'danger',
          dismissAfter: 3000
        }, {
          root: true
        })
      })
  },

  verifyToken ({ commit, state, dispatch }, payload) {
    const params = {
      token: payload
    }

    return new Promise((resolve, reject) => {
      axios
        .get('/api/user/token', { params })
        .then(response => {
          if (!response.data.success) {
            dispatch(ADD_TOAST_MESSAGE, {
              text: response.data.error.message,
              type: 'danger',
              dismissAfter: 3000
            }, {
              root: true
            })

            reject(new Error(false))
          } else {
            resolve(response.data.data)
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

          reject(new Error(false))
        })
    })
  },

  getUser ({ commit, state, dispatch }, payload) {
    axios
      .post('/api/user/me', payload)
      .then((response) => {
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
  }
}

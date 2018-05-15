import axios from 'axios'
import router from '@/router'
import localStorageService from '@/utils/localStorageService'
import toastService from '@/utils/toastService'

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
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')

          localStorageService.removeUser()
          commit('setLoggedOut')
        } else {
          toastService.sendToastVuex(dispatch, `Bienvenido, ${response.data.data.username}`, 'success')

          commit('setLoggedIn', response.data.data)
          localStorageService.setUser(response.data.data)
          router.push('/')
        } // if/else
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
        localStorageService.removeUser()
        commit('setLoggedOut')
      })
  },

  signUp ({ commit, state, dispatch }, payload) {
    axios
      .post('/register', payload)
      .then((response) => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
        } else {
          toastService.sendToastVuex(dispatch, response.data.data, 'info')
        }
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
      })
  },

  logOut ({ commit, state, dispatch }) {
    toastService.sendToastVuex(dispatch, `Hasta luego, ${state.user.username || state.user.email}`, 'info')

    localStorageService.removeUser()
    commit('setLoggedOut')
    router.push('/')
  },

  confirmEmail ({ commit, state, dispatch }, payload) {
    toastService.sendToastVuex(dispatch, 'Validando su email, por favor aguarde un instante...', 'info', 5000)

    axios
      .get('/api/user/confirm', { params: payload })
      .then((response) => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
        } else {
          toastService.sendToastVuex(dispatch, `Su email: ${response.data.data.email} ha sido validado. Ya puede iniciar sesión.`, 'success')
        } // if/else
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
      })
  },

  requestPassword ({ commit, state, dispatch }, payload) {
    toastService.sendToastVuex(dispatch, 'Validando su email, por favor aguarde un instante...', 'info', 5000)

    axios
      .put('/api/user/me/request-password', payload)
      .then(response => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
        } else {
          toastService.sendToastVuex(dispatch, response.data.data, 'info')
        }
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
      })
  },

  resetPassword ({ commit, state, dispatch }, payload) {
    axios
      .put('/api/user/me/reset-password', payload)
      .then((response) => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
        } else {
          toastService.sendToastVuex(dispatch, response.data.data, 'success')
          router.push('/sign')
        }
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
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
            toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
            reject(new Error(false))
          } else {
            resolve(response.data.data)
          } // if/else
        })
        .catch((err) => {
          toastService.sendToastVuex(dispatch, err.message, 'danger')
          reject(new Error(false))
        })
    })
  },

  getUser ({ commit, state, dispatch }, payload) {
    axios
      .post('/api/user/me', payload)
      .then((response) => {
        if (!response.data.success) {
          toastService.sendToastVuex(dispatch, response.data.error.message, 'danger')
          localStorageService.removeUser()
          commit('setLoggedOut')
        } else {
          toastService.sendToastVuex(dispatch, `Bienvenido, ${response.data.data.username}`, 'success')
          commit('setLoggedIn', response.data.data)
          localStorageService.setUser(response.data.data)
          router.push('/')
        } // if/else
      })
      .catch((err) => {
        toastService.sendToastVuex(dispatch, err.message, 'danger')
        localStorageService.removeUser()
        commit('setLoggedOut')
      })
  }
}

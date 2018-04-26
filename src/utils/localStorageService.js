import CFG from '@/config'

export default {
  setUser (user) {
    localStorage.setItem(CFG.localStorage.userKey, JSON.stringify(user))
  },
  getUser () {
    return JSON.parse(localStorage.getItem(CFG.localStorage.userKey)) || {}
  },
  getToken () {
    let user = JSON.parse(localStorage.getItem(CFG.localStorage.userKey)) || {}
    return user.token || ''
  },
  removeUser () {
    localStorage.removeItem(CFG.localStorage.userKey)
  },
  setItem (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    localStorage.setItem(key, value)
  },
  getItem (key, isObject) {
    let item = localStorage.getItem(key)

    return isObject ? JSON.parse(item) : item
  }
}

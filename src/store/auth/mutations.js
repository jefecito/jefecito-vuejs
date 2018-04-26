export default {
  setLoggedIn (state, user) {
    state.isLoggedIn = true
    state.user = user
  },

  setLoggedOut (state) {
    state.isLoggedIn = false
    state.user = undefined
  }

  /*
    setAvatar (state, avatar) {
      state.user.avatar = avatar
    },

    updateUserInfo (state, info) {
      state.user.username = info.username
      state.user.email = info.email
      state.user.bio = info.bio
      state.user.fullName = info.fullName
    }
  */
}

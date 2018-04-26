export default {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user,
  isAdmin: (state) => state.user && !!~state.user.roles.indexOf('admin')
}

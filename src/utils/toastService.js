import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  ...mapActions({
    addToast: ADD_TOAST_MESSAGE
  }),
  sendToast (text, type, dismissAfter = 3000) {
    return this.addToast({
      text,
      type,
      dismissAfter
    }, {
      root: true
    })
  },
  sendToastVuex (dispatch, text, type, dismissAfter = 3000) {
    console.log('aca')
    return dispatch(ADD_TOAST_MESSAGE, {
      text,
      type,
      dismissAfter
    }, {
      root: true
    })
  }
}

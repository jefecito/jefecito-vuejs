<template lang="html">
  <section class="section">
    <div class="container h-100 inner-with-nav">
      <div class="row h-100">
        <div class="offset-sm-4 col-sm-4">
          <b-card class="auth-card">
            <reset-password v-bind:token="token" />
          </b-card>
          <div class="auth-text">
            <p class="text-secondary text-center">
              El token expirará {{ timeToExpire }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ResetPassword from '../auth/ResetPassword'
import { diffDates, dateCountdown } from '../../filter/date'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  name: 'ResetPasswordView',
  props: [
    'token'
  ],
  components: {
    ResetPassword
  },
  created () {
    this.callVerifyToken()
  },
  methods: {
    ...mapActions('auth', [
      'verifyToken'
    ]),
    ...mapActions({
      addToast: ADD_TOAST_MESSAGE
    }),
    callVerifyToken () {
      this.verifyToken(this.token)
        .then((response) => {
          this.tokenExpirationDate = response
          this.countdown(response)
        })
        .catch(() => {
          this.$router.push({
            path: '/'
          })
        })
    },
    countdown (date) {
      const getDiff = (d) => {
        this.tokenExpirationDate = diffDates(date)
        this.timeToExpire = dateCountdown(date)
      }

      this.intervalId = setInterval(getDiff(date), 60000)
    }
  },
  watch: {
    tokenExpirationDate: {
      handler: (val, oldVal) => {
        if (val === 0) {
          this.addToast({
            text: 'El token ha expirado',
            type: 'error',
            dismissAfter: 10000
          })

          this.$router.push({
            path: '/'
          })
        }
      },
      deep: true
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  data () {
    return {
      loading: true,
      tokenExpirationDate: null,
      timeToExpire: 'Cargando...',
      intervalId: null
    }
  }
}
</script>

<style lang="css" scoped>
  .auth-text {
    margin-top: 10px;
  }
</style>

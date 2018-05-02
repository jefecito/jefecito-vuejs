<template lang="html">
  <form @submit.prevent="submit">
    <h4>
      <b>Registrarse</b>
    </h4>
    <b-form-group>
      <small>
        Email
      </small>
      <b-form-input
        v-model="credentials.email"
        name="email"
        type="email">
      </b-form-input>
    </b-form-group>

    <b-form-group>
      <small>
        Contraseña
      </small>
      <b-form-input
        v-model="credentials.password"
        name="password"
        type="password">
      </b-form-input>
    </b-form-group>

    <b-form-group>
      <small>
        Confirmar contraseña
      </small>
      <b-form-input
        v-model="credentials.rePassword"
        name="password"
        type="password">
      </b-form-input>
    </b-form-group>

    <b-button
      type="submit"
      variant="primary">
      Crear Cuenta
    </b-button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  name: 'Register',
  data () {
    return {
      credentials: {}
    }
  },
  methods: {
    ...mapActions('auth', [
      'signUp'
    ]),
    ...mapActions({
      addToast: ADD_TOAST_MESSAGE
    }),
    submit () {
      if (this.credentials.password !== this.credentials.rePassword) {
        return this.addToast({
          text: 'Las contraseñas deben coincidir',
          type: 'danger',
          dismissAfter: 10000
        })
      }

      if (!this.credentials.email.length || !this.credentials.email.length) {
        return this.addToast({
          text: 'Campos Insuficientes',
          type: 'danger',
          dismissAfter: 10000
        })
      }

      this.signUp(this.credentials)
    }
  }
}
</script>

<style lang="css" scoped>
</style>

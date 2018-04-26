<template lang="html">
  <form @submit.prevent="submit">
    <h4>
      Inicar sesión
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
      <p class="text-right no-margin">
        <small class="text-secondary forgot-password">
          Olvidé mi contraseña
        </small>
      </p>
    </b-form-group>

    <b-button
      type="submit"
      variant="primary">
      Ingresar
    </b-button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  name: 'Login',
  data () {
    return {
      credentials: {}
    }
  },
  methods: {
    ...mapActions('auth', [
      'logIn'
    ]),
    ...mapActions({
      addToast: ADD_TOAST_MESSAGE
    }),
    submit () {
      if (!this.credentials.email.length || !this.credentials.password.length) {
        this.addToast({
          text: 'Campos Insuficientes',
          type: 'danger',
          dismissAfter: 10000
        })
      } else {
        this.logIn(this.credentials)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

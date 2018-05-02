<template lang="html">
  <form @submit.prevent="submit">
    <h4>
      <b>Reestablecer Contraseña</b>
    </h4>

    <b-form-group>
      <small>
        Nueva Contraseña
      </small>
      <b-form-input
        v-model="credentials.password"
        placeholder="Mínimo de 7 caracteres"
        name="password"
        type="password">
      </b-form-input>
    </b-form-group>

    <b-form-group>
      <small>
        Reingresar contraseña
      </small>
      <b-form-input
        v-model="credentials.rePassword"
        placeholder="Las contraseñas deben coincidir"
        name="password"
        type="password">
      </b-form-input>
    </b-form-group>

    <div class="text-right">
      <b-button
        type="submit"
        variant="primary">
        Confirmar
      </b-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  name: 'ResetPassword',
  props: [
    'token'
  ],
  data () {
    return {
      credentials: {}
    }
  },
  methods: {
    ...mapActions('auth', [
      'resetPassword'
    ]),
    ...mapActions({
      addToast: ADD_TOAST_MESSAGE
    }),
    submit () {
      if (this.credentials.password !== this.credentials.rePassword) {
        this.addToast({
          text: 'Las contraseñas deben coincidir.',
          type: 'danger',
          dismissAfter: 10000
        })
      } else {
        console.log(this.token)
        this.credentials.token = this.token
        this.resetPassword(this.credentials)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>

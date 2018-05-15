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
      :disabled="submitButton.disabled"
      type="submit"
      variant="primary">
      {{ submitButton.title }}
    </b-button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import toastService from '../../utils/toastService'

export default {
  name: 'Register',
  data () {
    return {
      credentials: {
        password: '',
        rePassword: '',
        email: ''
      },
      submitButton: {
        title: 'Crear Cuenta',
        disabled: false
      }
    }
  },
  methods: {
    ...toastService,
    ...mapActions('auth', [
      'signUp'
    ]),
    submit () {
      if (this.credentials.password !== this.credentials.rePassword) {
        return this.sendToast('Las contraseñas deben coincidir', 'danger')
      }

      if (!this.credentials.email.length || !this.credentials.email.length) {
        return this.sendToast('Campos Insuficientes', 'danger')
      }
      
      this.submitButton = {
        title: 'Creando cuenta...',
        disabled: true
      }

      this
        .signUp(this.credentials)
        .then(() => {
          this.submitButton = {
            title: 'Crear Cuenta',
            disabled: false
          }
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

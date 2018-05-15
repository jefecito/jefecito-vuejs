<template lang="html">
  <form @submit.prevent="submit">
    <h4>
      <b>Inicar sesión</b>
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
        <small v-b-modal.modalRecoverPassword
          class="text-secondary forgot-password">
          Olvidé mi contraseña
        </small>
      </p>
    </b-form-group>

    <div class="text-right">
      <b-button
        :disabled="submitButton.disabled"
        type="submit"
        variant="primary">
        {{ submitButton.title }}
      </b-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import toastService from '../../utils/toastService'

export default {
  name: 'Login',
  data () {
    return {
      submitButton: {
        title: 'Ingresar',
        disabled: false
      },
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...toastService,
    ...mapActions('auth', [
      'logIn'
    ]),
    submit () {
      if (!this.credentials.email.length || !this.credentials.password.length) {
        return this.sendToast('Campos Insuficientes', 'danger')
      }

      this.submitButton = {
        title: 'Enviando',
        disabled: true
      }

      this
        .logIn(this.credentials)
        .then(() => {
          this.submitButton = {
            title: 'Ingresar',
            disabled: false
          }
        })
    }
  }
}
</script>

<style lang="css" scoped>
  .forgot-password {
    cursor: pointer;
    color: #666;
  }
</style>

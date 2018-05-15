<template lang="html">
  <b-modal hide-footer
    ref="modalRecoverPassword"
    id="modalRecoverPassword"
    title="¿Olvidó su contraseña?">
    <p>
      Se le enviará instrucciones para reestablecer
      una nueva contraseña al email asociado a la cuenta
      que ingresará a continuación:
    </p>
    <form @submit.prevent="submit">
      <b-input-group>
        <b-form-input
          v-model="credentials.email"
          placeholder="Ingrese su correo electrónico"
          class="recover-password-input"
          name="email"
          type="email">
        </b-form-input>
        <b-input-group-append>
          <b-button
            :disabled="submitButton.disabled"
            type="submit"
            class="recover-password-btn"
            variant="primary">
            {{ submitButton.title }}
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import toastService from '../../utils/toastService'

export default {
  name: 'RecoverPassword',
  data () {
    return {
      credentials: {
        email: ''
      },
      submitButton: {
        title: 'Enviar',
        disabled: false
      }
    }
  },
  methods: {
    ...toastService,
    ...mapActions('auth', [
      'requestPassword'
    ]),
    submit () {
      if (!this.credentials.email) {
        return this.sendToast('Debe ingresar un email', 'danger')
      }

      this.submitButton = {
        title: 'Enviando...',
        disabled: true
      }

      this
        .requestPassword(this.credentials)
        .then(() => {
          this.credentials.email = ''

          this.submitButton = {
            title: 'Enviar',
            disabled: false
          }

          this.$refs.modalRecoverPassword.hide()
        })
    }
  }
}
</script>

<style lang="css" scoped>
  .input-group .recover-password-input {
    margin-right: 15px;
    border-radius: .25rem;
    text-align: center;
  }
  .input-group .recover-password-btn {
    border-radius: .25rem;
  }
</style>

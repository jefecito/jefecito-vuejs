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
            type="submit"
            class="recover-password-btn"
            variant="primary">
            Enviar
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'
import { ADD_TOAST_MESSAGE } from 'vuex-toast'

export default {
  name: 'RecoverPassword',
  data () {
    return {
      credentials: {
        email: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', [
      'requestPassword'
    ]),
    ...mapActions({
      addToast: ADD_TOAST_MESSAGE
    }),
    submit () {
      if (!this.credentials.email) {
        this.addToast({
          text: 'Debe ingresar un email',
          type: 'danger',
          dismissAfter: 10000
        })
      } else {
        this
          .requestPassword(this.credentials)
          .then(() => {
            this.credentials.email = ''
            this.$refs.modalRecoverPassword.hide()
          })
      }
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

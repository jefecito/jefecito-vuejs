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
  name: 'ResetPassword',
  props: {
    token: {
      type: String,
      required: true
    },
    submitButton: {
      title: 'Confirmar',
      disabled: false
    }
  },
  data () {
    return {
      credentials: {}
    }
  },
  methods: {
    ...toastService,
    ...mapActions('auth', [
      'resetPassword'
    ]),
    submit () {
      if (this.credentials.password !== this.credentials.rePassword) {
        return this.sendToast('Las contraseñas deben coincidir', 'danger')
      }

      this.credentials.token = this.token

      this.submitButton = {
        title: 'Actualizando contraseña...',
        disabled: true
      }

      this
        .resetPassword(this.credentials)
        .then(() => {
          this.submitButton = {
            title: 'Confirmar',
            disabled: false
          }
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>

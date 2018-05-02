<template lang="html">
  <section class="section">
    <div class="container h-100 inner-with-nav">
      <div class="row h-100">
        <div class="offset-sm-4 col-sm-4">
          <b-card>
            <div v-if="showLogin">
              <login />
            </div>
            <div v-else>
              <register />
            </div>
          </b-card>
          <div class="auth-text">
            <p v-if="showLogin" class="text-secondary text-center">
              ¿No estas registrado?
              <b class="pointer-cursor" @click="showLogin = !showLogin">
                Crea una cuenta
              </b>
            </p>
            <p v-else class="text-secondary text-center">
              ¿Ya eres miembro?
              <b class="pointer-cursor" @click="showLogin = !showLogin">
                Ingresa con tu usuario
              </b>
            </p>
          </div>

          <hr class="small-hr">

          <social-buttons />
        </div>
      </div>
    </div>

    <recover-password />
  </section>
</template>

<script>
import Login from '../auth/Login'
import Register from '../auth/Register'
import RecoverPassword from '../auth/RecoverPassword'
import SocialButtons from '../auth/SocialButtons'

export default {
  name: 'LoginView',
  components: {
    Login,
    Register,
    RecoverPassword,
    SocialButtons
  },
  data () {
    return {
      showLogin: true
    }
  }
}
</script>

<style lang="css">
  /**
   * Texts
   */
  .pointer-cursor {
    cursor: pointer;
    color: #444;
  }
  .forgot-password {
    cursor: pointer;
    color: #666;
  }
  .auth-text {
    margin-top: 10px;
  }
</style>

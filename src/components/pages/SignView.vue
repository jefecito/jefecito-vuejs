<template lang="html">
  <section class="section">
    <div class="container h-100 inner-with-nav">
      <div class="row h-100">
        <div class="offset-sm-4 col-sm-4">
          <b-card class="auth-card">
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

          <b-button
            class="btn-social btn-facebook"
            block
            :to="{ name: 'authFacebook' }"
            variant="primary">
            Acceder con <b>Facebook</b>
          </b-button>

          <b-button
            class="btn-social btn-google"
            block
            :to="{ name: 'authGoogle' }"
            variant="danger">
            Acceder con <b>Google</b>
          </b-button>

          <b-button
            class="btn-social btn-twitter"
            block
            :to="{ name: 'authTwitter' }"
            variant="info">
            Acceder con <b>Twitter</b>
          </b-button>

          <b-button
            class="btn-social btn-linkedin"
            block
            :to="{ name: 'authLinkedin' }"
            variant="primary">
            Acceder con <b>LinkedIn</b>
          </b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Login from '../auth/Login'
import Register from '../auth/Register'

export default {
  name: 'LoginView',
  components: {
    Login,
    Register
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
   * Sign Card
   */
  .auth-card {
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    border: 0;
  }
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
  /**
   * Social Buttons Styles
   */
  .btn-social {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08),
                0 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
  .btn-social.btn-facebook {
    background-color: #3B5998;
    border-color: #3B5998;
  }
  .btn-social.btn-google {
    background-color: #d34836;
    border-color: #d34836;
  }
  .btn-social.btn-twitter {
    background-color: #00aced;
    border-color: #00aced;
  }
  .btn-social.btn-linkedin {
    background-color: #0077b5;
    border-color: #0077b5;
  }
</style>

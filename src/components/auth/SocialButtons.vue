<template lang="html">
  <div>
    <b-button v-for="(btn, index) in buttons"
      v-bind:key="index"
      v-bind:class="btn.class"
      block
      :to="{ name: btn.path }"
      :variant="btn.variant">
      Acceder con <b>{{ btn.name }}</b>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'SocialButtons',
  data () {
    return {
      buttons: [{
        class: 'btn-facebook',
        path: 'authFacebook',
        variant: 'primary',
        name: 'Facebook'
      }, {
        class: 'btn-google',
        path: 'authGoogle',
        variant: 'danger',
        name: 'Google'
      }, {
        class: 'btn-twitter',
        path: 'authTwitter',
        variant: 'info',
        name: 'Twitter'
      }, {
        class: 'btn-linkedin',
        path: 'authLinkedin',
        variant: 'primary',
        name: 'LinkedIn'
      }]
    }
  }
}
</script>

<style lang="css" scoped>
  /**
   * Social Buttons Styles
   */
  .btn-facebook {
    background-color: #3B5998;
    border-color: #3B5998;
  }
  .btn-google {
    background-color: #d34836;
    border-color: #d34836;
  }
  .btn-twitter {
    background-color: #00aced;
    border-color: #00aced;
  }
  .btn-linkedin {
    background-color: #0077b5;
    border-color: #0077b5;
  }
</style>

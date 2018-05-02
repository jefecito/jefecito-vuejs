<template lang="html">
  <section class="section">
    <div class="container h-100 inner-with-nav">
      <div class="row h-100">
        <div class="offset-sm-4 col-sm-4">
          <b-card class="auth-card">
            <reset-password />
          </b-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import resetPassword from '../auth/resetPassword'

export default {
  name: 'resetPasswordView',
  components: {
    resetPassword
  }
}
</script>

<style lang="css">
</style>

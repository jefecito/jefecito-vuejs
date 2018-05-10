<template>
  <section>
    <admin-section-header title="Configuración de Usuario" />
    <b-container>
      <div class="row">
        <div class="col-sm-4">
          <user-form-avatar />
        </div>

        <div class="col-sm-4">
          <user-form-password />
        </div>

        <div class="col-sm-4">
          <user-form-email-username />
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
// Default Components

// Custom Components
import AdminSectionHeader from '../shared/AdminSectionHeader'
import UserFormAvatar from './UserFormAvatar'
import UserFormPassword from './UserFormPassword'
import UserFormEmailUsername from './UserFormEmailUsername'

export default {
  name: 'UserProfile',
  components: {
    AdminSectionHeader,
    UserFormAvatar,
    UserFormPassword,
    UserFormEmailUsername
  }
}
</script>

<style>
</style>

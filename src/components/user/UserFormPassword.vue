<template>
  <b-card>
    <form @submit.prevent="submit">
      <h5>
        <b>Contraseña</b>
      </h5>

      <b-form-group>
        <small>
          Contraseña
        </small>
        <b-form-input
          name="oldPassword"
          type="password">
        </b-form-input>
      </b-form-group>

      <br>

      <b-form-group>
        <small>
          Nueva Contraseña
        </small>
        <b-form-input
          name="newPassword"
          type="password">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <small>
          Repetir Contraseña
        </small>
        <b-form-input
          name="reNewPassword"
          type="password">
        </b-form-input>
      </b-form-group>

      <div class="text-right">
        <b-button
          type="submit"
          variant="primary">
          Guardar
        </b-button>
      </div>
    </form>
  </b-card>
</template>

<script>
export default {
  name: 'UserFormPassword'
}
</script>

<style>
</style>

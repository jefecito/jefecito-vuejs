<template>
  <b-card>
    <form @submit.prevent="submit">
      <h5>
        <b>Usuario y Correo</b>
      </h5>

      <b-form-group>
        <small>
          Dirección de Correo
        </small>
        <b-form-input
          name="email"
          type="email">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <small>
          Nombre de Usuario
        </small>
        <b-form-input
          name="email"
          type="email">
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
  name: 'UserFormEmailUsername'
}
</script>

<style>
</style>

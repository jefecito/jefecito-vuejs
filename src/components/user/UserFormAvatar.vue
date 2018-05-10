<template>
  <div class="inner-card">
    <b-card
      img-src="http://localhost:3000/img/default.png"
      overlay
      img-alt="Card image"
      img-top>
    </b-card>
    <b-button
      class="btn-fab"
      type="submit"
      variant="primary">
      <font-awesome-icon icon="upload" />
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'UserFormAvatar'
}
</script>

<style scoped>
  .inner-card {
    position: relative;
  }
  .btn-fab {
    position: absolute;
    bottom: 15px;
    right: 15px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.1rem;
  }
</style>

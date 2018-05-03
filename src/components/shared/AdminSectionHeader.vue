<template>
  <section class="header">
    <b-container>
      <h5 class="title">
        {{ title }}
      </h5>
    </b-container>
  </section>
</template>

<script>
export default {
  name: 'AdminSectionHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
  .header {
    padding: 25px 0;
    background-color: #efefef;
    border-bottom: 1px solid rgba(0, 0, 0, .07);
    margin-bottom: 20px;
  }
  .header .title {
    font-weight: 700;
    margin: 0;
    color: #666;
  }
</style>

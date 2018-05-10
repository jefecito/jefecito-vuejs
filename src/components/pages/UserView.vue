<template>
  <section>
    <sidebar :navs="navigation" />
    <main class="has__sidebar">
      <transition name="fade">
        <router-view />
      </transition>
    </main>
  </section>
</template>

<script>
import Sidebar from '../shared/Sidebar'

const navigation = [
  {
    label: 'Configuración',
    ref: 'UserProfile'
  }
]

export default {
  name: 'UserView',
  components: {
    Sidebar
  },
  data () {
    return {
      navigation
    }
  }
}
</script>

<style>
  .has__sidebar {
    padding-left: 275px;
  }
</style>

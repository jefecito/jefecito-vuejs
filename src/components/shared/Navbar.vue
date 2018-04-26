<template lang="">
  <div class="">
    <b-navbar toggleable="md" fixed="top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">
        Jefecito
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="isLogged" right>
            <template slot="button-content">
              <img :src="user.avatar" alt="User avatar" class="navbar-avatar">
            </template>
            <b-dropdown-item v-if="isAdmin" :to="{ name: 'UserAdministration' }">
              Administración
            </b-dropdown-item>
            <b-dropdown-item :to="{ name: 'UserSettings' }">
              Configuración
            </b-dropdown-item>
            <b-dropdown-item @click="logOut">
              Cerrar Sesión
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else :to="{ name: 'Sign' }">
            Acceso
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapState('auth', {
      isLogged: (state) => state.isLoggedIn,
      user: (state) => state.user
    })
  },
  methods: {
    ...mapActions('auth', [
      'logOut',
      'isAdmin'
    ])
  }
}
</script>

<style lang="css">
  /**
   * Navbar General Styling
   */
  .navbar {
    background-color: #fefefe;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, .15);
  }
  /**
   * Brand Styling
   */
  .navbar-brand {
    font-weight: 400;
    font-size: 24px;
    color: #424242;
  }
  /**
   * Dropdown Styling
   */
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-item {
    font-size: 14px;
    padding: .5rem 1.5rem;
  }
  @media (min-width: 768px) {
    .navbar-expand-md .navbar-nav .dropdown-menu-right {
      margin-top: 9px;
      border: 0;
      border-top: 1px solid rgba(0, 0, 0, .03);
      padding: 0;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      border-radius: 0 0px 2px 2px;
    }
  }
  /**
   * Avatar Navbar
   */
  .navbar-avatar {
    width: 40px;
    height: 40px;
    margin: -10px 0;
    border-radius: 50%;
  }
</style>

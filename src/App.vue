<template>
  <div id="app">
    <toast position="ne"></toast>
    <header>
      <navbar />
    </header>
    <main>
      <transition name="fade">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
/**
 * Import Comeponenets
 */
import { Toast } from 'vuex-toast'
import Navbar from '@/components/shared/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
    Toast
  }
}
</script>

<style>
  /**
   * Imports
   */
  @import 'bootstrap/dist/css/bootstrap.css';
  @import 'bootstrap-vue/dist/bootstrap-vue.css';

  /**
   * General
   */
  body {
    font-family: "Source Sans Pro";
    background-color: #fbfbfb;
  }

  *:focus {
    outline: none;
  }

  p {
    margin-bottom: .5rem;
    color: #424242;
  }
  p.text-secondary {
    color: #626262;
  }

  /**
   * Links
   */
  a,
  a:active,
  a:hover,
  a:focus {
    text-decoration: none;
  }
  a:focus {
    outline: 0px;
  }

  /**
   * Buttons
   */
  button:focus {
    outline: 0;
  }
  .btn.active.focus,
  .btn.active:focus,
  .btn.focus,
  .btn:active.focus,
  .btn:active:focus,
  .btn:focus {
    outline: none;
  }
  .btn:focus,
  .btn.focus,
  .form-control:focus {
    box-shadow: none;
  }

  /**
   * Misc
   */
  .no-margin {
    margin: 0;
  }

  /**
   * Sections
   */
  main {
    margin-top: 62px;
  }
  .section {
    padding: 50px 0;
  }
</style>

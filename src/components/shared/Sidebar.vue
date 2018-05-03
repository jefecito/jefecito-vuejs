<template>
  <section>
    <nav class="sidebar">
      <ul>
        <li v-for="nav in navs" :key="nav.index">
          <router-link :to="{ name: nav.ref }">
            {{ nav.label }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="sidebar__shadow not__visible"></div>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    navs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
  /**
  * SIDEBAR STYLE
  */
  .sidebar {
    width: 275px;
    left: 0;
    top: 61px;
    overflow: hidden;
    height: 100%;
    position: fixed;
    background-color: #FFFFFF;
    z-index: 1029;
    overflow-y: auto;
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    border-right: 1px solid rgba(0, 0, 0, .1);
  }
  .sidebar.is__closed {
    transform: translateX(-275px);
  }
  .sidebar.is__open {
    transform: translateX(0);
  }
  .sidebar.is__closed,
  .sidebar.is__open {
    -webkit-transition: .25s ease-in-out;
      -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
            transition: .25s ease-in-out;
  }
  .sidebar::-webkit-scrollbar {
    display: none;
  }
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  .sidebar ul.sn-subnav {
    background-color: rgba(0, 0, 0, .03);
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
  .sidebar ul li a {
    padding: 12px 15px;
    font-size: 14px;
    display: block;
    color: #313131;
    font-weight: 600;
    transition: 0.3s;
    white-space: nowrap;
    text-decoration: none;
    position: relative;
  }
  .sidebar ul.sn-subnav li a {
    padding-left: 45px;
  }
  .sidebar ul li a i {
    width: 26px;
    font-size: 16pX;
  }
  .sidebar ul li a i.sb-caret {
    position: absolute;
    right: 0;
    margin-top: 3px;
  }
  .sidebar ul li a i.fa-exchange {
    position: relative;
    left: 1px;
  }
  .sidebar ul li a:hover {
    background-color: rgba(0, 0, 0, .02);
  }
  .sidebar ul li a.router-link-exact-active,
  .sidebar ul li a.active {
    color: #03A9F4;
    background-color: rgba(0, 0, 0, .03);
  }
  .sidebar ul li a.router-link-exact-active:before,
  .sidebar ul li a.active:before {
    content: '';
    height: 100%;
    width: 4px;
    background-color: #03A9F4;
    left: 0;
    top: 0;
    position: absolute;
  }
  @media (min-width: 768px) {
    .sidebar.lg__visible.is__closed {
      transform: translateX(0);
    }
  }
  @media only screen and (min-width: 1200px) {
    .sidebar.lg__visible.is__open {
      left: 0;
    }
  }
  /**
  * SIDEBAR SHADOW STYLE
  */
  .sidebar__shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: .3s;
  }
  .sidebar__shadow.not__visible {
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0);
  }
  .sidebar__shadow.is__visible {
    visibility: visible;
    background-color: rgba(0, 0, 0, .7);
  }
  .sidebar__shadow.not__visible,
  .sidebar__shadow.is__visible {
    -webkit-transition: .25s ease-in-out;
       -moz-transition: .25s ease-in-out;
         -o-transition: .25s ease-in-out;
            transition: .25s ease-in-out;
  }
</style>

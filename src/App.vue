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
    background-color: #f5f5f5;
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
  .btn {
    font-size: 14px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08),
                0 2px 2px 0 rgba(0, 0, 0, 0.1);
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
   * Cards
   */
  .card {
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    border: 0;
  }
  /**
   * Misc
   */
  .no-margin {
    margin: 0;
  }
  .small-hr {
    width: 25%;
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
  /**
   * Tables
   */
  table {
    border-collapse: separate;
    border-spacing: 0 10px;
  }
  .table td,
  .table th {
    font-size: 14px;
    border-top: 0;
  }
  .table thead th {
    border-width: 0;
    color: #999999;
    font-weight: 400;
  }
  .table thead th:last-child,
  .table tbody td:last-child {
    text-align: right;
  }
  .table tbody tr {
    background-color: #ffffff;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, .15);
  }
  .table-dropdown {
    text-align: right;
  }
  .table-dropdown .btn {
    background-color: #fff;
    border-color: #fff;
    color: #666;
    border-radius: 50%;
    margin: -8px 0;
    box-shadow: none;
  }
  .table-dropdown .btn:hover {
    background: #f0f0f0;
  }
  .table-dropdown .btn:focus {
    background-color: #eee;
    box-shadow: none;
  }
  .table-dropdown .dropdown-menu.show {
    top: -30px !important;
    border: 1px solid #f0f0f0;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
  }
  .pagination {
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, .15);
    margin-right: 15px;
  }
  .page-item.disabled .page-link,
  .page-item .page-link {
    border-color: #f0f0f0;
  }
  .page-item.disabled .page-link {
    color: #aaa;
  }
  .b-table-empty-row div {
    margin: 0 !important;
  }

  .table-input {
    padding-right: 34px;
    border: 1px solid transparent;
    box-shadow: 0 2px 2px -2px rgba(0, 0, 0, .15);
  }
  .table-input::placeholder {
    color: #999;
    opacity: 1;
  }
  .table-input:-ms-input-placeholder {
    color: #999;
  }
  .table-input::-ms-input-placeholder {
    color: #999;
  }
  /**
   * Toast
   */
  .toast-message {
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  /**
   * Modal
   */
  .modal-dialog {
    box-shadow: 0 3px 20px 0px rgba(0, 0, 0, 0.2);
  }
  .modal-header {
    border-bottom: 0;
  }
  .modal-title {
    font-weight: 700;
  }
</style>

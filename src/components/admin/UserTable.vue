<template>
  <section>
    <admin-section-header title="Lisado de Usuarios" />
    <b-container>
      <b-card>
        <div class="justify-content-centermy-1 row">
          <b-form-fieldset class="col-2">
            <small>
              Filas por página
            </small>
            <b-form-select
              class="table-input"
              :options="pageOption"
              v-model="perPage">
            </b-form-select>
          </b-form-fieldset>

          <b-form-fieldset class="col-4">
            <small>
              Filtro
            </small>
            <b-form-input
              class="table-input"
              placeholder="Buscar en la tabla. Ejemplo: 'Admin'"
              v-model="filter">
            </b-form-input>
          </b-form-fieldset>
        </div>

        <b-table
          striped
          bordered
          show-empty
          empty-text="No hay usuarios para mostrar"
          empty-filtered-text="No hay usuarios que concuerden con tu búsqueda"
          :items="this.userList"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
          <template
            slot="Usuario"
            slot-scope="item">
            {{ item.item.local.username }}
          </template>

          <template
            slot="Email"
            slot-scope="item">
            {{ item.item.local.email }}
          </template>

          <template
            slot="Rol"
            slot-scope="item">
            {{ item.item.local.roles[0] }}
          </template>

          <template
            slot="Acciones"
            slot-scope="item">
            <b-dropdown
              id="ddown-right"
              size="sm"
              right
              class="table-dropdown text-right"
              variant="default">
              <template slot="text">
                <i class="fas fa-ellipsis-h"></i>
              </template>
              <b-dropdown-item>
                Editar
              </b-dropdown-item>
              <b-dropdown-item
                class="danger-text"
                @click="toDelete = item"
                v-b-modal="'confirmDeleteModal'"
                href="#">
                Eliminar
              </b-dropdown-item>
            </b-dropdown>
          </template>

          <!-- empty -->
          <template
            slot=""
            v-if="userList.length === 0"
            slot-scope="item">
            NO hay nada
          </template>
        </b-table>

        <div class="justify-content-end row my-1">
          <b-pagination
            size="md"
            :total-rows="this.userList.length"
            :per-page="perPage"
            v-model="currentPage"
          />
        </div>
      </b-card>
    </b-container>
  </section>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex'

import AdminSectionHeader from '../shared/AdminSectionHeader'

export default {
  name: 'UserTable',
  components: {
    AdminSectionHeader
  },
  computed: {
    ...mapGetters('admin', [
      'userList'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'getAllUsers'
    ])
  },
  created () {
    this.getAllUsers()
  },
  data () {
    return {
      fields: [
        'Usuario',
        'Email',
        'Rol',
        'Acciones'
      ],
      currentPage: 1,
      perPage: 5,
      filter: null,
      pageOption: [{
        text: 5,
        value: 5
      }, {
        text: 10,
        value: 10
      }, {
        text: 15,
        value: 15
      }]
    }
  }
}
</script>

<style>
  .danger-text:focus,
  .danger-text:hover,
  .danger-text {
    color: red;
  }
</style>

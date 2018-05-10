<template>
  <section>
    <admin-section-header title="Listado de Usuarios" />
    <b-container>
      <b-card>
        <div class="justify-content-centermy-1 row">
          <b-form-fieldset class="col-md-3">
            <small>
              Filas por página
            </small>
            <b-form-select
              class="table-input"
              :options="pageOption"
              v-model="perPage">
            </b-form-select>
          </b-form-fieldset>

          <b-form-fieldset class="col-md-5">
            <small>
              Filtro
            </small>
            <b-form-input
              class="table-input"
              placeholder="Buscar en la tabla. Ejemplo: 'Admin'"
              v-model="filter">
            </b-form-input>
          </b-form-fieldset>

          <b-form-fieldset class="col-md-4">
            <small>
              &nbsp;
            </small>
            <b-pagination
              size="md"
              :total-rows="this.userList.length"
              :per-page="perPage"
              v-model="currentPage" />
          </b-form-fieldset>
        </div>

        <b-table
          striped
          bordered
          show-empty
          stacked="lg"
          :sort-compare="sortFunction"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          empty-text="No hay usuarios para mostrar"
          empty-filtered-text="No hay usuarios que concuerden con tu búsqueda"
          :items="this.userList"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter">
          <template
            slot="actions"
            slot-scope="item">
            <b-dropdown
              id="ddown-right"
              size="sm"
              right
              class="table-dropdown text-right"
              variant="default">
              <template slot="text">
                <font-awesome-icon icon="ellipsis-h" />
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
        </b-table>
      </b-card>
    </b-container>
  </section>
</template>

<script>
// Default Components
import {
  mapActions,
  mapGetters
} from 'vuex'
import moment from 'moment'

// Custom components
import AdminSectionHeader from '../shared/AdminSectionHeader'

// Filters for Sort
import { getValue } from '../../filter/table'

// Variables
const pageOption = [{
  text: 5,
  value: 5
}, {
  text: 10,
  value: 10
}, {
  text: 15,
  value: 15
}]

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
        {
          key: 'local.username',
          label: 'Usuario',
          sortable: true
        },
        {
          key: 'local.email',
          label: 'Email',
          sortable: true
        },
        {
          key: 'local.roles',
          label: 'Rol',
          sortable: true
        },
        {
          key: 'local.createdAt',
          label: 'Fecha Ingreso',
          sortable: true,
          formatter (val) {
            return moment(val).format('DD/MM/YYYY HH:mm')
          }
        },
        {
          key: 'actions',
          label: 'Acciones',
          sortable: false
        }
      ],
      currentPage: 1,
      perPage: 5,
      filter: null,
      pageOption,
      sortBy: 'local.username',
      sortDesc: false,
      sortFunction (a, b, key) {
        const valA = getValue(a, key)
        const valB = getValue(b, key)

        if (typeof valA === 'number' && typeof valB === 'number') {
          return valA < valB ? -1 : (valA > valB ? 1 : 0)
        } else {
          return valA.localeCompare(valB)
        }
      }
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
  .table-dropdown .btn {
    border: 0;
    background: transparent;
  }
</style>

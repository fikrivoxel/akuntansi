<template>
  <div class="card card-small">
    <div class="card-header d-flex align-items-center">
      Jenis Barang
      <slot name="modal" />
    </div>
    <vuetable
      ref="table"
      pagination-path="pagination"
      :api-mode="false"
      :fields="fields"
      :data-manager="dataManager"
      :per-page="perPage"
      :css="css.table"
      @vuetable:pagination-data="onPaginationData"
    >
      <template v-slot:actions="props">
        <slot name="actions" :row-data="props.rowData"></slot>
      </template>
    </vuetable>
    <vue-pagination ref="pagination"
                    @vuetable-pagination:change-page="onChangePage" />
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters} from 'vuex'
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuePagination from '@/js/components/partials/vuetable/VuePagination'

  export default {
    data() {
      return {
        fields: [
          {
            name: 'kode_jenis',
            title: 'Kode'
          },
          {
            name: 'jenis_barang',
            title: 'Nama'
          }
        ],
        css: {
          table: {
            tableClass: 'table mb-0',
            sortableIcon: 'fa fa-sort fa-fw ml-auto',
            ascendingIcon: 'fa fa-sort-up fa-fw ml-auto',
            descendingIcon: 'fa fa-sort-down fa-fw ml-auto'
          }
        },
        perPage: 10
      }
    },
    components: {
      Vuetable,
      VuePagination
    },
    computed: {
      ...mapGetters('JenisBarang', {
        local: 'list',
        pagination: 'pagination'
      })
    },
    watch: {
      local() {
        this.$refs.table.refresh()
      }
    },
    methods: {
      dataManager(sortOrder, pagination) {
        let local = this.local
        if (sortOrder.length > 0) local = _.orderBy(
          local,
          sortOrder[0].sortField,
          sortOrder[0].direction
        )
        pagination = this.$refs.table.makePagination(
          this.pagination.total_records,
          this.perPage
        )
        return {
          pagination,
          data: local
        }
      },
      onPaginationData(paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
      },
      async onChangePage(page) {
        let {current_page} = this.pagination, to = page
        if (page === 'next') to = current_page + 1
        else if (page === 'prev') to = current_page - 1
        try {
          await this.$store.dispatch('JenisBarang/getAll', to, this.perPage)
        } catch (e) {}
        this.$refs.table.changePage(to)
      }
    }
  }
</script>

<template>
  <div class="jenis-barang">
    <jenbar-table>
      <template v-slot:modal>
        <button type="button" class="btn btn-primary btn-sm ml-auto">
          <i class="fa fa-plus fa-fw"/>
        </button>
      </template>
    </jenbar-table>
  </div>
</template>

<script>
  import JenbarTable from '@/js/components/partials/jenisbarang/Table'

  export default {
    components: {
      JenbarTable
    },
    methods: {
      async getJenisBarang() {
        try {
          await this.$store.dispatch('JenisBarang/getAll')
        } catch (err) {
          console.log(err)
        }
      }
    },
    async created() {
      await this.getJenisBarang()
    }
  }
</script>

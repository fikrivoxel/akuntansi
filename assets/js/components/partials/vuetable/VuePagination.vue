<template>
  <nav v-if="tablePagination && tablePagination.last_page > 1" class="card-footer">
    <ul class="pagination mb-0">
      <li :class="['page-item', isOnFirstPage ? 'disabled' : '']">
        <span v-if="isOnFirstPage" class="page-link">
          <i class="fa fa-angle-double-left fa-fw"></i>
        </span>
        <button v-else type="button" class="page-link" @click="loadPage(1)">
          <i class="fa fa-angle-double-left fa-fw"></i>
        </button>
      </li>
      <li :class="['page-item', isOnFirstPage ? 'disabled' : '']">
        <span v-if="isOnFirstPage" class="page-link">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
        <button v-else type="button" class="page-link" @click="loadPage('prev')">
          <i class="fa fa-angle-left fa-fw"></i>
        </button>
      </li>
      <template v-if="notEnoughPages">
        <template v-for="n in totalPage">
          <li :class="['page-item', isCurrentPage(n) ? 'active' : '']">
            <span v-if="isCurrentPage(n)" class="page-link" v-html="n"></span>
            <button v-else type="button" class="page-link" v-html="n" @click="loadPage(n)"></button>
          </li>
        </template>
      </template>
      <template v-else>
        <template v-for="n in windowSize">
          <li :class="['page-item', isCurrentPage(windowStart+n-1) ? 'active' : '']">
            <span v-if="isCurrentPage(windowStart+n-1)" class="page-link" v-html="windowStart+n-1"></span>
            <button v-else type="button" class="page-link" v-html="windowStart+n-1" @click="loadPage(windowStart+n-1)"></button>
          </li>
        </template>
      </template>
      <li :class="['page-item', isOnLastPage ? 'disabled' : '']">
        <span v-if="isOnLastPage" class="page-link">
          <i class="fa fa-angle-right fa-fw"></i>
        </span>
        <button v-else type="button" class="page-link" @click="loadPage('next')">
          <i class="fa fa-angle-right fa-fw"></i>
        </button>
      </li>
      <li :class="['page-item', isOnLastPage ? 'disabled' : '']">
        <span v-if="isOnLastPage" class="page-link">
          <i class="fa fa-angle-double-right fa-fw"></i>
        </span>
        <button v-else type="button" class="page-link" @click="loadPage(totalPage)">
          <i class="fa fa-angle-double-right fa-fw"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
  import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'

  export default {
    mixins: [PaginationMixin]
  }
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-title">
      <router-link to="/" class="sidebar-title-link">
        Akuntansi
      </router-link>
      <button type="button" class="sidebar-title-back" @click="$emit('on-click')">
        <i class="fa fa-chevron-left fa-fw" />
      </button>
    </div>
    <nav class="sidebar-nav">
      <ul class="sidebar-menu">
        <template v-for="(menu, idx) in menus">
          <template v-if="menu.subsmenu">
            <with-subs
              :menu="menu"
              :index="idx"
              :key="idx"
              :open-menu-idx="openMenuIdx"
              @on-click="handleClickOpen"/>
          </template>
          <template v-else>
            <without-subs :menu="menu" :index="idx" :key="idx"/>
          </template>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
  import {MENUS} from '@/js/config'
  import WithSubs from '@/js/components/partials/common/sidebar/WithSubs'
  import WithoutSubs from '@/js/components/partials/common/sidebar/WithoutSubs'

  export default {
    data() {
      return {
        openMenuIdx: -1
      }
    },
    components: {
      WithSubs,
      WithoutSubs
    },
    computed: {
      menus() {
        return MENUS.default
      }
    },
    methods: {
      handleClickOpen(idx) {
        if (this.openMenuIdx === idx) idx = -1
        this.openMenuIdx = idx
      }
    }
  }
</script>

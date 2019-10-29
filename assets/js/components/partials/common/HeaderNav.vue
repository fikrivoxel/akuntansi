<template>
  <header class="header">
    <div class="header-nav">
      <header-profile />
    </div>
    <button type="button" class="header-sidebar-open" @click="$emit('on-click')">
      <i class="fa fa-fw fa-bars"/>
    </button>
  </header>
</template>

<script>
  import HeaderProfile from '@/js/components/partials/common/header/Profile'
  export default {
    components: {
      HeaderProfile
    }
  }
</script>

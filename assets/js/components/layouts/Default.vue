<template>
  <div class="isauth">
    <sidebar />
    <slot />
  </div>
</template>

<script>
  import Sidebar from '@/js/components/partials/common/Sidebar'

  export default {
    components: {
      Sidebar
    }
  }
</script>

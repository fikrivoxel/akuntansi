<template>
  <li class="sidebar-menu-item">
    <router-link :to="menu.to" class="sidebar-menu-link">
      {{menu.meta.name}}
    </router-link>
  </li>
</template>

<script>
  export default {
    props: ['menu', 'index']
  }
</script>

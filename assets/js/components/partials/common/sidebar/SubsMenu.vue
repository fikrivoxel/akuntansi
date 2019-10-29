<template>
  <li class="sidebar-subsmenu-item">
    <router-link :to="submenu.to" class="sidebar-subsmenu-link">
      <i :class="['fa', 'fa-fw', submenu.meta.icon]"></i>
      <span class="sidebar-subsmenu-desc">{{submenu.meta.name}}</span>
    </router-link>
  </li>
</template>

<script>
  export default {
    props: ['submenu']
  }
</script>

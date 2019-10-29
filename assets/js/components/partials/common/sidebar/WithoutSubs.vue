<template>
  <li class="sidebar-menu-item">
    <router-link :to="menu.to" class="sidebar-menu-link">
      <i :class="['fa', 'fa-fw', menu.meta.icon]"></i>
      <span class="sidebar-menu-desc">{{menu.meta.name}}</span>
    </router-link>
  </li>
</template>

<script>
  export default {
    props: ['menu', 'index']
  }
</script>

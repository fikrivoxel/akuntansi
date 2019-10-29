<template>
  <li class="sidebar-menu-item">
    <button
      type="button"
      :class="['sidebar-menu-link', 'sidebar-caret', openMenuIdx === index ? 'open' : '']"
      @click="$emit('on-click', index)">
      {{menu.meta.name}}
    </button>
    <transition
      :css="false"
    >

    </transition>
  </li>
</template>

<script>
  import Velocity from 'velocity-animate'

  export default {
    props: ['menu', 'index', 'openMenuIdx'],
    data() {
      return {
        isAnimating: false
      }
    }
  }
</script>

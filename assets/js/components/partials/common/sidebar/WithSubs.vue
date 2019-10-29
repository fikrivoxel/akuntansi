<template>
  <li class="sidebar-menu-item">
    <button
      type="button"
      :class="['sidebar-menu-link', 'sidebar-menu-caret', openMenuIdx === index ? 'open' : '']"
      @click="$emit('on-click', index)">
      <i :class="['fa', 'fa-fw', menu.meta.icon]"></i>
      <span class="sidebar-menu-desc">{{menu.meta.name}}</span>
    </button>
    <transition
      @enter="enter"
      @leave="leave"
      :css="false">
      <ul v-if="index === openMenuIdx" class="sidebar-subsmenu">
        <template v-for="(submenu, idx) in menu.subsmenu">
          <subs-menu :submenu="submenu" :key="idx"/>
        </template>
      </ul>
    </transition>
  </li>
</template>

<script>
  import Velocity from 'velocity-animate'
  import SubsMenu from '@/js/components/partials/common/sidebar/SubsMenu'

  export default {
    props: ['menu', 'index', 'openMenuIdx'],
    components: {
      SubsMenu
    },
    methods: {
      enter(el, done) {
        Velocity(el, 'slideDown', {
          complete: done
        }, 150)
      },
      leave(el, done) {
        Velocity(el, 'slideUp', {
          complete: done
        }, 150)
      }
    }
  }
</script>

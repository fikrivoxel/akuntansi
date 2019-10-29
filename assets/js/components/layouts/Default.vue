<template>
  <div :class="['isauth', openSidebar ? 'open' : '']">
    <sidebar @on-click="handleClickCloseSidebar"/>
    <div class="isauth-content">
      <header-nav @on-click="handleClickOpenSidebar"/>
      <div class="isauth-container container-fluid">
        <header-title />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/js/components/partials/common/Sidebar'
  import HeaderNav from '@/js/components/partials/common/HeaderNav'
  import HeaderTitle from '@/js/components/partials/common/HeaderTitle'

  export default {
    data() {
      return {
        openSidebar: false
      }
    },
    components: {
      Sidebar,
      HeaderNav,
      HeaderTitle
    },
    methods: {
      handleClickOpenSidebar() {
        this.openSidebar = true
      },
      handleClickCloseSidebar() {
        this.openSidebar = false
      }
    }
  }
</script>

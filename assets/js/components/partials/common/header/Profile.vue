<template>
  <div class="header-profile">
    <button type="button" class="header-profile-btn" @click="handleOpenProfile">
      <img src="/images/0.jpg" alt="header-profile-img" class="header-profile-img">
      Sierra Brooks
    </button>
    <transition
      @enter="enter"
      @leave="leave"
      :css="false">
      <div v-if="openProfile" class="header-menu">
        <router-link to="/profile" class="header-menu-link">
          <i class="fa fa-fw fa-user"/>
          Profile
        </router-link>
        <div class="header-menu-divider"/>
        <router-link to="/profile" class="header-menu-link text-danger">
          <i class="fa fa-fw fa-sign-out"/>
          Logout
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        openProfile: false
      }
    },
    methods: {
      handleCloseProfile(e) {
        let target = e.target
        if (this.$el.contains(target)) return
        if (this.openProfile) this.openProfile = false
      },
      handleOpenProfile() {
        this.openProfile = !this.openProfile
      },
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
    },
    mounted() {
      window.addEventListener('click', this.handleCloseProfile.bind(this))
    },
    beforeDestroy() {
      window.removeEventListener('click', this.handleCloseProfile.bind(this))
    }
  }
</script>

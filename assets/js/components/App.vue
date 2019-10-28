<template>
  <div class="app" id="app">
    <component :is="layout">
      <router-view :key="$route.fullPath" />
    </component>
    <notifications group="alert-group"
                   position="bottom right">
      <template v-slot:body="props">
        <div :class="['alert', 'alert-msg', 'alert-' + props.item.type]">
          <h4 class="alert-heading">
            {{props.item.title}}
          </h4>
          <p class="mb-0">{{props.item.text}}</p>
        </div>
      </template>
    </notifications>
  </div>
</template>

<script>
  import LayError from '@/js/components/layouts/Error'
  import LayDefault from '@/js/components/layouts/Default'

  export default {
    components: {
      LayError,
      LayDefault
    },
    computed: {
      layout() {
        let layout = this.$route.meta.layout || 'Error'
        return 'Lay' + layout
      }
    }
  }
</script>

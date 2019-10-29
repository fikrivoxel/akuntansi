<template>
  <div class="row">
    <div class="col-12">
      <div class="isauth-header">
        <span class="isauth-substitle">
          {{title.substitle}}
        </span>
        <h3 class="isauth-title">
          {{title.name}}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      title() {
        return this.$route.meta.title;
      }
    }
  };
</script>

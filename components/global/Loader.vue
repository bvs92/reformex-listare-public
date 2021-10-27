<template>
<div class='preloader' v-if="loading">
    <div class='preloader'>
        <span></span>
        <span></span>
    </div>
</div>
</template>

<script>
export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>


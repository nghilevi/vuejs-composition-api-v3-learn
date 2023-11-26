<script setup lang="ts">
import Timeline from './components/Timeline.vue'
</script>

<template>
  <div class="section">
    <div class="container">
      <Suspense>
        <!-- need to provide 2 components using slots -->
        <template #default>
          <Timeline />
        </template>
        <template #fallback> <!-- while it has not been resolved -->
          <progress class="progress is-primary is-small"></progress> <!-- progress - a HTML component -->
        </template>
      </Suspense>
    </div>
  </div>
  
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";

</style>

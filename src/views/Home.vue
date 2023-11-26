<script lang="ts" setup>
    import Timeline from '../components/Timeline.vue'
</script>

<template>
    <Suspense>
        <!-- need to provide 2 components using slots -->
        <template #default>
            <Timeline />
        </template>
        <template #fallback> <!-- while it has not been resolved -->
            <progress class="progress is-primary is-small"></progress> <!-- progress - a HTML component -->
        </template>
    </Suspense>
</template>
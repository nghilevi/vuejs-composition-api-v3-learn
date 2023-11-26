<script setup lang="ts">
    import TimelineItem from './TimelineItem.vue';
    import { usePosts } from '../stores/posts';
    import { periods } from '../constants';

    const postsStore = usePosts()
    await postsStore.fetchPosts() // indicate to vue that we're going to be using suspense.
</script>

<template>
    pinia store: {{ postsStore.foo }}
    <button @click="postsStore.updateFoo('bar')">Update</button>
    <nav class="is-primary panel">
        selectedPeriod: {{ postsStore.selectedPeriod }}
        <span class="panel-tabs">
            <a v-for="period of periods" :key="period"
            :class="{'is-active': period === postsStore.selectedPeriod}"
            @click="postsStore.setSelectedPeriod(period)">
            {{ period }}
            </a>
        </span>
    </nav>

    <TimelineItem v-for="post of postsStore.filteredPosts" :key="post.id" :post="post">
    </TimelineItem>
</template>
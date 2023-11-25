<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { TimelinePost, thisMonth, thisWeek, today } from '../posts';
    import TimelineItem from './TimelineItem.vue';
    import { usePosts } from '../stores/posts';

    const postsStore = usePosts()
    
    const periods = ["Today", "This week", "This month"] as const
    // w/o as const, periods is gonna be dynamic
    type Period = typeof periods[number]
    const selectedPeriod = ref<Period>('Today') // TS improvment
    function selectPeriod(period: Period){
        selectedPeriod.value = period;
    }

    // TS improvment
    const posts = computed<TimelinePost[]>(() => {
        return [today, thisWeek, thisMonth]
        .map(p => { // TODO should use reduce insted 2 loops
            return {...p, created: new Date(p.created)}
        })
        .filter(p => {
            if(selectedPeriod.value === 'Today'){
                return p.title === 'Today'
            }

            if(selectedPeriod.value === 'This week'){
                return p.title === 'Today' || p.title === 'this week'
            }
        })
    })

</script>

<template>
    {{ postsStore.getState().foo }} <br/>
    <button @click="postsStore.updateFoo('bar')">Update</button>
    <nav class="is-primary panel">
        selectedPeriod: {{ selectedPeriod }}
        <span class="panel-tabs">
            <a v-for="period of periods" :key="period"
            :class="{'is-active': period === selectedPeriod}"
            @click="selectPeriod(period)">
            {{ period }}
            </a>
        </span>
    </nav>

    <TimelineItem v-for="post of posts" :key="post.id" :post="post">
    </TimelineItem>
</template>
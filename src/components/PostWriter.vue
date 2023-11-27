<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TimelinePost } from '../posts'

const props = defineProps<{ post: TimelinePost }>()

const title = ref(props.post.title)
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
    console.log('contentEditable: ', contentEditable.value?.innerText)
})
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
                <!-- <input type="text" class="input" :value="title" @input="event => title.value = event.target.value"> -->
                {{ title }}
            </div>
        </div>
        <div contenteditable ref="contentEditable">
        some note
        </div>
    </div>
</template>
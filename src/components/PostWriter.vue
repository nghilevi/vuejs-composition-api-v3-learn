<script lang="ts" setup>
// imports
import { onMounted, ref } from 'vue'
import { TimelinePost } from '../posts'

// props
const props = defineProps<{ post: TimelinePost }>()

// variables
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()

// lifecycle hooks
onMounted(() => {
    if(!contentEditable.value){
        throw Error('invalid content')
    }
    contentEditable.value.innerText = content.value
})

// functions
function handleInput(){
    if(!contentEditable.value){
        throw Error('invalid content')
    }
    content.value = contentEditable.value?.innerText
}
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
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput"/>
        </div>
        <div class="column">
            {{ content }}
        </div>
    </div>
</template>
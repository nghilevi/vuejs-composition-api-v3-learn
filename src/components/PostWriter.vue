<script lang="ts" setup>
// imports
import { onMounted, ref, watch } from 'vue'
import { TimelinePost } from '../posts'
import { marked } from 'marked'
import highlightjs from 'highlight.js';

// props
const props = defineProps<{ post: TimelinePost }>()

// variables
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()
const html = ref('') // do not considered as reactive changes

/*
// only executed once
marked.parse(content.value, (err, parseResult) => {
    html.value = parseResult
})
*/
/*
// more concise
watchEffect(() => {
    // Every time a reactive variable inside the callback is changed, it's going to execute the cb
    marked.parse(content.value,( err, parseResult) => {
        html.value = parseResult
    })
})
*/

// watch is only called when variable changes
// more explicit
watch(content, (newContent) => {
    marked.parse(newContent, {
        gfm: true, // github flavored markdown
        breaks: true,
        highlight: (code) => { // code = the one we'd like to highlight
            return highlightjs.highlightAuto(code).value // return the correct syntax highlighting
        }
    },(_err: any, parseResult: string) => {
        html.value = parseResult
    })
}, {
    /*
    . called the very first time the comp is created
    . called every time content changes
    */
    immediate: true
})

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
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput"/>
        </div>
        <div class="column">
            <div v-html="html" />
        </div>
    </div>
</template>
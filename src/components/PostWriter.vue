<script lang="ts" setup>
// imports
import { onMounted, ref, watch } from 'vue'
import { TimelinePost } from '../posts'
import { marked } from 'marked'
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce'
import { usePosts } from '../stores/posts'
import { useRouter } from 'vue-router'

// props
const props = defineProps<{ post: TimelinePost }>()

// variables
const title = ref(props.post.title)
const content = ref(props.post.markdown)
const contentEditable = ref<HTMLDivElement>()
const html = ref('') // do not considered as reactive changes

const posts = usePosts() // posts store
const router = useRouter();

function parseHtml(markdown: string){
    marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        }
    },(_err: any, parseResult: string) => {
        html.value = parseResult
    })
}
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
watch(content, debounce(parseHtml, 500), {
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

async function handleClick(){
    const newPost: TimelinePost = {
        ...props.post, title: title.value, markdown: content.value, html: html.value
    }
    await posts.createPost(newPost)
    router.push("/")
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

    <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleClick()">
                Save Post
            </button>
        </div>
    </div>
</template>
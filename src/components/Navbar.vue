<script setup lang="ts">

import { useModal } from '../composables/modal.ts'

// have reference to all of our modal APIs.
const modal = useModal()

</script>

<template>
    <div class="navbar">
        <div class="navbar-end">
            <div class="buttons">
                <!-- We're using an anchor tag and the default behavior is to refresh the whole page on the href. -->
                <!--<a href="/posts/new" class="button">New Post</a>-->
                <button class="button" @click="modal.showModal()">Sign up</button>
                <RouterLink to="/posts/new" class="button">New Post</RouterLink>  
            </div>
        </div>
    </div>

    <Teleport to="#modal"><!-- rmb # -->
        content to be rendered
    </Teleport>
</template>    
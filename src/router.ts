import { createRouter, createWebHistory } from "vue-router";
import Home from './views/Home.vue'
import NewPost from './views/NewPost.vue'

export const router = createRouter({
    history: createWebHistory(), // default FE routing
    routes: [
        {
            /*
            1/ View router is gonna match current path e.g /
            2/ loop over our routes and find correct route, and associated component
            3/ find the nearest RouterView
            4/ replace this dynamically with the component
            */
            path: '/', 
            component: Home
        },
        {
            path: '/posts/new',
            component: NewPost
        }
    ]
})
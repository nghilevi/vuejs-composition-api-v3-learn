/*
import { reactive, readonly } from "vue"

interface PostsState {
    foo: string
}

export class PostsStore {
    #state: PostsState // private member -> read only

    constructor(){
        // reactive object
        // state is marked as reactive up here, so that means it's going to update the DOM automatically, same as ref and computed
        this.#state = reactive<PostsState>({
            foo: 'foo'
        })
    }

    getState(){
        return readonly(this.#state) // reactively update the DOM, but it cannot be mutated directly
    }

    updateFoo(foo: string){
        this.#state.foo = foo
    }
}

const store = new PostsStore() 

// store.getState().foo = 'bar' // can not modify bcs its read only

// store.updateFoo('bar')

// inject/provide -> a more idiomatic way

// . a very common convention to access your composable
// . a composable: a way to have stateful reusable logic, and that's exactly what we're doing here

export function usePosts(){ // to be reusable throughout our application
    return store
}
*/

import { defineStore } from "pinia"
import { Post, thisMonth, thisWeek, today } from "../posts"

/*
all = { 1 => { title, created }} // map
    Record<string, Post>
access: all["1"]
*/
interface PostsState {
    ids: string[],
    all: Map<string, Post>
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth]
        ])
    }),
    actions: {
        updateFoo(foo: string){
            this.foo = foo // same as this.$state.foo
        }
    }
})
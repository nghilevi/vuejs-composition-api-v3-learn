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
import { Post, TimelinePost, thisMonth, thisWeek, today } from "../posts"
import { Period } from "../constants"

/*
all = { 1 => { title, created }} // map
    Record<string, Post>
access: all["1"]
*/
interface PostsState {
    ids: string[],
    all: Map<string, Post>,
    selectedPeriod: Period
}

// very thin abstraction on top of the composition API just to make it a little bit easier to reason and manage your application.
export const usePosts = defineStore("posts", {
    state: (): PostsState => ({ // reactive
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth]
        ]),
        selectedPeriod: 'Today'
    }),
    actions: { // just methods
        setSelectedPeriod(period: Period){
            this.selectedPeriod = period
        }
    },
    getters:{ //wrapped in a computed property
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
            .map(id => { // TODO should use reduce insted 2 loops
                const p = state.all.get(id)
                if(!p){
                    throw Error(`Post with id of ${id} was expected but not found`)
                }
                return {...p, created: new Date(p.created)}
            })
            .filter(p => {
                if(state.selectedPeriod === 'Today'){
                    return p.title === 'Today'
                }

                if(state.selectedPeriod === 'This week'){
                    return p.title === 'Today' || p.title === 'this week'
                }
            })
            }
    }
})
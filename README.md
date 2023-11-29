# Dev notes

## how to run

npm install
npm run dev

## sec1: composition api
setup attribute: write more concise script tags.

v-on:click
. = onclick (JS) = @click
. if not passing param, then evt object will be passed by default


### ref (number, string)
let selectedPeriod = ref('Today') 
selectedPeriod becomes reactive ref (no longer string primitiv)

selectedPeriod.value = 'something'
instead of overwriting the entire variable, we're actually going to
update the value attribute instead and this is going to maintain the reference to the object, but just change the value whenever the value of reactive reference is changed, Vue is going to go ahead and update the DOM automatically.

computed
. every time we have a computed property -> set up some watches for any reactive property inside of the callback 
. e.g selectedPeriod

For ts improvement, search for "TS improvment"

## sec2: reactive store

### reactive
like ref, but for complex obj e.g map/set

### pinia
very thin abstraction on top of the composition API just to make it a little bit easier to reason and manage your application.

### node server
npm install express@4.17 @types/express@4.17 cors@2.8 @types/cors@2.8 ts-node@10 --dev

install ts-node -> able to use ts in node env
need to configure a bit for ts-node
<- basically if we're executing code on the server, we need to use something called common JS instead of ES modules.
"ts-node": {
    "compilerOptions": {
      "module": "CommonJS",
      "esModuleInterop": true // https://stackoverflow.com/a/63745904/2515839
    }
  }

npx ts-node src/server/index.ts

troubleshooting
. Unknown file extension ".ts": https://stackoverflow.com/a/62099904/2515839

### Suspense
powerful since didn't have to write conditionals / flags

## sec3: router
a href: do a full page refresh
RouterLink: do a FE only refresh and dynamically update everything without actually refreshing the page
DOM access wf template refs / automatically associate ref with DOM node / access DOM content with ref

<div contenteditable> = textarea with a bit more power and control

html rendering
{{ html }} assign as htmlText
<div v-html='html' /> but lost 2 way binding -> use reactive api (watch, watchEffect)

from <h2 id="title">Title</h2> to Title

watch vs watchEffect
https://dev.to/krivanek06/vuejs-watcheffect-vs-watch-1323


## lifecycle hooks

onMounted: 
. called once the component is initially mounted
. all code inside of script is going to be executed once when the component is first created. Creation is different to mounting. when everything has been rendered mounted is going
to be called.
. 
const contentEditable = ref<HTMLDivElement>()

onMounted(() => {
    console.log('contentEditable: ', contentEditable.value?.innerText)
})

<div contenteditable ref="contentEditable">some note</div>

## code organization
imports -> props -> variables -> lifecycle hooks -> functions

## sec4
(vue) composable 
. a function that leverages Vue composition API to encapsulate and reuse stateful logic.
. the convention is to start with the word use.
. decoupled reactivity system: able to use Vue's reactivity APIs outside the context of a view component -> easy programmatic way to control our modal
-> easier than with options api
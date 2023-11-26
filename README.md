# Dev notes

## how to run

npm install
npm run dev

## sec1
setup attribute: write more concise script tags.

v-on:click
. = onclick (JS) = @click
. if not passing param, then evt object will be passed by default


let selectedPeriod = ref('Today') 
selectedPeriod becomes reactive ref (no longer string primitiv)

selectedPeriod.value = 'something'
instead of overwriting the entire variable, we're actually going to
update the value attribute instead and this is going to maintain the reference to the object, but just change the value whenever the value of reactive reference is changed, Vue is going to go ahead and update the DOM automatically.

computed
. every time we have a computed property -> set up some watches for any reactive property inside of the callback 
. e.g selectedPeriod

For ts improvement, search for "TS improvment"

## sec2
. ref (number, string)
. computed
. reactive: like ref, but for complex obj e.g map/set

pinia
. very thin abstraction on top of the composition API just to make it a little bit easier to reason and manage your application.

node server
npm install express@4.17 @types/express@4.17 cors@2.8 @types/cors@2.8 ts-node@10 --dev

. install ts-node -> able to use ts in node env
. need to configure a bit for ts-node
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
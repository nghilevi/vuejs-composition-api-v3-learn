Dev notes

sec1
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

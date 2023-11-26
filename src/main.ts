import { createApp } from 'vue'

import App from './App.vue'
import { createPinia } from 'pinia'
import { router } from './router'

createApp(App)
.use(createPinia()) // how we use plugin in vue
.use(router) // treat router as plugin
.mount('#app')

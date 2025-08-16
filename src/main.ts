import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/colors.css'
import './assets/fonts.css'
import './assets/layout.css'
import './assets/components.css'
import './assets/input.css'
import './assets/button.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

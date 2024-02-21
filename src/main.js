import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import router from './router'
import store from './store'

const app=createApp(App)
app.use(autoAnimatePlugin)
app.mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import {createRouter, createWebHistory} from "vue-router";
import { createPinia } from 'pinia'
import Home from "@/pages/Home.vue";
import Favorites from "@/pages/Favorites.vue";

const pinia = createPinia()
const app = createApp(App);

const routes = [
    {path:'/',name:'Home',component:Home},
    {path:'/favorites',name:'Favorites',component:Favorites},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

app.use(router);

app.use(autoAnimatePlugin);

app.use(pinia)

app.mount('#app');

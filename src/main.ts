import './assets/animation.css';
import './assets/tailwind.css';

import { createApp } from 'vue';
import { createAxios } from './plugins/axios';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createHead());
app.use(createPinia());
app.use(createAxios());
app.use(router);

app.mount('#app');

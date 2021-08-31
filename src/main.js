import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt';
const emitter = mitt();
const APP = createApp(App)
APP.config.globalProperties.emitter = emitter;
import "bootstrap/dist/css/bootstrap.min.css";

APP.mount('#app')

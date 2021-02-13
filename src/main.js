import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap'
import router from './router/router'
import 'font-awesome/css/font-awesome.css'
import {store} from './store'

createApp(App).use(router).use(store).mount('#app');
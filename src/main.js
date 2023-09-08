// import BarcodeGenerator from "./views/HomeView.vue";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';


createApp(App).use(router).mount('#app')

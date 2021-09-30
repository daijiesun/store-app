import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import Vant from 'vant'

// import VantComponent from './utils/vantInstall'
const AppInstance = createApp(App)
AppInstance.use(router).use(Vant).mount('#app');

store.init()

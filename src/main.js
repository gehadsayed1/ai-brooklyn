import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { i18n } from './i18n'


const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')


AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,  
})


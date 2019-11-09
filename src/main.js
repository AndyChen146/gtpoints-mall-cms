import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueProgressBar from 'vue-progressbar'
import ElementUi from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'element-ui/lib/theme-chalk/index.css'
import Vcharts from 'v-charts'
import '@/assets/icon'
import '@/assets/css/index.scss'

Vue.use(vueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

Vue.use(ElementUi, { locale })
Vue.use(Vcharts)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

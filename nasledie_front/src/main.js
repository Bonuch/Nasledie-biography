import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

Vue.config.productionTip = false

Vue.component('add-new-section', () => import('./components/base/EditSection'))
Vue.component('view-block-main', () => import('./components/biography/BiographyMainBlock'))

const vm = new Vue({
    router,
    store,
    render: function(createElement){
        return createElement(App)
    },
}).$mount('#app')
export { vm }

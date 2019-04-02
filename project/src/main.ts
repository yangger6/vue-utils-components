import Vue, * as vue from 'vue'
import VueUtilsComponents from '../../src'
// import {VOssImg} from '../../src'
import App from './App.vue'

Vue.use(VueUtilsComponents)
// Vue.use(VOssImg)
const Sample: vue.Component = App

window.addEventListener('load', () => {
    new Vue({
        render(h: vue.CreateElement) {
            return h(Sample)
        }
    }).$mount('#app');
})

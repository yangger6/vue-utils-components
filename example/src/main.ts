import Vue, * as vue from 'vue'
import VOssImg from '../../src/components/v-oss-img'
import App from './App.vue'

Vue.use(VOssImg)

const Sample: vue.Component = App

window.addEventListener('load', () => {
    new Vue({
        render(h: vue.CreateElement) {
            return h(Sample)
        }
    }).$mount('#app');
})

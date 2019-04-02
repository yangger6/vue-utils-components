import VOssImg from './index.vue'
import Vue from 'vue'
const testWebP = (): boolean => {
    const canvas: HTMLCanvasElement | undefined = typeof document === 'object' ?
    document.createElement('canvas') : undefined;
    if (canvas) {
        canvas.width = canvas.height = 1;
        return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
    } else {
        return false
    }
}
export const install = (vue: typeof Vue, options: {} = {}) => {
    Vue.prototype.$supportWebp = testWebP()
    Vue.component('v-oss-img', VOssImg)
}
export default {
    install
}

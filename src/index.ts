import VOssImg from './components/v-oss-img'
import Vue, {PluginObject} from 'vue'
import {version} from '../package.json'

interface ICustomWindow {
    Vue: typeof Vue
}
declare let window: ICustomWindow

const components: {
    [key: string]: PluginObject<{}>
} = {
    VOssImg
}

export const install = (vue: typeof Vue, options = {}) => {
    Object.keys(components).forEach((key: string) => {
        vue.use(components[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export {
    version,
    VOssImg
}
export default {
    install,
    version,
    ...components
}

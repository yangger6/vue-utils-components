import VOssImg from './components/v-oss-img'
import Vue, {PluginObject} from 'vue'
const version = '0.0.5'

interface ICustomWindow {
    Vue: typeof Vue
}
declare let window: ICustomWindow

const components: {
    [key: string]: PluginObject<{
        install: () => void
        [key: string]: any
    }>
} = {
    VOssImg
}

function install(vue: typeof Vue, options = {}) {
    Object.keys(components).forEach((key: string) => {
        Vue.use(components[key])
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    VOssImg
}
export default {
    install,
    version,
    ...components
}

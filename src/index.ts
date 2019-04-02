import VOssImg from './components/v-oss-img'
import Vue, {PluginObject} from 'vue'
const version = '0.0.1';

const components: {
    [key: string]: PluginObject<{
        install: () => void
        [key: string]: any
    }>
} = {
    VOssImg
}

function install(vue: typeof Vue, options = {}) {
    Object.keys(components).forEach(key => {
        Vue.use(components[key])
    })
}
export {
    VOssImg
}
export default {
    install,
    version,
    ...components
}

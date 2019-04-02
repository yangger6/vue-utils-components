import vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $supportWebp: boolean
    }
}

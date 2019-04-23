<template>
    <img ref="img" :src="currentSrc" @error="loadFallback" :alt="alt" @click="$emit('click')">
</template>
<script lang="ts">
    import {Vue, Prop, Component} from 'vue-property-decorator'
    @Component({})
    export default class VOssImg extends Vue {
        @Prop({
            type: String,
            default: ''
        }) src: string
        @Prop(String) alt!: string
        isOss: boolean = false
        isWebp: boolean = false
        $supportWebp: boolean = Vue.prototype.$supportWebp
        created() {
            if (this.src) {
                this.isOss = /aliyun/.test(this.src)
                this.isWebp = /^(\s|\S)+(webp|WEBP)+$/.test(this.src)
            }
        }
        loadFallback(e: EventTarget) {
            const img: HTMLImageElement = (this.$refs as any).img
            if (this.$supportWebp && !this.isWebp) { // fallback image
                img.src = this.src
            } else { // image loaded error
                if (img.src !== `${img.baseURI}error.png`) {
                    img.src = 'error.png'
                }
            }
        }
        get currentSrc () {
            if (this.isOss) {
                if (this.$supportWebp) {
                    if (this.isWebp) {
                        return this.src
                    }
                    if (/x-oss-process/.exec(this.src)) { // oss已经使用了参数的情况 追加选项即可
                        return this.src + ',image/format,webp'
                    }
                    return this.src + '?x-oss-process=image/format,webp'
                } else {
                    return this.src + '?x-oss-process=image/interlace,1/format,jpg'
                }
            } else {
                return this.src
            }
        }
    }
</script>
<style lang="less">
</style>

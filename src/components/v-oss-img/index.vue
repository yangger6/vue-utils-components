<template>
    <img ref="img" :src="currentSrc" @error="loadFallback" :alt="errorText || alt" @click="$emit('click')" :width="currentWidth" :height="currentHeight">
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
        @Prop([String, Number]) width: string | number
        @Prop([String, Number]) height: string | number
        isOss: boolean = false
        isWebp: boolean = false
        errorText: string = ''
        errorTimes: number = 0
        $supportWebp: boolean = Vue.prototype.$supportWebp
        created() {
            if (this.src) {
                this.isOss = /aliyun/.test(this.src)
                this.isWebp = /^(\s|\S)+(webp|WEBP)+$/.test(this.src)
            }
        }
        loadFallback(e: EventTarget) {
            const img: HTMLImageElement = (this.$refs as any).img
            if (this.errorTimes >= 5) { // 5 times errorFallback
                const isChinese = new Date().toLocaleString().match(/\p{Unified_Ideograph}/u)
                this.errorText = isChinese ? '图片加载失败' : 'image loaded error, please check image url'
                return
            }
            if (this.$supportWebp && !this.isWebp) { // fallback image
                img.src = this.src
            } else { // image loaded error
                if (img.src !== `${img.baseURI}error.png`) {
                    img.src = 'error.png'
                }
            }
            this.errorTimes ++
        }
        get currentSrc () {
            let resizeText = `${this.currentWidth ? `,w_${this.currentWidth}` : ''}${this.currentHeight ? `,h_${this.currentHeight}` : ''}`
            http://image-demo.oss-cn-hangzhou.aliyuncs.com/example.jpg?x-oss-process=image/resize,l_100
            if (this.isOss) {
                if (this.$supportWebp) {
                    if (this.isWebp) {
                        return `${this.src}?x-oss-process=image/resize${resizeText}`
                    }
                    if (/x-oss-process/.exec(this.src)) { // oss已经使用了参数的情况 追加选项即可
                        return this.src + ',image/format,webp' + resizeText
                    }
                    return this.src + '?x-oss-process=image/format,webp,resize' + resizeText
                } else {
                    return this.src + '?x-oss-process=image/interlace,1/format,jpg,resize' + resizeText
                }
            } else {
                return this.src
            }
        }
        get currentWidth (): string {
            if (this.width) {
                if (typeof this.width === 'string') {
                    const matchesArr = this.width.match(/\d*/)
                    if (matchesArr && matchesArr[0]) {
                        return matchesArr[0]
                    } else {
                        return ''
                    }
                } else if (typeof this.width === 'number') {
                    return String(this.width)
                } else {
                    return ''
                }
            } else {
                return ''
            }
        }
        get currentHeight (): string  {
            if (this.height) {
                if (typeof this.height === 'string') {
                    const matchesArr = this.height.match(/\d*/)
                    if (matchesArr && matchesArr[0]) {
                        return matchesArr[0]
                    } else {
                        return ''
                    }
                } else if (typeof this.height === 'number') {
                    return String(this.height)
                } else {
                    return ''
                }
            } else {
                return ''
            }
        }
    }
</script>
<style lang="less">
</style>

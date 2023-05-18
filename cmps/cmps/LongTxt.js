export default {
    props: {
        txt: {
            type: String,
            required: true
        },
        length: {
            type: Number,
            required: false,
            default: 100
        },
    },
    template: `
    <section class="long-txt">
        <p> {{ readMore }}</p>
        <p v-if="isReadMore">{{ readMore }}</p>
        <button class="btn-read-more" @click="isReadMore = !isReadMore">{{ getBtnText }}</button>
    </section>
    `,
    data() {
        return {
            isReadMore: false,
            btnText: 'Read More'
        }
    },
    methods: {

    },
    computed: {
        getBtnText() {
            if (this.isReadMore) return `Read Less`
            return `Read More`
        },
        readMore() {
            if (!this.isReadMore && this.txt.length > this.length)
                return this.txt.slice(0, this.length) + '...'
            return this.txt
        },
    }
}

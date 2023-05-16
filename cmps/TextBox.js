export default {
    props: ['info'],
    template: `
        <section>
            <label>
                {{info.label}}
                <input type="text" v-model="val" @change="reportVal"  />
            </label>  
        </section>
    `,
    data() {
        return {
            val: '',
        }
    },
    methods: {
        reportVal() {
            this.$emit('setVal', this.val)
        },
    },
}

export default {
    props: ['info'],
    template: `
        <section>
            {{info.label}}
            <label v-for="n in info.max" >
                <input type="radio" :value="n" @change="reportVal" v-model="val">
                <span>{{n}}&nbsp;&nbsp;&nbsp;</span>
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
        }
    },
    created() {
        console.log(this.info) 
    }
} 
export default {
    props: ['info'],
    template: `
        <section>
            <label>
                {{info.label}}
                <select v-model="val" @change="reportVal">  
                    <option v-for="opt in info.opts">{{opt}}</option>
                </select>
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
        }
} 
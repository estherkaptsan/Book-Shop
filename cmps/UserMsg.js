import { eventBusService } from '../services/event-bus.service.js'

export default {
    template: `
        <div class="user-msg" :class="msg.type" v-if="msg">
            <button @click="msg=null">x</button>
            <p>
                {{msg.txt}}
            </p>
        </div>
    `,
    data() {
        return {
            msg: null,
            // id: null
        }
    },
    created() {
        this.unsubscribe = eventBusService.on('show-msg', (msg) => {
            console.log('Msg:', msg)
            this.msg = msg
            // console.log(msg.id)
            setTimeout(() => {
                this.msg = null
            }, 1500)
        })
    },
    unmounted() {
        // This code never runs in this case
        this.unsubscribe()
    }
}
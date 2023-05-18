// import { bookService } from "../../services/book.service.js"
// import { eventBusService } from '../../services/event-bus.service.js'

import SelectBox from '../SelectBox.js'
import textBox from '../../cmps/TextBox.js'
import linearScale from '../../cmps/cmps/LinearScake.js'

import { surveyService } from "../../services/survey.service.js"

export default {
    props: ['bookId'],
    template: `
    <section class="review">
        <h1>Add a Review</h1>
        <form @submit.prevent="save" class="add-review">
            <input v-model="name"
                   placeholder="Your name"
                   type="text" />

            <input v-model.number="rating"
                   placeholder="rating"
                   type="number"
                   min="1" 
                   max="5" />
                   
            <input v-model="date"
                   type="date" />
            <button>Save</button>
        </form>

        <!-- <section v-if="survey">
        <h2 :style="{color: survey.color}">{{survey.title}}</h2>
            <form @submit.prevent="save">
                <div v-for="(cmp, idx) in survey.cmps">
                    <Component 
                        :is="cmp.type"  
                        :info="cmp.info" 
                        @setVal="setAns($event, idx)" />
                </div>
                <button>Save</button>
            </form>
        </section> -->
        <!-- <pre>{{answers}}</pre> -->
    </section>
    `,
    data() {
        return {
            name: '',
            rating: null,
            date: null,
            survey: null,
            answers: []
        }
    },
    methods: {
        save() {
            const review = {
                fullName: this.name,
                rate: this.rating,
                readAt: this.date
            }
            this.$emit('review', review)
        },
        saveDinamicCmps() {
            console.log('Saving..', this.answers) 
        },
        setAns(ans, idx) {
            console.log('Setting the answer: ', ans, 'idx:', idx);
            // this.answers[idx] = ans
            this.answers.splice(idx, 1, ans)
            console.log(this.answers)
        },
    },
    created() {
        surveyService.getSurvey()
            .then(survey => {
                this.survey = survey
                this.answers = new Array(this.survey.cmps.length)
            })
    },
    components: {
        // multiCheck,
        textBox,
        linearScale,
        SelectBox
    }
}
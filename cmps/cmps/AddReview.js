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
            this.name = ''
            this.rating = ''
            this.date = ''

        },
        setAns(ans, idx) {
            this.answers.splice(idx, 1, ans)
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
        textBox,
        linearScale,
        SelectBox
    }
}
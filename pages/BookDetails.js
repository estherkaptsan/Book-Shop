import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

import LongTxt from '../cmps/cmps/LongTxt.js'
import AddReview from '../cmps/cmps/AddReview.js'
import ReviewPreview from '../cmps/cmps/ReviewPreview.js'

export default {
    template: `
        <section v-if="book" class="book-details">
            <section class="details">
                <div>
                    <img :src="book.thumbnail" />
                </div>
                
                <div>
                    <h2 class="title">{{ book.title }}</h2>
                    <h3>{{ authors }}</h3>
                    <h3>{{ printPageCount }}</h3>
                    <h3>{{ printPublishedDate }} Book</h3>
                    <h3 :class="setColorPrice">{{ formattedPrice }}</h3>
                    <h3 v-if="book.listPrice.isOnSale">ON SALE!</h3>
                    
                    <LongTxt :txt="book.description" :length="40"/>
                </div>
            </section>

            <section class="prev-next">
                <RouterLink :to="'/book/' + book.prevBookId" title="previous book"><i class="fa-solid fa-left-long"></i></RouterLink> 
                <RouterLink :to="'/book/' + book.nextBookId" title="next book"><i class="fa-solid fa-right-long"></i></RouterLink>
            </section>

            <AddReview  @review="saveReview" :bookId="book.id" />

            <section v-if="book.reviews && book.reviews.length > 0">
                <h1 class="reviews">Reviews</h1>
                <article v-for="review in book.reviews" class="row-review" >
                    <button @click="removeReview(review.id)"><i class="fa-regular fa-trash-can"></i></button>
                    <ReviewPreview :review="review" 
                   :key="book.id" />
                </article>
            </section>

            <section v-else>
                <h1 class="reviews">Reviews</h1>
                <p>No reviews yet, be the first one</p>
            </section>  

            <RouterLink class="back" to="/book" title="back to list"><i class="fa-solid fa-circle-arrow-left"></i></RouterLink>
        </section>
    `,
    data() {
        return {
            book: null,
            msg: 'On Sale!',
        }
    },
    methods: {
        loadBook() {
            bookService.get(this.bookId)
            .then(book => this.book = book)
        },
        closeDetails() {
            this.$emit('hide-details')
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
                .then((book) => {
                    eventBusService.emit('show-msg', { txt: 'review removed', type: 'success' })
                    this.book = book
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'review remove failed', type: 'error' })
                })
        },
        saveReview(review) {
            bookService.addReview(this.bookId, review)
                .then(savedBook => {
                    eventBusService.emit('show-msg', { txt: 'Review added', type: 'success' })
                    this.book = savedBook
                })
                .catch(err => {
                    eventBusService.emit('show-msg', { txt: 'Review failed', type: 'error' })
                })
    
        },
    },
    computed: {
        bookId() {
            return this.$route.params.bookId
        },
        printPageCount() {
            if (this.book.pageCount >= 500) return this.book.pageCount = `Serious Reading`
            if (this.book.pageCount >= 200) return this.book.pageCount = `Descent Reading`
            if (this.book.pageCount < 100) return this.book.pageCount = `Light Reading`
        },
        printPublishedDate() {
            const currYear = new Date().getFullYear()
            if (currYear - 10 > this.book.publishedDate) return this.book.publishedDate = `Vintage`
            if (currYear - 1 <= this.book.publishedDate) return this.book.publishedDate = `New`
        },
        setColorPrice() {
            return {
                'red': this.book.listPrice.amount > 150,
                'green': this.book.listPrice.amount < 20
            }
        },
        formattedPrice() {
            const { amount, currencyCode } = this.book.listPrice
            return new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).format(amount)
        },
        authors() {
            return this.book.authors.join()
        }
    },
    created() {
       this.loadBook()
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },
    components: {
        LongTxt,
        AddReview,
        ReviewPreview,
    },
}


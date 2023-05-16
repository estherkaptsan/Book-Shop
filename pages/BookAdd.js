import { googleService } from "../services/google-book.service.js"
import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"  

export default {
    template: `
        <section>
            <h1>Add Book</h1>

            <form @submit.prevent="addBooks">
                <input
                class="search-input"
                v-model="searchedWord"
                placeholder="Search"
                type="text" />
                <button>SEARCH</button>
            </form>
                
                <article v-for="book in booksSearch">
                    <h1> {{book.title}} </h1>
                    <!-- <button @click="save(book.id)">+</button> -->
                </article>
        </section>
    `,
    data() {
        return {
            booksSearch: null,
            searchedWord: '',
        }
    },
    methods: {
        addBooks() {
            googleService.addGoogleBooks(this.searchedWord)
                .then(books => {
                    console.log(books)
                    this.booksSearch = books
                })
        },
        save(bookId) {
            console.log(bookId) 
            bookService.save({...this.book})
                .then(savedBook => {
                    eventBusService.emit('show-msg', { txt: 'Book saved', type: 'success' })
                    this.$router.push('/book')
                })
                .catch(err=>{
                    eventBusService.emit('show-msg', { txt: 'Book save failed', type: 'error' })
                })
        }
    },
    created() {

    },
}

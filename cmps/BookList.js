import BookPreview from './BookPreview.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                   <RouterLink :to="'/book/'+book.id">
                     <BookPreview :book="book"/>
                   </RouterLink>  
                   <section class="actions">
                     <RouterLink :to="'/book/edit/'+book.id"><i class="fa-solid fa-pencil"></i></RouterLink>  
                     <button class="remove-book" @click="remove(book.id)"><i class="fa-regular fa-trash-can"></i></button>
                   </section>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        // showDetails(bookId){
        //     this.$emit('show-details', bookId)
        // },
    },
    computed: {

    },
    components: {
        BookPreview,
    }
}
export default {
    template: `
        <section class="book-filter">
            <input 
                class="search-input"
                v-model="filterBy.title"
                @input="filter" 
                placeholder="Search"
                type="text" />
            <!-- <input
                 v-model="filterBy.amount"
                 @input="filter" 
                 type="range"
                 min="10"
                 max="300"
                 value="65"
                 class="filter-amount" /> -->
        </section>
    `,
    data() {
        return {
            filterBy: { title: ''}, //, amount: 0 
        }
    },
    methods: {
        filter(){
            this.$emit('filter', {...this.filterBy})
        },
       
    }
}
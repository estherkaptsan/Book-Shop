export default {
    template: `
        <header class="app-header">
        <RouterLink to="/" title="home"><h1 class="logo">
            <img src="../../assets/img/book.png" />
        </h1></RouterLink> 
            
            <nav>
                <RouterLink to="/" title="home"><i class="fa-solid fa-house"></i></RouterLink> 
                <RouterLink to="/book" title="books"><i class="fa-solid fa-book-open"></i></RouterLink> 
                <RouterLink to="/book/edit" title="add a new book"><i class="fa-solid fa-plus"></i></RouterLink> 
                <!-- <RouterLink to="/book/addBook">Add a book google</RouterLink> | -->
                <!-- <RouterLink to="/about">About</RouterLink> -->
            </nav>
        </header>
    `,
    data() {
        return {}
    },
    methods: {}
}
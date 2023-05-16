export default {
    template: `
        <header class="app-header">
            <h1 class="logo">Books</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/book">Books</RouterLink> |
                <RouterLink to="/book/edit">Add a book</RouterLink> |
                <RouterLink to="/book/addBook">Add a book google</RouterLink> |
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </header>
    `,
    data() {
        return{}
    },
    methods: {}
}
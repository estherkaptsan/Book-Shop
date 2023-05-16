export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <img :src="book.thumbnail" />
            <h2>{{ book.title }}</h2>
            <h2>test, please  work!!!!</h2>
            <h3>Price: {{ book.listPrice.amount }} {{ book.listPrice.currencyCode }}</h3>
        </article>
    `,
}
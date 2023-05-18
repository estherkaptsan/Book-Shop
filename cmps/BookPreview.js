export default {
    props: ['book'],
    template: `
        <article class="book-preview">
            <img :src="book.thumbnail" />
            <h2>{{ book.title }}</h2>
            <h3>{{ book.listPrice.amount }} {{ book.listPrice.currencyCode }}</h3>
        </article>
    `,
}
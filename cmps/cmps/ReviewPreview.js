
export default {
    props: ['review'],
    template: `
    <section>
        <h3>name: {{review.fullName }}</h3>
        <h3>rate: {{ review.rate }}</h3>
        <h3>date: {{ review.readAt }}</h3>
    </section>
    `,
}
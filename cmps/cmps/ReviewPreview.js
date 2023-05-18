
export default {
    props: ['review'],
    template: `
    <section class="review-preview">
        <p>{{review.fullName }}</p>
        <p> {{ review.rate }}  <span><i class="fa-solid fa-star"></i></span></p>
        <p> {{ review.readAt }}</p>
    </section>
    `,
}
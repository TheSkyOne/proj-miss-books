export function ReviewList({ children, onReviewRemoveClicked}) {
    
    return (
        Array.isArray(children) ?
            <section className="review-list">
                {children.map(reviewListItem => (
                    <article key={reviewListItem.props.review.id} className="review-list-item-container">
                        {reviewListItem}
                        <button onClick={() => onReviewRemoveClicked(reviewListItem.props.review.id)} className="remove-review">X</button>
                    </article>
                ))}
            </section>
        :
        <div>{children}</div>
    )
}
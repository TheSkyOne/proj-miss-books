export function ReviewListItem({ review }) {


    return (
        <div className="review-list-item">
            <h5>Reviewer: {review.reviewerName}</h5>
            <h5>Rating: {review.rating}</h5>
            <h5>Read at: {review.readDate}</h5>
        </div>
    )
}
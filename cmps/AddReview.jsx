import { reviewService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState } = React


export function AddReview({ bookId, onReviewAdded }) {
    const [review, setReview] = useState(reviewService.getEmptyReview())

    function handleInputLoseFocus({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case "text":
            case "date":
                value = target.value
                break;
            case "range":
                value = +target.value
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onReviewSubmit(ev) {
        ev.preventDefault()
        reviewService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg("Review added successfully!")
                onReviewAdded(review)
            })
            .catch(() => showErrorMsg("Review could not be added..."))
    }


    return (
        <form className="add-review">
            <div className="review-field">
                <label htmlFor="reviewer-name">Your Name: </label>
                <input onBlur={handleInputLoseFocus} type="text" id="reviewer-name" name="reviewerName" required></input>
            </div>

            <div className="review-field">
                <label htmlFor="rating">Rating: </label>
                <input onBlur={handleInputLoseFocus} type="range" id="rating" name="rating" min="1" max="5" defaultValue="3" required></input>
            </div>

            <div className="review-field">
                <label htmlFor="read-date">Read at: </label>
                <input onBlur={handleInputLoseFocus} type="date" id="read-date" name="readDate" required></input>
            </div>

            <button onClick={onReviewSubmit} className="submit-review">Submit Review</button>
        </form>
    )
}
import { getEmptyBook, reviewService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useRef } = React


export function AddReview({ bookId, onReviewAdded }) {
    const [review, setReview] = useState(reviewService.getEmptyReview())
    const [rateType, setRateType] = useState("stars")

    function handleInputLoseFocus({ target }) {
        let { value, name: field } = target
        switch (target.getAttribute("type")) {
            case "text":
            case "date":
                value = target.value
                break

            case "range":
            case "number":
                console.log(+target.value)
                value = +target.value
                break

            case "stars":
                value = target.getAttribute("value")
                field = target.getAttribute("name")
                break
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onReviewSubmit(ev) {
        ev.preventDefault()
        //check review keys not falsy
        reviewService.addReview(bookId, review)
            .then(() => {
                showSuccessMsg("Review added successfully!")
                onReviewAdded(review)
                setReview(reviewService.getEmptyReview())
            })
            .catch(() => showErrorMsg("Review could not be added..."))
    }

    function onRatingTypeChnaged(newType) {
        setRateType(newType)
    }

    return (
        <form className="add-review">
            <div className="review-field">
                <label htmlFor="reviewer-name">Your Name: </label>
                <input onBlur={handleInputLoseFocus} type="text" id="reviewer-name" name="reviewerName" required></input>
            </div>

            <div className="rating-section">
                <div className="review-field">
                    <label htmlFor="rating">Rating: </label>
                    <DynamicRatingCmp review={review} type={rateType} handleInputLoseFocus={handleInputLoseFocus} />
                </div>
                <RatingSelection onRatingSelected={onRatingTypeChnaged} />
            </div>

            <div className="review-field">
                <label htmlFor="read-date">Read at: </label>
                <input onBlur={handleInputLoseFocus} type="date" id="read-date" name="readDate" required></input>
            </div>

            <button onClick={onReviewSubmit} className="submit-review">Submit Review</button>
        </form>
    )
}


function RatingSelection({ onRatingSelected }) {

    return (
        <fieldset className="dynamic-rating-selection">
            <legend>Pick rating method</legend>
            <div>
                <input onClick={() => onRatingSelected("stars")} type="radio" id="rate-stars" name="rate" value="stars" defaultChecked></input>
                <label htmlFor="rate-stars">Rate by stars</label>
            </div>
            <div>
                <input onClick={() => onRatingSelected("selection")} type="radio" id="rate-select" name="rate" value="select"></input>
                <label htmlFor="rate-select">Rate by selecting</label>
            </div>
            <div>
                <input onClick={() => onRatingSelected("number")} type="radio" id="rate-number" name="rate" value="number"></input>
                <label htmlFor="rate-number">Rate by number input</label>
            </div>
        </fieldset>
    )
}


function DynamicRatingCmp({ review, type, handleInputLoseFocus }) {
    const cmpMap = {
        stars: <RateByStars review={review} onReviewFieldLoseFocus={handleInputLoseFocus} />,
        selection: <RateBySelection review={review} onReviewFieldLoseFocus={handleInputLoseFocus} />,
        number: <RateByNumber review={review} onReviewFieldLoseFocus={handleInputLoseFocus} />
    }

    return cmpMap[type]
}


function RateByStars({ review, onReviewFieldLoseFocus }) {
    const elDiv = useRef()
    const [fullStarCount, setFullStarCount] = useState(3)

    const emptyStar = "☆"
    const fullStar = "★"

    function getMousePos({ nativeEvent: { offsetX } }) {
        const divWidth = elDiv.current.offsetWidth
        const starThreshold = divWidth / 5
        setFullStarCount(Math.ceil(offsetX / starThreshold))
    }

    const starStr = `${fullStar.repeat(fullStarCount)}${emptyStar.repeat(5 - fullStarCount)}`

    const eventHandlers = {
        onBlur: onReviewFieldLoseFocus,
        onMouseMove: getMousePos,
        onMouseEnter: () => elDiv.current.focus(),
    }

    return (
        <div type="stars" value={fullStarCount} ref={elDiv} id="stars-rating" name="rating" {...eventHandlers} tabIndex={0} style={{ display: "inline" }}>{starStr}</div>
    )
}

function RateBySelection({ review, onReviewFieldLoseFocus }) {
    const [rating, setRating] = useState(3)

    function onRatingChanged({ target }) {
        setRating(+target.value)
    }

    return (
        <div>
            <input onChange={onRatingChanged} onBlur={onReviewFieldLoseFocus} type="range" id="selection-rating" name="rating" min="1" max="5" defaultValue={review.rating} required></input>
            <label htmlFor="rating">{rating}</label>
        </div>
    )
}

function RateByNumber({ review, onReviewFieldLoseFocus }) {

    return (
        <input onBlur={onReviewFieldLoseFocus} type="number" id="number-rating" name="rating" min="1" max="5" defaultValue={review.rating} required></input>
    )
}
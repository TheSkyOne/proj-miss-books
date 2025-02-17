import { bookService } from "../services/books.service.js"
import { LongTxt } from "./LongTxt.jsx"
import { AddReview } from "./AddReview.jsx"
import { ReviewList } from "./ReviewList.jsx"
import { ReviewListItem } from "./ReviewListItem.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){
    const [book, setBook] = useState(null)
    const [reviews, setReviews] = useState([])
    const url_params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [url_params.bookId])

    function loadBook(){
        bookService.get(url_params.bookId)
            .then(book => {
                setBook(book)
                setReviews(book.reviews)
            })
            .catch(() => navigate("/not-found"))
    }

    function getBookDisplayData() {
        if(!book) return

        return {
            readingType: book.pageCount < 100 ? "Light Reading" 
                            : book.pageCount < 500 ? "Decent Reading" 
                            : "Serious Reading"
                        ,
            ageStatus: book.publishedDate > 10 ? "Vintage"
                            : book.publishedDate < 1 ? "New"
                            : ""
                        ,

            priceClass: book.listPrice.amount > 150 ? "expensive"
                            : book.listPrice.amount < 20 ? "cheap"
                            : ""
        }
    }

    function onReviewAdded(review){
        setReviews(prevReviews => [...prevReviews || [], review])
    }

    function onReviewRemoveClicked(reviewId) {
        bookService.get(book.id)
            .then(book => {
                book.reviews = book.reviews.filter(review => review.id !== reviewId)
                bookService.save(book)
                    .then(() => setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId)))
                    .then(() => showSuccessMsg("Review removed successfully"))
                    .catch(() => showErrorMsg("Failed to remove review"))
                
            })
    }

    if (!book) return <div className="loader">Loading...</div>

    const displayData = getBookDisplayData()
    const hasReviews = reviews && reviews.length > 0
    return (
        <section className="book-details-page">
            <section className="book-details">
                <h1>{book.title}</h1>
                <h3 className="subtitle">{book.subtitle}</h3>
                <h4>Genres: {book.categories.join(", ")}</h4>
                <h4 className="pages-count">Pages: {book.pageCount} - <span className="reading-type">{displayData.readingType}</span> </h4>
                <img src={book.thumbnail} alt="book's cover image"></img>
                <h3 className="authors">Written by: {book.authors.join(" & ")}</h3>
                <h4>Publication Year: {book.publishedDate} - <span>{displayData.ageStatus}</span></h4>
                <section className="description">
                    <h2 className="desc-title">Description:</h2>
                    <LongTxt>{book.description}</LongTxt>
                </section>
                <h2 className="price-display">Price: <span className={displayData.priceClass}>{book.listPrice.amount}</span></h2>
                <div className="navigation">
                    <button><Link to={`/books/${book.prevBookId}`}>Previous Book</Link></button>
                    <button><Link to={`/books/${book.nextBookId}`}>Next Book</Link></button>
                </div>
            </section>

            <section className="review-section">
                <h1>Review This Book!</h1>
                <AddReview bookId={book.id} onReviewAdded={onReviewAdded}></AddReview>
                <h2>Reviews:</h2>
                <ReviewList onReviewRemoveClicked={onReviewRemoveClicked}>
                    {hasReviews ?
                        reviews.map(review => (
                            <ReviewListItem
                                key={review.id} 
                                review={review}
                            />
                        ))
                        :
                        <h1>No reviews yet</h1>
                    }
                </ReviewList>

            </section>
        </section>
    )
}
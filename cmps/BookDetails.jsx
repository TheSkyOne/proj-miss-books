import { bookService } from "../services/books.service.js"
import { LongTxt } from "./LongTxt.jsx"
import { AddReview } from "./AddReview.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){
    const [book, setBook] = useState(null)
    const url_params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [url_params.bookId])

    function loadBook(){
        bookService.get(url_params.bookId)
            .then(setBook)
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
    const displayData = getBookDisplayData()

    if (!book) return <div className="loader">Loading...</div>
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
                <h2>Review This Book!</h2>
                <AddReview bookId={book.id}></AddReview>
            </section>
        </section>
    )
}
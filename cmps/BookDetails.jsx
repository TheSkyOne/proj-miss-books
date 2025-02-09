import { bookService } from "../services/books.service.js"

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

    const readingType = book ?
                            book.pageCount < 100 ? "Light Reading" 
                            : book.pageCount < 500 ? "Decent Reading" 
                            : "Serious Reading"
                        : ""
    
    const ageStatus = book ?
                        book.publishedDate > 10 ? "Vintage"
                        : book.publishedDate < 1 ? "New"
                        : ""
                    : ""

    const priceClass = book ?
                        book.listPrice.amount > 150 ? "expensive"
                        : book.listPrice.amount < 20 ? "cheap"
                        : ""
                    : ""

    if (!book) return <div className="loader">Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h3 className="subtitle">{book.subtitle}</h3>
            <h4>Genres: {book.categories.join(", ")}</h4>
            <h4 className="pages-count">Pages: {book.pageCount} - <span className="reading-type">{readingType}</span> </h4>
            <img src={book.thumbnail} alt="book's cover image"></img>
            <h3 className="authors">Written by: {book.authors.join(" & ")}</h3>
            <h4>Publication Year: {book.publishedDate} - <span>{ageStatus}</span></h4>
            <p className="description">Description:<br></br>{book.description}</p>
            <h2 className="price-display">Price: <span className={priceClass}>{book.listPrice.amount}</span></h2>
            <div className="navigation">
                <button><Link to={`/books/${book.prevBookId}`}>Previous Book</Link></button>
                <button><Link to={`/books/${book.nextBookId}`}>Next Book</Link></button>
            </div>
        </section>

    )
}
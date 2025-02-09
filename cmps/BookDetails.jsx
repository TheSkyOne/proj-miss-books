import { bookService } from "../services/books.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails(){
    const [book, setBook] = useState(null)
    const url_params = useParams()

    useEffect(() => {
        loadBook()
    }, [url_params.bookId])

    function loadBook(){
        bookService.get(url_params.bookId)
            .then(setBook)
            .catch(err => console.log("cant get book: ", err))
    }

    if (!book) return <div className="loader">Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h3 className="subtitle">{book.subtitle}</h3>
            <h4>Genres: {book.categories.join(", ")}</h4>
            <img src={book.thumbnail} alt="book's cover image"></img>
            <h3 className="authors">Written by: {book.authors.join(" & ")}</h3>
            <h4>Publication Year: {book.publishedDate}</h4>
            <p className="description">Description:<br></br>{book.description}</p>
        </section>

    )
}
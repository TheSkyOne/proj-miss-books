const { useEffect, useState } = React
import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"

export function BookIndex(){
    const [books, setBooks] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks(){
        bookService.query()
            .then(setBooks)
            .catch(err => console.error("cant get books: ", err))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="book-index">
            <BookList books={books}/>
        </section>
    )
}
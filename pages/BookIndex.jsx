const { useEffect, useState } = React
const { Link } = ReactRouterDOM
import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filter, setFilter] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filter])

    function loadBooks() {
        bookService.query(filter)
            .then(setBooks)
            .catch(err => console.error("cant get books: ", err))
    }

    function onFilterChanged(newFilter) {
        setFilter(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    function onRemoveClicked(bookId){
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                console.log("book removed successfully")
            })
            .catch((err) => console.error("failed to remove book", err))
    }

    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onFilterChanged} filter={filter} />
            <button className="add-book"><Link to="/book/edit">Add Book</Link></button>
            <BookList books={books} onRemoveBook={onRemoveClicked} />
        </section>
    )
}
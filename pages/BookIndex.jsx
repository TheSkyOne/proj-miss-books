const { useEffect, useState } = React
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


    if (!books) return <div className="loader">Loading...</div>
    return (
        <section className="book-index">
            <BookFilter onSetFilter={onFilterChanged} filter={filter} />
            <BookList books={books} />
        </section>
    )
}
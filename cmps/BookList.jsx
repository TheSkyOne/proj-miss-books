import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="books-list">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book}></BookPreview>
                    <button onClick={() => onRemoveBook(book.id)} className="remove-button">X</button>
                    <div className="book-buttons">
                        <button><Link to={`/books/edit/${book.id}`}>Edit</Link></button>
                        <button><Link to={`/books/${book.id}`}>Details</Link></button>
                    </div>

                </li>
            )}
        </ul>
    )
}
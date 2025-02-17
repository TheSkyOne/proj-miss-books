import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books, mode, onRemoveBook, onAddGoogleBook }) {

    return (
        <ul className="books-list">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book}></BookPreview>
                    {mode === "index" && <button onClick={() => onRemoveBook(book.id)} className="remove-button">X</button>}
                    {
                        mode === "index" &&
                        <div className="book-buttons">
                            <button><Link to={`/books/edit/${book.id}`}>Edit</Link></button>
                            <button><Link to={`/books/${book.id}`}>Details</Link></button>
                        </div>
                        ||
                        mode ==="googleBooks" && <button onClick={() => onAddGoogleBook(book)}>Add to Library</button>
                    }
                </li>
            )}
        </ul>
    )
}
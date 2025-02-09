import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({ books }) {

    return (
        <ul className="books-list">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book}></BookPreview>
                    <button><Link to={`/books/${book.id}`}>Details</Link></button>
                </li>
            )}
        </ul>
    )
}
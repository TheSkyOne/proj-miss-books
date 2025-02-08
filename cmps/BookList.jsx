import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books }) {

    return (
        <ul className="books-list">
            {books.map(book => 
                <li key={book.id}>
                    <BookPreview book={book}></BookPreview>
                </li>
            )}
        </ul>
    )
}
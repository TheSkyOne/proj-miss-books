export function BookPreview({ book }) {

    return (
        <article className="book-preview">
            <h4>{book.title}</h4>
            <h5>{book.subtitle}</h5>
            <img src={book.thumbnail} alt="book's image"></img>
            <h4>{book.authors.join(" & ")}</h4>
            <h5>{book.price}</h5>
        </article>

    )
}
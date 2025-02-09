import saleBanner from "assets/misc/sale_banner.png"

export function BookPreview({ book }) {


    return (
        <article className="book-preview">
            {book.listPrice.isOnSale && <img className="sale-img" src={saleBanner}></img>}
            <h4>{book.title}</h4>
            <h5>{book.subtitle}</h5>
            <img src={book.thumbnail} alt="book's cover image"></img>
            <h4>{book.authors.join(" & ")}</h4>
            <h5 className="price">Price: {book.listPrice.amount}</h5>
        </article>

    )
}
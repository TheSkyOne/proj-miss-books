export function BookPreview({ book }) {


    const keys = {
        title: book.title || "",
        subtitle: book.subtitle || "",
        thumbnail: book.thumbnail || null,
        authors: book.authors || [],
        listPrice: {
            amount: book.listPrice.amount || 0,
            isOnSale: book.listPrice.isOnSale || false 
        }
    }
    return (
        <article className="book-preview">
            {book.listPrice.isOnSale && <img className="sale-img" src="./assets/misc/sale_banner.png"></img>}
            <h4>{book.title}</h4>
            <h5>{book.subtitle}</h5>
            <img src={book.thumbnail} alt="book's cover image"></img>
            <h4>{book.authors.join(" & ")}</h4>
            <h5 className="price">Price: {book.listPrice.amount}</h5>
        </article>

    )
}
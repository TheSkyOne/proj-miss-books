export function BookPreview({ book }) {

    const keys = {
        title: book.title || "",
        subtitle: book.subtitle || "",
        thumbnail: book.thumbnail || null,
        authors: book.authors || [],
        listPrice: book.listPrice && {
            amount: book.listPrice.amount || 0,
            isOnSale: book.listPrice.isOnSale || false 
        } || {amount: 0, isOnSale: false}
    }
    return (
        <article className="book-preview">
            {keys.listPrice.isOnSale && <img className="sale-img" src="./assets/misc/sale_banner.png"></img>}
            <h4>{keys.title}</h4>
            <h5>{keys.subtitle}</h5>
            <img src={keys.thumbnail} alt="book's cover image"></img>
            <h4>{keys.authors.join(" & ")}</h4>
            <h5 className="price">Price: {keys.listPrice.amount}</h5>
        </article>

    )
}
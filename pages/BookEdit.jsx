import { bookService } from "../services/books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {
    const [book, setBook] = useState(bookService.getEmptyBook())
    const [bookLoaded, setBookLoaded] = useState(false)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => {
                setBookLoaded(true)
                setBook(book)
            })
            .catch(err => console.err("problem getting book", err))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case "text":
            case "date":
                value = target.value
        }
        setBook(prevBook => ({ ...prevBook, [field]: value }))
    }

    function handleListPriceChange({ target }) {
        let { name: field } = target
        let value = target.value !== "" ? +target.value : ""
        setBook(prevBook => (
            { ...prevBook, listPrice: { ...prevBook.listProce, [field]: value } }
        ))
    }

    function handleArrayTypeChange({ target }) {
        let { value, name: field } = target
        let arr
        if (value.includes(",")) {
            arr = value.split(",")
            arr.forEach(str => str.trim());
        }
        else {
            arr = [value]
        }

        setBook(prevBook => ({ ...prevBook, [field]: arr }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(book)
            .then(() => {
                showSuccessMsg("Successfully saved book!")
                navigate('/books')
            })
            .catch(err => {
                showErrorMsg("Could not save book...")
                console.error('Cannot save!', err)
            }) 
    }


    

    const {
        title,
        description,
        authors,
        categories,
        publishedDate,
        listPrice
    } = book

    return (
        <section className="book-edit">
            <h1>{bookId ? "Edit Book" : "Add Book"}</h1>
            <form>
                <label htmlFor="title">Book Title:</label>
                <input onChange={handleChange} type="text" id="title" name="title" value={title} required></input>

                <label htmlFor="description">Book Description:</label>
                <textarea onChange={handleChange} type="text" id="description" name="description" value={description} rows="10" cols="45"></textarea>

                <label htmlFor="authors">Authors:</label>
                <input onChange={handleArrayTypeChange} type="text" id="authors" name="authors" value={authors} size="40" placeholder="Enter as comma seperated list"></input>

                <label htmlFor="categories">Genres:</label>
                <input onChange={handleArrayTypeChange} type="text" id="categories" name="categories" value={categories} size="40" placeholder="Enter as comma seperated list"></input>

                <label htmlFor="publishDate">Publishe Date:</label>
                <input onChange={handleChange} type="date" id="pub-date" name="publishedDate" value={publishedDate} required></input>

                <label htmlFor="price">Price:</label>
                <input onChange={handleListPriceChange} type="number" id="price" name="amount" value={listPrice.amount} required></input>
                
                {/* only set the button to disabled if we're on the edit page (bookId was grabbed from URL) and the book hasnt loaded yet */}
                <button onClick={onSaveBook} className="save-book" disabled={bookId && !bookLoaded}>Save</button>
            </form>



        </section>
    )
}
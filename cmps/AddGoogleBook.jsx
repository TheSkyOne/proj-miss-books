import { debounce } from "../services/util.service.js"
import { queryGoogleBooks, addGoogleBook } from "../services/google-books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { getEmptyBook } from "../services/books.service.js"
import { BookList } from "./BookList.jsx"
const { useState, useEffect, useRef } = React

export function AddGoogleBook() {
    const [queryTxt, setQueryTxt] = useState("")
    const [booksList, setBooksList] = useState([])
    const [formattedBooksList, setFormattedBooksList] = useState([])
    const onQueryTxtChangeDebounced = useRef(debounce(onQueryTxtChange, 500)).current

    useEffect(() => {
        if (queryTxt) queryGoogleBooks(queryTxt, onGoogleBooksApiResponse)
    }, [queryTxt])

    useEffect(() => {
        const reformattedBooks = []
        for (const book of booksList) {
            const reformattedBook = reformatGoogleBook(book)
            reformattedBooks.push(reformattedBook)
        }

        setFormattedBooksList(reformattedBooks)
    }, [booksList])


    function onQueryTxtChange({ target }) {
        setQueryTxt(target.value)
    }

    function onAddGoogleBookClicked(book) {
        addGoogleBook(book)
            .then(() => showSuccessMsg("Book saved successfully!"))
            .catch(() => showErrorMsg("Failed to save book..."))
    }


    function onGoogleBooksApiResponse(response) {
        setBooksList(response.items || [])
    }

    function reformatGoogleBook(googleBook) {
        const reformatedGoogleBook = Object.keys(getEmptyBook()).reduce((acc, key) => {
            if (key in googleBook.volumeInfo ) {
                acc[key] = googleBook.volumeInfo[key]
            }
            return acc
        }, {})

        

        //add the book id manually, as it is not in the volumeInfo which has all the other info we are interested in
        reformatedGoogleBook.id = googleBook.id

        //same with thumbnail
        reformatedGoogleBook.thumbnail = googleBook.volumeInfo.imageLinks ? googleBook.volumeInfo.imageLinks.thumbnail : null

        //some google books dont have listPrice, so add default values if not found
        reformatedGoogleBook.listPrice = reformatedGoogleBook.listPrice || { amount: 0, isOnSale: false }

        return reformatedGoogleBook
    }

    const noBooks = formattedBooksList && formattedBooksList.length === 0

    return (
        <section className="google-books">
            <label htmlFor="google-book-name"></label>
            <input onChange={onQueryTxtChangeDebounced} type="text" id="google-book-search" name="google-book-name" placeholder="search google books..."></input>

            <h1>Matching books:</h1>
            {
                !noBooks &&
                <BookList books={formattedBooksList} mode="googleBooks" onRemoveBook={null} onAddGoogleBook={onAddGoogleBookClicked} />
            }
            {
                noBooks && <div>No books to display</div>
            }
        </section>
    )
}
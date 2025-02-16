import { debounce } from "../services/util.service.js"
import { queryGoogleBooks, addGoogleBook } from "../services/google-books.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
const { useState, useEffect, useRef } = React

export function AddGoogleBook() {
    const [queryTxt, setQueryTxt] = useState("")
    const [booksList, setBooksList] = useState([])
    const onQueryTxtChangeDebounced = useRef(debounce(onQueryTxtChange, 500)).current

    useEffect(() => {
        console.log(queryTxt)
        if (queryTxt) queryGoogleBooks(queryTxt, onGoogleBooksApiResponse)
    }, [queryTxt])


    function onQueryTxtChange({ target }) {
        setQueryTxt(target.value)
    }

    function onAddGoogleBookClicked(book) {
        addGoogleBook(book)
            .then(() => showSuccessMsg("Book saved successfully!"))
            .catch(() => showErrorMsg("Failed to save book..."))
    }


    function onGoogleBooksApiResponse(response) {
        setBooksList(response.items)
    }


    return (
        <section className="google-books">
            <label htmlFor="google-book-name"></label>
            <input onChange={onQueryTxtChangeDebounced} type="text" id="google-book-search" name="google-book-name" placeholder="search google books..."></input>

            <h1>Matching books:</h1>
            <ul>
                {booksList.map(book => (
                    <div className="google-book-list-item" key={book.id}>
                        <li>{book.volumeInfo.title}</li>
                        <button className="add-google-book" onClick={() => onAddGoogleBookClicked(book)}>+</button>
                    </div>
                ))}
            </ul>
        </section>
    )
}
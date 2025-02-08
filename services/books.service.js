import { storageService } from "./async-storage.service.js"
import { loadFromStorage, saveToStorage, makeId } from "./util.service.js"
import { books } from "../books.js"

export const bookService = {
    query,
    get,
    remove,
    save
}

const BOOK_KEY = "books"


_createBooks()


function query(){
    return storageService.query(BOOK_KEY)
}

function get(bookId){
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId){
    //ask about return value, since storageService.remove returns a promise which resolves to undefined
    return storageService.remove(BOOK_KEY, bookId) 
}

function save(book){
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    }
    else {
        return storageService.post(BOOK_KEY, book)
    }
}


function _createBooks(){
    let existing_books = loadFromStorage(BOOK_KEY)
    if (!existing_books || existing_books.length === 0){
        console.log(books)
        saveToStorage(BOOK_KEY, books)
    }
}

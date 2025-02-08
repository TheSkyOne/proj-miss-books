import { storageService } from "./async-storage.service.js"
import { loadFromStorage, saveToStorage, makeId } from "./util.service.js"
import { books } from "../books.js"

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}

const BOOK_KEY = "books"


_createBooks()


function query(filter){
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filter.maxPageCount) books = books.filter(book => book.pageCount <= filter.maxPageCount)
            if (filter.maxPrice) books = books.filter(book => book.listPrice.amount <= filter.maxPrice)
            if (filter.onSale) books = books.filter(book => book.listPrice.isOnSale)
            return books
        })
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

function getDefaultFilter(){
    return {
        maxPageCount: 0,
        maxPrice: 1000,
        onSale: false
    }
}


function _createBooks(){
    let existing_books = loadFromStorage(BOOK_KEY)
    if (!existing_books || existing_books.length === 0){
        console.log(books)
        saveToStorage(BOOK_KEY, books)
    }
}

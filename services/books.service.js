import { storageService } from "./async-storage.service.js"
import { loadFromStorage, saveToStorage, makeId } from "./util.service.js"
import { books } from "../books.js"

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyBook
}

export const reviewService = {
    addReview,
    getEmptyReview
}

const BOOK_KEY = "books"


_createBooks()


export function query(filter = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filter.title) books = books.filter(book => book.title.includes(filter.title))
            if (filter.maxPageCount) books = books.filter(book => book.pageCount <= filter.maxPageCount)
            if (filter.maxPrice) books = books.filter(book => book.listPrice.amount <= filter.maxPrice)
            if (filter.onSale) books = books.filter(book => book.listPrice.isOnSale)
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId) // whenever we retrive a book from storage, set its previous and next book's IDs
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

export function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    }
    else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter() {
    return {
        maxPageCount: 0,
        maxPrice: 1000,
        onSale: false
    }
}

export function getEmptyBook() {
    return {
        title: "",
        subtitle: "",
        categories: [],
        pageCount: 0,
        thumbnail: null,
        authors: [],
        publishedDate: 0,
        description: "",
        listPrice: {
            amount: 0,
            isOnSale: false
        }
    }
}


function addReview(bookId, review) {
    return get(bookId)
        .then(book => {
            review["id"] = review["id"] || makeId()
            if (book.reviews) book.reviews.push(review)
            else book["reviews"] = [review]
            return save(book)
        })
        .catch(err => {
            console.error("failed to add review because failed to retrieve book", err)
            return Promise.reject(err)
        })
}

function getEmptyReview() {
    return {
        id: "",
        reviewerName: "",
        rating: 1,
        readDate: ""
    }
}


function _setNextPrevBookId(book) {
    return query()
        .then(books => {
            const curBookIdx = books.findIndex(curBook => curBook.id === book.id)
            const nextBook = books[curBookIdx + 1] ? books[curBookIdx + 1] : books[0]
            const prevBook = books[curBookIdx - 1] ? books[curBookIdx - 1] : books[books.length - 1]
            book.nextBookId = nextBook.id
            book.prevBookId = prevBook.id
            return book
        })
}

function _createBooks() {
    let existing_books = loadFromStorage(BOOK_KEY)
    if (!existing_books || existing_books.length === 0) {
        console.log(books)
        saveToStorage(BOOK_KEY, books)
    }
}


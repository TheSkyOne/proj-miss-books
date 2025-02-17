import { query } from "./books.service.js"

const BOOK_KEY = "books"

export function queryGoogleBooks(title, responseHandler) {
    console.log(`sending query for title ${title}`)
    $.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&maxResults=20`, responseHandler)
}


export function addGoogleBook(googleBook) {
    return query({ title: googleBook.title })
        .then(books => {
            for (const book of books) {
                if (book.title === googleBook.title) {
                    return Promise.reject("book with this title already exists")
                }
            }

            return saveGoogleBook(googleBook)
                .then(() => {
                    console.log("google book saved successfully")
                    return Promise.resolve()
                })
                .catch((err) => {
                    console.error("failed to save google book", err)
                    return Promise.reject(err)
                })
        })
        .catch(err => {
            console.error(err)
            return Promise.reject()
        })
}


export function saveGoogleBook(book) {
    book = { ...book }
    return query(BOOK_KEY).then(entities => {
        entities.push(book)
        localStorage.setItem(BOOK_KEY, JSON.stringify(entities))
        return book
    })
}
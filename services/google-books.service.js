import { query, save, getEmptyBook } from "./books.service.js"

export function queryGoogleBooks(title, responseHandler) {
    console.log(`sending query for title ${title}`)
    $.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`, responseHandler)
}



export function addGoogleBook(googleBook) {
    console.log(googleBook)
    const reformatedGoogleBook = _reformatGoogleBook({
        thumbnail: googleBook.volumeInfo.imageLinks.thumbnail,
        ...googleBook.volumeInfo
    })

    return query({ title: reformatedGoogleBook.title })
        .then(books => {
            for (const book of books) {
                if (book.title === reformatedGoogleBook.title) {
                    return Promise.reject("book with this title already exists")
                }
            }
            return Promise.resolve()
        })
        .then(() => {
            console.log(reformatedGoogleBook)

            return save(reformatedGoogleBook)
                .then(() => console.log("google book saved successfully"))
                .catch(() => console.log("failed to save google book"))
        })
        .catch(err => {
            console.error(err)
            return Promise.reject()
        })
}

function _reformatGoogleBook(googleBook) {
    const reformatedGoogleBook = Object.keys(getEmptyBook()).reduce((acc, key) => {
        if (key in googleBook) {
            acc[key] = googleBook[key]
        }
        return acc
    }, {})

    //some google books dont have listPrice, so add default values if not found
    reformatedGoogleBook["listPrice"] = reformatedGoogleBook["listPrice"] || {amount: 0, isOnSale: false}
    return reformatedGoogleBook
}

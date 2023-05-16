'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import booksDB from "./../data/book.json" assert { type: "json" }

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.maxPrice >= filterBy.minPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function removeReview(bookId, reviewId) {
    return get(bookId).then((book) => {
        const idx = book.reviews.findIndex(review => review.id === reviewId)
        book.reviews.splice(idx, 1)
        return save(book)
    })
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        review.id = utilService.makeId(4)
        if (!book.reviews) {
            book.reviews = []
        }
        book.reviews.push(review)
       return save(book)
    })
}

function getEmptyBook(title = '') {
    const code = utilService.makeCode()
    return {
        // id: utilService.makeId(6),
        authors: ['Barbara Cartland'],
        title,
        pageCount: 299,
        publishedDate: 1999,
        description: utilService.makeLorem(20),
        thumbnail: `https://covers.openlibrary.org/b/id/${code}-L.jpg`,
        listPrice: {
            amount: 96,
            currencyCode: 'EUR',
            isOnSale: false
        }
    }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksDB
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title) {
    const book = getEmptyBook(title)
    book.id = utilService.makeId()
    return book
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
        book.prevBookId = books[bookIdx - 1]
            ? books[bookIdx - 1].id
            : books[books.length - 1].id
        return book
    })
}
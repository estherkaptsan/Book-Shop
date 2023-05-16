import { utilService } from "./util.service.js"
import { bookService } from "./book.service.js"

export const googleService = {
    addGoogleBooks
}
const SEARCH_KEY = 'googleBooksDB'

let googleBooks = utilService.loadFromStorage(SEARCH_KEY) || {}

function addGoogleBooks(search) {
    if(googleBooks[search]) {
        console.log('return from storage')
        return Promise.resolve(googleBooks[search])
    }
   
    return axios.get(`https://www.googleapis.com/books/v1/volumes?q=search+${search}`)
        .then(res => {
            const books = res.data.items.map(item => _prepareData(item))
            googleBooks[search] = books
            console.log(googleBooks[search]) 
            utilService.saveToStorage(SEARCH_KEY, googleBooks)
            return books
        })
}

function _prepareData(book) {
    const newBook = bookService.getEmptyBook()
    newBook.id = utilService.makeId()
    newBook.title = book.volumeInfo.title || ''
    newBook.description = book.volumeInfo.description || ''
    newBook.language = book.language || 'EN'
    newBook.pageCount = book.volumeInfo.pageCount || 0
    newBook.publishedDate = book.volumeInfo.publishedDate || 0
    newBook.subtitle = book.volumeInfo.subtitle || ''
    newBook.thumbnail = book.volumeInfo.imageLinks?.thumbnail || newBook.thumbnail
    newBook.authors = book.volumeInfo.authors || []
    newBook.categories = book.volumeInfo.categories || []
    newBook.listPrice.amount = utilService.getRandomIntInclusive(50, 200)
    newBook.listPrice.currencyCode = 'EUR'
    newBook.listPrice.isOnSale = book.saleInfo.saleability === 'NOT_FOR_SALE' ? false : true
    return newBook
}

// googleBooks = [
//     {txt:'Eran',books:[{1},{2},{4},{5},{6},{7},{8}]},
//     {txt:'Eran',books:[{1},{2},{4},{5},{6},{7},{8}]},
//     {txt:'Eran',books:[{1},{2},{4},{5},{6},{7},{8}]},
// ]
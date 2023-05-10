import unavailable from '../assets/book-cover-unavailable.jpg'

export function bookSearch(bookName) {
    let fetchPromise = Promise.resolve(fetch(`https://openlibrary.org/search.json?q=${bookName}`))
    .then((response) => Promise.resolve(response.json()))
    return fetchPromise
}

export function searchQuery(bookName) {
    let parsed = Promise.resolve(bookSearch(bookName)).then((searchResults) => {
        let obtainedBooks = []
        searchResults.docs.forEach((element) => {
            obtainedBooks.push({
                title: element.title ? element.title : "Untitled",
                author: element.author_name ? element.author_name[0] : "",
                cover: element.cover_i ? `https://covers.openlibrary.org/b/id/${element.cover_i}-L.jpg` : unavailable,
                pages: element.number_of_pages_median,
                publish_date: element.publish_date ? element.publish_date[0] : "Unknown",
                infopage: `https://openlibrary.org/${element.key}`
            })
        })
        return obtainedBooks
    }).then(result => result)
    return parsed
}


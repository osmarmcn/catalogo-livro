let books = [];


function displayBooks(booksToDisplay = books) {
    const booksContainer = document.getElementById('books-container')
    booksContainer.innerHTML = ''

    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div')
        bookCard.classList.add('book-card')
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Gênero:</strong> ${book.genre}</p>
            <p><strong>Ano:</strong> ${book.year}</p>
            <p><strong>Avaliação:</strong> <span class="rating">${book.rating.toFixed(1)}</span></p>
            <button onclick="rateBook('${book.title}')">Avaliar</button>
        `
        booksContainer.appendChild(bookCard)
    })
}


function addBook(event) {
    event.preventDefault()
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const genre = document.getElementById('genre').value
    const year = parseInt(document.getElementById('year').value)

    const newBook = {
        title,
        author,
        genre,
        year,
        rating: 0,
        ratingCount: 0
    }

    books.push(newBook)
    saveToJSON()
    displayBooks()
    event.target.reset()
}


function searchBooks() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
}


function sortBooks() {
    const sortBy = document.getElementById('sort-select').value
    const sortedBooks = [...books].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating;
        }
        return a[sortBy].localeCompare(b[sortBy])
    });
    displayBooks(sortedBooks)
}


function rateBook(title) {
    const rating = parseFloat(prompt(`Avalie ${title} (0-5):`, '0'))
    if (isNaN(rating) || rating < 0 || rating > 5) {
        alert('Por favor, insira uma avaliação válida entre 0 e 5.')
        return
    }

    const book = books.find(b => b.title === title)
    book.rating = ((book.rating * book.ratingCount) + rating) / (book.ratingCount + 1)
    book.ratingCount++

    saveToJSON()
    displayBooks()
}


function saveToJSON() {
    localStorage.setItem('books', JSON.stringify(books))
}


function loadFromJSON() {
    const storedBooks = localStorage.getItem('books')
    if (storedBooks) {
        books = JSON.parse(storedBooks)
    } else {
       
        books = [
            {
                "title": "O Senhor dos Anéis",
                "author": "J.R.R. Tolkien",
                "genre": "Fantasia",
                "year": 1954,
                "rating": 4.5,
                "ratingCount": 10
            },
            {
                "title": "1984",
                "author": "George Orwell",
                "genre": "Ficção Científica",
                "year": 1949,
                "rating": 4.3,
                "ratingCount": 8
            },
            {
                "title": "Orgulho e Preconceito",
                "author": "Jane Austen",
                "genre": "Romance",
                "year": 1813,
                "rating": 4.2,
                "ratingCount": 6
            }
        ];
        saveToJSON()
    }
    displayBooks()
}


document.getElementById('add-book-form').addEventListener('submit', addBook)
document.getElementById('search-button').addEventListener('click', searchBooks)
document.getElementById('sort-button').addEventListener('click', sortBooks)


document.addEventListener('DOMContentLoaded', loadFromJSON)

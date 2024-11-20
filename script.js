// script.js
const myLibrary = [];
const booksGrid = document.querySelector('.books-grid');
const addBookDialog = document.getElementById('addBookDialog');
const addBookForm = document.getElementById('addBookForm');
const addBookBtn = document.querySelector('.add-book-btn');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    booksGrid.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
            <div class="card-buttons">
                <button class="read-btn ${!book.read ? 'unread' : ''}">${book.read ? 'Read' : 'Not Read'}</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        booksGrid.appendChild(bookCard);
    });

    // Add event listeners for read and remove buttons
    document.querySelectorAll('.read-btn').forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeBook);
    });
}

function toggleReadStatus(e) {
    const index = e.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary[index].toggleRead();
    displayBooks();
}

function removeBook(e) {
    const index = e.target.parentElement.parentElement.getAttribute('data-index');
    myLibrary.splice(index, 1);
    displayBooks();
}

// Dialog event listeners
addBookBtn.addEventListener('click', () => {
    addBookDialog.showModal();
});

document.querySelector('.cancel-btn').addEventListener('click', () => {
    addBookDialog.close();
    addBookForm.reset();
});

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addBookForm);
    addBookToLibrary(
        formData.get('title'),
        formData.get('author'),
        parseInt(formData.get('pages')),
        formData.get('read') === 'on'
    );
    addBookDialog.close();
    addBookForm.reset();
});

// Add some sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, true);
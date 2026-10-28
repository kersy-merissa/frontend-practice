import { fetchBooks } from './fetchBooks.js';
import { addFavorite } from './favorites.js';

// Select DOM elements
const bookGrid = document.getElementById('bookGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');

// Function to render book cards into the grid
function displayBooks(books) {
    bookGrid.innerHTML = '';

    if (books.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }

    noResults.classList.add('hidden');

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition';

        bookCard.innerHTML = `
            <div>
                <img src="${book.cover_i}" alt="${book.title} cover" class="h-48 w-full object-cover rounded-md mb-4">
                <h3 class="font-bold text-lg mb-1 line-clamp-1">${book.title}</h3>
                <p class="text-sm text-gray-600 mb-4">By ${book.author_name}</p>
            </div>
            <button class="favorite-btn bg-indigo-50 text-indigo-600 font-semibold py-2 px-4 rounded hover:bg-indigo-600 hover:text-white transition">
                ❤️ Add to Favorites
            </button>
        `;

        // Handle click event to save favorite (Lab 2.3)
        const favButton = bookCard.querySelector('.favorite-btn');
        favButton.addEventListener('click', () => {
            addFavorite(book);
            favButton.textContent = '✔️ Saved!';
            favButton.classList.replace('bg-indigo-50', 'bg-green-100');
            favButton.classList.replace('text-indigo-600', 'text-green-700');
        });

        bookGrid.appendChild(bookCard);
    });
}

// Load books with loading indicators
async function loadAndRenderBooks(query) {
    loadingSpinner.classList.remove('hidden');
    bookGrid.innerHTML = '';
    noResults.classList.add('hidden');

    const books = await fetchBooks(query);

    loadingSpinner.classList.add('hidden');
    displayBooks(books);
}

// Search button click event
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        loadAndRenderBooks(query);
    }
});

// Press Enter to search
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load default books when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderBooks('javascript');
});
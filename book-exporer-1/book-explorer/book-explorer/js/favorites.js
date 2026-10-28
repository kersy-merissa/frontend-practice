// Get stored favorites from localStorage
export function getFavorites() {
    const storedFavorites = localStorage.getItem('bookExplorerFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
}

// Save favorites array to localStorage
function saveFavorites(favoritesArray) {
    localStorage.setItem('bookExplorerFavorites', JSON.stringify(favoritesArray));
}

// Add a book to favorites
export function addFavorite(book) {
    const favorites = getFavorites();
    const isAlreadySaved = favorites.some(fav => fav.key === book.key);
    
    if (!isAlreadySaved) {
        favorites.push(book);
        saveFavorites(favorites);
    }
}

// Remove a book from favorites by its key
export function removeFavorite(bookKey) {
    let favorites = getFavorites();
    favorites = favorites.filter(book => book.key !== bookKey);
    saveFavorites(favorites);
}
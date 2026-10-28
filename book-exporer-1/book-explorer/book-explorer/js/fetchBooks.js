JavaScript
// Asynchronous function to fetch books from the Open Library API
export async function fetchBooks(query = 'javascript') {
    try {
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodedQuery}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch book data.');
        }

        const data = await response.json();
        
        // Clean and map the results to only what we need
        return data.docs.slice(0, 12).map(book => ({
            key: book.key || Math.random().toString(),
            title: book.title || 'Unknown Title',
            author_name: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
            cover_i: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'https://via.placeholder.com/150?text=No+Cover'
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}
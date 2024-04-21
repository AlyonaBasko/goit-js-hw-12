import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.getElementById('loader');
const endOfResultsMessage = document.getElementById('end-of-results-message');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let clickCount = 0;

async function loadNextImages() {
    try {
        currentPage++;
        const response = await searchImages(currentQuery, currentPage);
        if (!response) {
            console.error('Error loading next images: response is undefined');
            return;
        }
        totalHits = response.totalHits;
        const images = response.hits;
        renderImages(images);

        // Перевірка, чи користувач дійшов до кінця колекції
        if (gallery.childElementCount >= totalHits) {
            loadMoreBtn.style.display = 'none';
            endOfResultsMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading next images:', error);
    }
}

loadMoreBtn.addEventListener('click', loadNextImages);

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();

    if (query === '') {
        iziToast.warning({
            title: 'Warning!',
            message: 'Please enter a search query',
            position: 'topCenter'
        });
        return;
    }

    currentPage = 1;
    currentQuery = query;

    loader.style.display = 'block';

    try {
        const response = await searchImages(query, currentPage);
        if (!response) {
            console.error('Error searching images: response is undefined');
            return;
        }
        const images = response.hits;
        renderImages(images);
        loadMoreBtn.style.display = images.length === 15 ? 'block' : 'none';
    } catch (error) {
        console.error('Error searching and rendering images:', error);
    } finally {
        loader.style.display = 'none';
    }
});
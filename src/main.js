import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.getElementById('loader');

let currentPage = 1;
let currentQuery = '';

loadMoreBtn.addEventListener('click', () => {
    fetchAndRenderImages(currentQuery, currentPage);
});

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
        const images = await searchImages(query, currentPage);
        renderImages(images);
        loadMoreBtn.style.display = images.length === 15 ? 'block' : 'none';
    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
});

async function fetchAndRenderImages(query, page) {
    try {
        const images = await searchImages(query, page);
        renderImages(images);
    } catch (error) {
        console.error('Error fetching and rendering images:', error);
    }
}
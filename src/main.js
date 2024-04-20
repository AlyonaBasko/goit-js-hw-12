import { searchImages } from './js/pixabay-api.js';
import { fetchAndRenderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');

const loadMoreBtn = document.getElementById('load-more-btn');

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

    currentPage = 1; // Скидаємо значення сторінки при новому пошуковому запиті
    currentQuery = query; // Зберігаємо поточний запит

    loader.style.display = 'block';

    try {
        const images = await searchImages(query, currentPage);
        renderImages(images);
        // Показуємо кнопку "Load more" тільки, якщо отримано 15 зображень
        loadMoreBtn.style.display = images.length === 15 ? 'block' : 'none';
    } catch (error) {
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
});
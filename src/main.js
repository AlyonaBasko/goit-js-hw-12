import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.getElementById('loader');

let currentPage = 1;
let currentQuery = '';

// Функція для завантаження наступних зображень
async function loadNextImages() {
    try {
        // Збільшуємо номер сторінки на 1
        currentPage++;

        // Викликаємо функцію пошуку та рендерингу зображень
        const images = await searchImages(currentQuery, currentPage);
        renderImages(images);
    } catch (error) {
        console.error('Error loading next images:', error);
    }
}

// Обробник події для натискання на кнопку "Load more"
loadMoreBtn.addEventListener('click', loadNextImages);

// Обробник події для натискання на кнопку пошуку
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

    // Оновлюємо значення змінних currentPage та currentQuery
    currentPage = 1;
    currentQuery = query;

    // Відображаємо індикатор завантаження
    loader.style.display = 'block';

    try {
        // Викликаємо функцію пошуку та рендерингу зображень
        const images = await searchImages(query, currentPage);
        renderImages(images);

        // Показуємо або ховаємо кнопку "Load more" в залежності від кількості отриманих зображень
        loadMoreBtn.style.display = images.length === 15 ? 'block' : 'none';
    } catch (error) {
        console.error('Error searching and rendering images:', error);
    } finally {
        // Ховаємо індикатор завантаження після завершення операції
        loader.style.display = 'none';
    }
});
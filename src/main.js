import { searchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const loader = document.getElementById('loader');


let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let cardHeight = 0;

async function loadNextImages() {
    try {
        currentPage++;
        const response = await searchImages(currentQuery, currentPage, 15);
        if (!response) {
            console.error('Error loading next images: response is undefined');
            return;
        }
        totalHits = response.totalHits;

        if (response.hits.length === 0 && currentPage === 1) {
            clearGallery();
            showNoImagesMessage();
            return;
        }

        renderImages(response.hits);

        if (response.hits.length < 15 || currentPage * 15 >= totalHits || currentPage >= 500 / 15) {
            loadMoreBtn.style.display = 'none';
            console.log("We're sorry, but you've reached the end of search results.");
            return;
        }

        const gallery = document.getElementById('gallery');
        if (gallery) {
            cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
            window.scrollBy(0, cardHeight * 2);
        } else {
            console.error('Element with id "gallery" not found');
        }
    } catch (error) {
        console.error('Error loading next images:', error);
    }
}


function clearGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.innerHTML = '';
    }
}



loadMoreBtn.addEventListener('click', loadNextImages);

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

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
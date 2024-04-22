import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function renderImages(images) {
    const gallery = document.getElementById('gallery');

    if (images.length === 0) {
        showNoImagesMessage();
        return;
    }

    const lightbox = new SimpleLightbox('.image-card a');

    images.forEach(image => {
        const card = createImageCard(image);
        gallery.appendChild(card);
    });

    lightbox.refresh();
}

function createImageCard(image) {
    const card = document.createElement('div');
    card.classList.add('image-card');

    const a = document.createElement('a');
    a.href = image.largeImageURL;

    const img = document.createElement('img');
    img.src = image.webformatURL;
    img.alt = image.tags;

    const details = document.createElement('div');
    details.classList.add('details');

    const likesContainer = createDetailElement('Likes:', image.likes);
    const viewsContainer = createDetailElement('Views:', image.views);
    const commentsContainer = createDetailElement('Comments:', image.comments);
    const downloadsContainer = createDetailElement('Downloads:', image.downloads);

    a.appendChild(img);
    card.appendChild(a);

    details.appendChild(likesContainer);
    details.appendChild(viewsContainer);
    details.appendChild(commentsContainer);
    details.appendChild(downloadsContainer);
    card.appendChild(details);

    return card;
}

function createDetailElement(label, value) {
    const container = document.createElement('div');
    container.classList.add('detail');

    const labelElement = document.createElement('div');
    labelElement.classList.add('detail-label');
    labelElement.textContent = label;

    const valueElement = document.createElement('div');
    valueElement.classList.add('detail-value');
    valueElement.textContent = value;

    container.appendChild(labelElement);
    container.appendChild(valueElement);

    return container;
}

function showNoImagesMessage() {
    iziToast.error({
        title: 'Sorry!',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
    });
}
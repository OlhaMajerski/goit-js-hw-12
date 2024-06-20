import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import closeIcon from '../img/alert-icon.svg';

let gallery = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.9,
  captionDelay: 250,
  captionsData: 'alt',
});

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function showLoader() {
  loader.style.display = 'block';
}

export function hideLoader() {
  loader.style.display = 'none';
}

function imageTemplate(image) {
  return `<a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p><b>Likes:</b> ${image.likes}</p>
        <p><b>Views:</b> ${image.views}</p>
        <p><b>Comments:</b> ${image.comments}</p>
        <p><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </a>`;
}

function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
export function renderImages(images) {
  const markup = imagesTemplate(images);
  galleryContainer.innerHTML = markup;
  gallery.refresh();
}

export function showError(message) {
  iziToast.error({
    message,
    messageSize: '16',
    messageColor: '#fff',
    backgroundColor: '#ef4040',
    position: 'topLeft',
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
    progressBar: true,
    progressBarColor: '#ffbebe',
    iconUrl: closeIcon,
    iconColor: '#fff',
  });
}

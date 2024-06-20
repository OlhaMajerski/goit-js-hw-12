import { getImages } from './js/pixabay-api.js';
import {
  renderImages,
  showError,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-form');

  form.addEventListener('submit', event => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    if (!query) {
      showError('Please enter a search term.');
      return;
    }

    showLoader();
    getImages(query)
      .then(data => {
        hideLoader();
        if (data.hits.length === 0) {
          showError(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          renderImages(data.hits);
          form.reset();
        }
      })
      .catch(error => {
        hideLoader();
        showError('An error occurred while fetching images.');
        console.error('Error fetching images:', error);
      });
  });
});

import { getImages } from './js/pixabay-api.js';
import {
  renderImages,
  showError,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-form');
  const ulEl = document.querySelector('.gallery');
  const loadMoreBtn = document.querySelector('.load-more');

  function scrollElem() {
    const liEl = ulEl.children[0];
    const heightOfLiEl = liEl.getBoundingClientRect().height;

    window.scrollBy({
      top: heightOfLiEl * 2,
      behavior: 'smooth',
    });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    if (!query) {
      showError('Please enter a search term.');
      return;
    }

    showLoader();
    currentQuery = query;
    currentPage = 1;
    ulEl.innerHTML = ''; // Clear the gallery for new search queries

    try {
      const data = await getImages(currentQuery, currentPage);
      hideLoader();
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        loadMoreBtn.style.display = 'none';
      } else {
        renderImages(data.hits, true);
        loadMoreBtn.style.display = 'block';
      }
    } catch (error) {
      hideLoader();
      showError('An error occurred while fetching images.');
      console.error('Error fetching images:', error);
      loadMoreBtn.style.display = 'none';
    }

    form.reset();
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    showLoader();

    try {
      const data = await getImages(currentQuery, currentPage);
      hideLoader();
      renderImages(data.hits, false);
      scrollElem();
      if (currentPage * 15 >= totalHits) {
        showError("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.style.display = 'none';
      }
    } catch (error) {
      hideLoader();
      showError('An error occurred while fetching images.');
      console.error('Error fetching images:', error);
      loadMoreBtn.style.display = 'none';
    }
  });
});

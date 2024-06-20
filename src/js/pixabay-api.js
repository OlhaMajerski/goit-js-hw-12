const API_KEY = '44388505-390a672441da303f6d08bc48a';

export function getImages(query) {
  const BASE_URL = 'https://pixabay.com/api/';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}?${params}`;

  return fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));
}

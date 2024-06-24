import axios from 'axios';

const API_KEY = '44388505-390a672441da303f6d08bc48a';

export async function getImages(query, page) {
  const baseURL = 'https://pixabay.com/api/';
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: page,
  };

  const response = await axios.get(baseURL, { params });
  return {
    hits: response.data.hits,
    totalHits: response.data.totalHits,
  };
}

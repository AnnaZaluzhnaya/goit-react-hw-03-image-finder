import PropTypes from 'prop-types';
import axios from 'axios';

const KEY = '27631880-b0639dc61f111cbc90b791bd4';
const BASE_URL = `https://pixabay.com/api/?&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

export const searchImages = async (query, page) => {
  const response = await axios.get(`${BASE_URL}&q=${query}&page=${page}`);

  if (!response.ok) {
    throw new Error('Nothing found to match your query');
  }

  return response.json();
};

searchImages.PropTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

import axios from 'axios';

let apiUrl;

const apiUrls = {
  production: '',
  development: 'https://got-project-0872d09e5214.herokuapp.com/api',
};

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;

import fetch from 'isomorphic-fetch';

async function apiFetch(url, config) {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.authorization = `bearer ${localStorage.getItem('token')}`;
  return await fetch(url, config);
}

export default apiFetch;

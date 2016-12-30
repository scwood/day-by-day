import { observable } from 'mobx';
import fetch from 'isomorphic-fetch';

const store = observable({
  unauthorized: false,
  entries: [],
});

const apiFetch = (store => {
  return async (url, config) => {
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.authorization = `bearer ${localStorage.getItem('token')}`;
    const result = await fetch(url, config);
    if (result.status === 401) {
      store.unauthorized = true;
    }
    return await result.json();
  };
})(store);

store.getEntries = async () => {
  const result = await apiFetch('/api/entries');
  store.entries = result.data.entries;
};

export default store;

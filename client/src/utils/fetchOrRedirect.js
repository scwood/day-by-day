import { browserHistory } from 'react-router';

import apiFetch from './apiFetch';

async function fetchOrRedirect(...args) {
  const result = await apiFetch(...args);
  if (result.status === 401) {
    browserHistory.replace('/landing');
  }
  return await result.json();
}

export default fetchOrRedirect;

import autobind from 'class-autobind';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

class ApiClient {

  constructor() {
    autobind(this);
  }

  async getToken(email, password) {
    return await this.fetchJson('/api/auth/tokens', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  async postSignUpEmail(email, password) {
    return await this.fetchJson('/api/auth/signUpEmail', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  }

  async isAuthenticated() {
    const result = await this.fetchWithToken('/api/users/me');
    return result.status === 200;
  }

  async getEntries() {
    return await this.fetchJsonOrRedirect('/api/entries');
  }

  async getEntry(id) {
    return await this.fetchJsonOrRedirect(`/api/entries/${id}`);
  }

  async deleteEntry(id) {
    return await this.fetchJsonOrRedirect(`/api/entries/${id}`, {
      method: 'delete',
    });
  }

  async patchEntry(id, entry) {
    return await this.fetchJsonOrRedirect(`/api/entries/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(entry),
    });
  }

  async postEntry(entry) {
    return await this.fetchJsonOrRedirect('/api/entries', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(entry),
    });
  }

  async fetchWithToken(url, config = {}) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.authorization = `bearer ${localStorage.getItem('token')}`;
    return await fetch(url, config);
  }

  async fetchJsonOrRedirect(...args) {
    const result = await this.fetchWithToken(...args);
    if (result.status === 401) {
      browserHistory.replace('/');
    }
    return await result.json();
  }

  async fetchJson(...args) {
    const result = await fetch(...args);
    return await result.json();
  }
}

const api = new ApiClient();

export default api;

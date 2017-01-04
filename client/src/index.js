import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { Redirect, Route, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

import './index.css';
import Auth from './components/Auth';
import EmailConfirmed from './containers/EmailConfirmed';
import EmailSent from './components/EmailSent';
import Entries from './containers/Entries';
import Entry from './containers/Entry';
import Landing from './components/Landing';
import Login from './containers/Login';
import Main from './containers/Main';
import Register from './containers/Register';
import apiFetch from './utils/apiFetch';

const routes = (
  <Router history={browserHistory} >
    <Route component={Main} onEnter={authorize}>
      <Route path="/entries" component={Entries} />
      <Route path="/entries/new" component={Entry} />
      <Route path="/entries/:id" component={Entry} />
      <Route path="/settings" component={() => <div>settings</div>} />
    </Route>
    <Route onEnter={checkForToken}>
      <Route path="/landing" component={Landing} />
      <Route component={Auth}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/emailSent" component={EmailSent} />
        <Route path="/emailConfirmed" component={EmailConfirmed} />
      </Route>
    </Route>
    <Redirect from="*" to="/entries" />
  </Router>
);

function checkForToken(nextState, replace, callback) {
  if (localStorage.getItem('token') !== null) {
    replace('/entries');
  }
  callback();
}

async function authorize(nextState, replace, callback) {
  const result = await apiFetch('/api/users/me');
  if (result.status === 401) {
    localStorage.clear();
    replace('/landing');
  }
  callback();
}

render(routes, document.getElementById('root'));

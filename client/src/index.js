import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { Redirect, Route, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';

import './index.css';
import AuthWrapper from './components/AuthWrapper';
import EmailConfirmed from './components/EmailConfirmed';
import EmailSent from './components/EmailSent';
import Entries from './components/Entries';
import Entry from './components/Entry';
import Landing from './components/Landing';
import Login from './components/Login';
import Main from './components/Main';
import Register from './components/Register';
import api from './utils/api';

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
      <Route component={AuthWrapper}>
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
  if (!(await api.isAuthenticated())) {
    localStorage.clear();
    replace('/landing');
  }
  callback();
}

render(routes, document.getElementById('root'));

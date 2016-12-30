import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { Redirect, Route, Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { autorun } from 'mobx';

import './style.css';
import Auth from './components/Auth';
import EmailConfirmed from './containers/EmailConfirmed';
import EmailSent from './components/EmailSent';
import Entries from './containers/Entries';
import Entry from './containers/Entry';
import Landing from './components/Landing';
import Login from './containers/Login';
import Main from './components/Main';
import Register from './containers/Register';
import store from './store';

autorun(() => {
  if (store.unauthorized) {
    store.unauthorized = false;
    localStorage.clear();
    browserHistory.replace('/landing');
  }
});

function checkForToken(nextState, replace, callback) {
  if (localStorage.getItem('token') !== null) {
    replace('/');
  }
  callback();
}

const routes = (
  <Router history={browserHistory} >
    <Route component={Main}>
      <Route path="/entries" component={Entries} />
      <Route path="/entries/:id" component={Entry} />
      <Route path="/newEntry" component={Entry} />
      <Route path="/settings" component={() => <div>Settings</div>} />
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

render(routes, document.getElementById('root'));

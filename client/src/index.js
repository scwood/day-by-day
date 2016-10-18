import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { browserHistory, Redirect, Route, Router } from 'react-router';
import { render } from 'react-dom';

import './index.css';
import Auth from './components/Auth';
import EmailConfirmed from './containers/EmailConfirmed';
import EmailSent from './components/EmailSent';
import Home from './containers/Home';
import Landing from './components/Landing';
import Login from './containers/Login';
import Register from './containers/Register';

function checkToken(nextState, replace, callback) {
  if (localStorage.getItem('token') !== null) {
    replace('/');
  }
  callback();
}

function logout(nextState, replace, callback) {
  localStorage.clear();
  replace('/landing');
  callback();
}

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={Home} />
    <Route path="/logout" onEnter={logout}/>
    <Route onEnter={checkToken}>
      <Route path="/landing" component={Landing} />
      <Route component={Auth}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/emailSent" component={EmailSent} />
        <Route path="/emailConfirmed" component={EmailConfirmed} />
      </Route>
    </Route>
    <Redirect from="*" to="/" />
  </Router>
);

render(routes, document.getElementById('root'));

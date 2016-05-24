import React from 'react';
import { browserHistory, Redirect, Route, Router } from 'react-router';

import Auth from '../components/Auth';
import EmailConfirmed from '../containers/EmailConfirmed';
import EmailSent from '../components/EmailSent';
import Home from '../components/Home';
import Landing from '../containers/Landing';
import Login from '../containers/Login';
import Register from '../containers/Register';

function checkForToken(nextState, replace) {
  if (!localStorage.getItem('token')) {
    replace('/landing');
  }
}

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} onEnter={checkForToken} />
    <Route path="/landing" component={Landing} />
    <Route component={Auth}>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/emailSent" component={EmailSent} />
      <Route path="/emailConfirmed" component={EmailConfirmed} />
    </Route>
    <Redirect from="*" to="/" />
  </Router>
);

export default routes;

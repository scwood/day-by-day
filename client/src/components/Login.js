import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../components/LoginForm';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLoginClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fetch('/api/auth/tokens', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(json => {
        if ('error' in json) {
          this.setState({ error: json.error, password: '' });
        } else {
          localStorage.setItem('token', json.data.token);
          browserHistory.push('/');
        }
      });
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        error={this.state.error}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onLoginClick={this.handleLoginClick}
      />
    );
  }
}

export default Login;

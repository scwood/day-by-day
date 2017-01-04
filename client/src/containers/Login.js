import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import LoginForm from '../components/LoginForm';
import handleFieldChange from '../utils/handleFieldChange';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleFieldChange = handleFieldChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  async handleLoginClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const result = await fetch('/api/auth/tokens', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await result.json();
      if ('error' in json) {
        this.setState({ error: json.error, password: '' });
      } else {
        localStorage.setItem('token', json.token);
        browserHistory.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        error={this.state.error}
        onEmailChange={this.handleFieldChange('email')}
        onPasswordChange={this.handleFieldChange('password')}
        onLoginClick={this.handleLoginClick}
      />
    );
  }
}

export default Login;

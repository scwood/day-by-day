import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

import RegisterForm from '../components/RegisterForm';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleRegisterClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fetch('/api/auth/signUpEmail', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(json => {
        if ('error' in json) {
          this.setState({ error: json.error, password: '' });
        } else {
          browserHistory.push('/emailSent?email=' + encodeURIComponent(email));
        }
      });
  }

  render() {
    return (
      <RegisterForm
        email={this.state.email}
        password={this.state.password}
        error={this.state.error}
        onEmailChange={this.handleEmailChange}
        onPasswordChange={this.handlePasswordChange}
        onRegisterClick={this.handleRegisterClick}
      />
    );
  }
}

export default Register;

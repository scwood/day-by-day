import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router'; 

import RegisterForm from '../components/RegisterForm';
import handleFieldChange from '../utils/handleFieldChange';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null,
    };
    this.handleFieldChange = handleFieldChange.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
  }

  async handleRegisterClick(event) {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const response = await fetch('/api/auth/signUpEmail', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      if ('error' in json) {
        this.setState({ error: json.error, password: '' });
      } else {
        browserHistory.push('/emailSent?email=' + encodeURIComponent(email));
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <RegisterForm
        email={this.state.email}
        password={this.state.password}
        error={this.state.error}
        onEmailChange={this.handleFieldChange('email')}
        onPasswordChange={this.handleFieldChange('password')}
        onRegisterClick={this.handleRegisterClick}
      />
    );
  }
}

export default Register;

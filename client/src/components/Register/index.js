import React, { Component } from 'react';
import { browserHistory } from 'react-router'; 

import ErrorAlert from '../ErrorAlert';
import RegisterForm from './RegisterForm';
import api from '../../utils/api';
import handleFieldChange from '../../utils/handleFieldChange';

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
    const response = await api.postSignUpEmail(email, password);
    if ('error' in response) {
      this.setState({ error: response.error, password: '' });
    } else {
      browserHistory.push('/emailSent?email=' + encodeURIComponent(email));
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <ErrorAlert message={this.state.error} />}
        <RegisterForm
          email={this.state.email}
          password={this.state.password}
          onEmailChange={this.handleFieldChange('email')}
          onPasswordChange={this.handleFieldChange('password')}
          onRegisterClick={this.handleRegisterClick}
        />
      </div>
    );
  }
}

export default Register;

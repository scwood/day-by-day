import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ErrorAlert from '../ErrorAlert';
import LoginForm from './LoginForm';
import api from '../../utils/api';
import handleFieldChange from '../../utils/handleFieldChange';

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
    const result = await api.getToken(email, password);
    if ('error' in result) {
      this.setState({ error: result.error, password: '' });
    } else {
      localStorage.setItem('token', result.token);
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <ErrorAlert message={this.state.error} />}
        <LoginForm
          email={this.state.email}
          password={this.state.password}
          onEmailChange={this.handleFieldChange('email')}
          onPasswordChange={this.handleFieldChange('password')}
          onLoginClick={this.handleLoginClick}
        />
      </div>
    );
  }
}

export default Login;

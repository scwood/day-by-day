import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Header from '../components/Header';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      email: null
    }
  }

  async componentWillMount() {
    const token = localStorage.getItem('token');
    if (token === null) {
      browserHistory.replace('/landing');
      return;
    }
    try {
      const result = await fetch('/api/users/me', {
        headers: { 'authorization': `bearer ${token}` }
      });
      if (result.status === 401) {
        browserHistory.replace('/landing');
        return;
      }
      const json = await result.json();
      this.setState({ email: json.data.me })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <Header email={this.state.email} />;
  }
}

export default Home;

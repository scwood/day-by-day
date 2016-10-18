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

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token === null) {
      browserHistory.push('/landing');
      return;
    }
    fetch('/api/users/me', {
      headers: { 'authorization': `bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          browserHistory.push('/landing');
          return;
        }
        res.json()
          .then(json => {
            this.setState({ email: json.data.me })
          })
      })
  }

  render() {
    return <Header email={this.state.email} />;
  }
}

export default Home;

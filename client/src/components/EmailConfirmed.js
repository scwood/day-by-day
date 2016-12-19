import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

import EmailConfirmedMessage from '../components/EmailConfirmedMessage';

class EmailConfirmed extends Component {

  constructor() {
    super();
    this.state = { error: null };
  }

  async componentWillMount() {
    const { token } = this.props.location.query;
    if (!token) {
      this.setState({ error: 'Missing token' });
    }
    try {
      const response = await fetch('/api/users', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const json = await response.json();
      if ('error' in json) {
        this.setState({ error: json.error });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return <EmailConfirmedMessage error={this.state.error} />;
  }
}

EmailConfirmed.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EmailConfirmed;

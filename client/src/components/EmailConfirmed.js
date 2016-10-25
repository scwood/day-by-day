import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

import EmailConfirmedMessage from '../components/EmailConfirmedMessage';

class EmailConfirmed extends Component {

  constructor() {
    super();
    this.state = { error: null };
  }

  componentWillMount() {
    const { token } = this.props.location.query;
    if (!token) {
      this.setState({ error: 'Missing token' });
    }
    fetch('/api/users', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(json => {
        if ('error' in json) {
          this.setState({ error: json.error });
        }
      });
  }

  render() {
    return <EmailConfirmedMessage error={this.state.error} />;
  }
}

EmailConfirmed.propTypes = {
  location: PropTypes.object.isRequired,
};

export default EmailConfirmed;

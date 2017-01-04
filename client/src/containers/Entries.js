import React, { Component } from 'react';

import EntryList from '../components/EntryList';
import fetchOrRedirect from '../utils/fetchOrRedirect';

class Entries extends Component {

  constructor() {
    super();
    this.state = { entries: [], isLoading: false };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { entries } = await fetchOrRedirect('/api/entries');
    this.setState({ entries, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return <EntryList entries={this.state.entries} />;
  }
}

export default Entries;

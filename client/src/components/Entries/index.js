import React, { Component } from 'react';

import EntryList from './EntryList';
import api from '../../utils/api';

class Entries extends Component {

  constructor() {
    super();
    this.state = { entries: [], isLoading: false };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { entries } = await api.getEntries();
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

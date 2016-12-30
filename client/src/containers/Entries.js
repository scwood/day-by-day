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
    const result = await fetchOrRedirect('/api/entries');
    this.setState({ entries: result.data.entries, isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Entries</h2>
          <EntryList entries={this.state.entries} />
        </div>
      </div>
    );
  }
}

export default Entries;

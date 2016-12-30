import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer } from 'mobx-react';

import store from '../store';

class Entries extends Component {

  componentDidMount() {
    store.getEntries();
  }

  render() {
    const entriesList = store.entries.map(entry => {
      return (
        <div key={entry._id}>
          {entry.date} - <Link to={`/entries/${entry._id}`}>Link</Link>
        </div>
      );
    });
    return (
      <div>{entriesList}</div>
    );
  }
}

export default observer(Entries);

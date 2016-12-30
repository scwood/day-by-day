import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import EntryListYear from './EntryListYear';

function EntryList({ entries }) {
  let result;
  if (entries.length === 0) {
    result = (
      <div>
        Looks like you haven't written any journal entries yet.
        Respond to one of the
        <Link to="/settings"> automated emails</Link> or
        <Link to="/entries/new"> click hear to write one now</Link>.
      </div>
    );
  } else {
    result = [];
    const entriesByYear = new Map();
    entries.forEach(entry => {
      const year = moment(entry.date, 'YYYY-MM-DD').format('YYYY');
      if (!entriesByYear.has(year)) {
        entriesByYear.set(year, []);
      }
      entriesByYear.get(year).push(entry);
    });
    entriesByYear.forEach((entries, year) => {
      result.push(<EntryListYear key={year} year={year} entries={entries}/>);
    });
  }
  return <div>{result}</div>;
}

EntryList.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default EntryList;

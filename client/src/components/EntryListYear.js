import React, { PropTypes } from 'react';

import EntryListItem from './EntryListItem';

function EntryListYear({ year, entries }) {
  return (
    <div>
      <h4 className="mt-2">{year}</h4><hr />
      {entries.map(entry => <EntryListItem key={entry._id} entry={entry} />)}
    </div>
  );
}

EntryListYear.propTypes = {
  year: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

export default EntryListYear;

import React, { PropTypes } from 'react';

import EntryListItem from './EntryListItem';

function EntryListMonth({ month, entries }) {
  return (
    <div>
      <h5 className="mt-2">{month}</h5>
      {entries.map(entry => <EntryListItem key={entry._id} entry={entry} />)}
    </div>
  );
}

EntryListMonth.propTypes = {
  month: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

export default EntryListMonth;

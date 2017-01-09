import React, { PropTypes } from 'react';
import moment from 'moment';

import EntryListMonth from './EntryListMonth';

function EntryListYear({ year, entries }) {
  const result = [];
  const entriesByMonth = new Map();
  entries.forEach(entry => {
    const month = moment(entry.date, 'YYYY-MM-DD').format('MMMM');
    if (!entriesByMonth.has(month)) {
      entriesByMonth.set(month, []);
    }
    entriesByMonth.get(month).push(entry);
  });
  entriesByMonth.forEach((entries, month) => {
    result.push((
      <EntryListMonth key={`${month}${year}`} month={month} entries={entries}/>
    ));
  });
  return (
    <div>
      <h4 className="mt-2">{year}</h4><hr />
      {result}
    </div>
  );
}

EntryListYear.propTypes = {
  year: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

export default EntryListYear;

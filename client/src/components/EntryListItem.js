import React, { PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';

function EntryListItem({ entry }) {
  const longDate = moment(entry.date).format('dddd MMMM Do');
  return (
    <div>
      <Link to={`/entries/${entry._id}`}>{longDate}</Link>
    </div>
  );
}

EntryListItem.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default EntryListItem;

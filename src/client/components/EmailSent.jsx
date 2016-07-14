import React, { PropTypes } from 'react';

function EmailSent({ location, message }) {
  const { email } = location;
  return (
    <div>
      <p>Success <i className="fa fa-check text-success"></i></p>
      <p>We've sent an email to <b>{email}</b>.</p>
      <p>{message}</p>
    </div>
  );
}

EmailSent.propTypes = {
  message: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default EmailSent;

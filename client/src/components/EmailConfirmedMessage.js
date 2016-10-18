import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function EmailConfirmedMessage({ error }) {
  let message;
  if (error) {
    message = <div className="alert alert-danger">{error}</div>;
  } else {
    message = <p>Email confirmed <i className="fa fa-check text-success"></i></p>;
  }
  return (
    <div>
      {message}
      <Link to="/login">Click here to go back to the login page.</Link>
    </div>
  );
}

EmailConfirmedMessage.propTypes = {
  error: PropTypes.string,
};

export default EmailConfirmedMessage;

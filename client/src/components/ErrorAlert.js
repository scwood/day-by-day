import React, { PropTypes } from 'react';

function ErrorAlert({ message }) {
  return <div className="alert alert-danger">{message}</div>;
}

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorAlert;

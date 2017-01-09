import React, { PropTypes } from 'react';

function SuccessAlert({ message }) {
  return <div className="alert alert-success">{message}</div>;
}

SuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessAlert;

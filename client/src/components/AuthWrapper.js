import { Link } from 'react-router';
import React, { PropTypes } from 'react';

function AuthWrapper(props) {
  return (
    <div className="container mt-3" style={{ maxWidth: 400 }}>
      <h3 style={{ fontWeight: 'normal' }}>
        <Link to="/landing" className="dark-link">
          <i className="fa fa-book"></i> Day by Day
        </Link>
      </h3>
      <hr />
      {props.children}
    </div>
  );
}

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;

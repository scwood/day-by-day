import { Link } from 'react-router';
import React, { PropTypes } from 'react';

function Auth(props) {
  return (
    <div className="container m-t-3" style={{ maxWidth: 400 }}>
      <h3 style={{ fontWeight: 'normal' }}>
        <Link to="/" className="dark-link"><i className="fa fa-book"></i> Day by Day</Link>
      </h3>
      <hr />
      {props.children}
    </div>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;

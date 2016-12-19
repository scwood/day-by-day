import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function Header({ email }) {
  const signOut = (
    <a
      className="dark-link nav-link dropdown-toggle"
      data-toggle="dropdown"
      href=""
    >
      {email}
    </a>
  );
  return (
    <div>
      <nav className="navbar navbar-light navbar-fixed-top bg-faded">
        <a className="navbar-brand" href="#">
          <i className="fa fa-fw fa-book"></i> Day by Day
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item dropdown">
            {email && signOut}
            <div className="dropdown-menu dropdown-menu-right">
              <Link to="/settings" className="dropdown-item">Settings</Link>
              <Link to="/logout" className="dropdown-item">Sign out</Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Header.propTypes = {
  email: PropTypes.string
};

export default Header;

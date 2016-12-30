import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function MainNavbar({ onSignOutClick }) {
  return (
    <nav className="navbar navbar-light navbar-fixed-top bg-faded">
      <div className="container max-app-width">
        <Link  className="navbar-brand" to="/">
          <i className="fa fa-fw fa-book"></i> Day by Day
        </Link>
        <button
          className="navbar-toggler hidden-sm-up pull-right pointer"
          data-toggle="collapse"
          data-target="#main-navbar"
        >
        </button>
        <div className="clearfix hidden-sm-up"></div>
        <div
          className="collapse navbar-toggleable-xs float-sm-right"
          id="main-navbar"
        >
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/newEntry" className="nav-link text-success">
                <i className="fa fa-pencil"></i> New Entry
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/entries" className="nav-link">Old Entries</Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link pointer" onClick={onSignOutClick}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

MainNavbar.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
};

export default MainNavbar;

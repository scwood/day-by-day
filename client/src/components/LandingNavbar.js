import { Link } from 'react-router';
import React from 'react';

function LandingNavbar() {
  return (
    <nav className="navbar navbar-light">
      <Link  className="navbar-brand" to="/landing">
        <i className="fa fa-book"></i> Day by Day
      </Link>
      <button
        className="navbar-toggler hidden-sm-up pull-right"
        data-toggle="collapse"
        data-target="#landing-navbar"
      >
      </button>
      <div className="clearfix hidden-sm-up"></div>
      <div
        className="collapse navbar-toggleable-xs float-sm-right"
        id="landing-navbar"
      >
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a href="https://github.com/scwood/day-by-day" className="nav-link">
              <i className="fa fa-github"></i> View source code
            </a>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link text-primary">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="btn btn-success m-l-1">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingNavbar;

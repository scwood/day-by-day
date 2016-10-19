import { Link } from 'react-router';
import React from 'react';

function Landing() {
  return (
    <div className="container mt-3 mb-3" style={{ maxWidth: 700 }}>
      <nav className="navbar navbar-light">
        <Link  className="navbar-brand" to="/landing">
          <i className="fa fa-book"></i> Day by Day
        </Link>
        <form className="pull-right">
          <Link to="/login" className="btn btn-success-outline m-l-1">Login</Link>
          <Link to="/register" className="btn btn-success m-l-1">Sign up</Link>
        </form>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item">
            <a href="https://github.com/scwood/day-by-day" className="nav-link">
              <i className="fa fa-github"></i> View source code
            </a>
          </li>
        </ul>
      </nav>
      <div className="row">
        <div className="col-xs-12 mt-3 pl-2 pr-2">
          <h1 className="display-4">Journaling made easy</h1>
          <hr /><br />
          <h5>
            <i className="fa fa-fw fa-envelope-o"></i> Simply respond to an email
          </h5>
          Day by day sends you emails every day asking you how your day went.
          <br /><br /><br />
          <h5>
            <i className="fa fa-fw fa-pencil-square-o"></i> View, edit, and add journal
            entries online
          </h5>
          You can view, edit, and add journal entries at any time through the Day by Day webapp.
          <br /><br /><br />
          <h5>
            <i className="fa fa-fw fa-dropbox"></i> Sync your journal entries to Dropbox
          </h5>
          Add your Dropbox account to automatically backup your journal entries.
          <br /><br /><br />
          <Link to="/register" className="btn btn-success">Sign up, it's free</Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

import React from 'react';

function Landing() {
  return (
    <div className="container m-t-3 m-b-3" style={{ maxWidth: 700 }}>
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/landing">
          <i className="fa fa-book"></i> Day by Day
        </a>
        <form className="pull-right">
          <a href="/login" className="btn btn-success-outline m-l-1">Login</a>
          <a href="/register" className="btn btn-success m-l-1">Sign up</a>
        </form>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item">
            <a className="nav-link" href="https://github.com/scwood/day-by-day">
              <i className="fa fa-github"></i> View source code
            </a>
          </li>
        </ul>
      </nav>
      <div className="row">
        <div className="col-xs-12 m-t-3 p-l-2 p-r-2">
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
            <i className="fa fa-fw fa-google"></i> Sync your journal entries to Google Drive
          </h5>
          Add your Google Drive account to automatically backup your journal entries.
          <br /><br /><br />
          <a href="/register" className="btn btn-success">Sign up, it's free</a>
        </div>
      </div>
    </div>
  );
}

export default Landing;

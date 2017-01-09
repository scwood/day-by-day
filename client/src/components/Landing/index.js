import { Link } from 'react-router';
import React from 'react';

import LandingNavbar from './LandingNavbar';

function Landing() {
  return (
    <div className="container mt-3 mb-3 max-app-width">
      <LandingNavbar />
      <div className="row">
        <div className="col-xs-12 mt-2 pl-2 pr-2">
          <h1 className="display-4">Journaling made easy</h1>
            <hr /><br />
          <h5>
            <i className="fa fa-fw fa-envelope-o"></i> Simply respond to an
            email
          </h5>
          Day by day sends you emails every day asking you how your day went.
          <h5 className="mt-3">
            <i className="fa fa-fw fa-pencil-square-o"></i> View, edit, and
            add journal entries online
          </h5>
          You can view, edit, and add journal entries at any time through the
          Day by Day webapp.
          <h5 className="mt-3">
            <i className="fa fa-fw fa-dropbox"></i> Sync your journal entries
            to Google Drive
          </h5>
          Add your Dropbox account to automatically backup your journal
          entries.
          <br />
          <Link to="/register" className="btn btn-success mt-3">
            Sign up, it's free
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

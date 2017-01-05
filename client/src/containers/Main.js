import React, { Component, PropTypes } from 'react';

import MainNavbar from '../components/MainNavbar';
import signOut from '../utils/signOut';

class Main extends Component {

  constructor() {
    super();
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  componentDidMount() {
    // need to use jQuery here to toggle the navbar on mobile, not pretty
    // but it gets the job done
    window.$('nav a').on('click', () => {
      window.$('#main-navbar').collapse('hide');
    });
  }

  handleSignOutClick() {
    signOut();
  }

  render() {
    return (
      <div>
        <MainNavbar onSignOutClick={this.handleSignOutClick} />;
        <div className="container max-app-width" style={{ marginTop: 60 }}>
          <div className="row">
            <div className="col-xs-12">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;

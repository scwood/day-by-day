import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';

import MainNavbar from '../components/MainNavbar';
import store from '../store';

function Main({ children }) {
  return (
    <div>
      <MainNavbar onSignOutClick={() => store.unauthorized = true}/>;
      <div className="container max-app-width mt-3">
        {children}
      </div>
    </div>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default observer(Main);

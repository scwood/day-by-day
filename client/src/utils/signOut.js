import { browserHistory } from 'react-router';

function signOut() {
  localStorage.clear();
  browserHistory.replace('/');
}

export default signOut;

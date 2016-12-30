import { browserHistory } from 'react-router';

function signOut() {
  localStorage.clear();
  browserHistory.replace('/landing');
}

export default signOut;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './utilities/serviceWorker';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

// Wrapper for material-ui-pickers: https://material-ui-pickers.firebaseapp.com/installation
function Root() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import Schedule from './Schedule';
import Modules from './Modules';
import Homework from './Homework';
import auth from './services/AuthService';
import Login from './Login';
import Register from './Register';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NoMatch from './NoMatch';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

BigCalendar.momentLocalizer(moment);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)
let requireAuth = (nextState, replace) => {
  if(auth.isAuthenticated()) return;
  replace({
    pathname: '/login',
    state: {nextPathname: nextState.location.pathname}
  });
};

let requireAuthStrictlyNone = (nextState, replace) => {
  if(!auth.isAuthenticated()) return;
  replace({
    pathname: '/',
    state: {nextPathname: nextState.location.pathname}
  });
};

ReactDOM.render(
      <MuiThemeProvider>
        <Router history={browserHistory}>
    <Route path="/" component={App} onEnter={requireAuth}>
      <IndexRoute component={Schedule}/>
      <Route path="modules" component={Modules}/>
      <Route path="homework" component={Homework}/>
    </Route>
    <Route path="/login" component={Login} onEnter={requireAuthStrictlyNone}/>
    <Route path="/register" component={Register} onEnter={requireAuthStrictlyNone}/>
    <Route path="/about" component={About}/>
    <Route path="*" component={NoMatch}/>
  </Router></MuiThemeProvider>,
  document.getElementById('root')
);

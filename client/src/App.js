import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <Router>
    <MuiThemeProvider>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </MuiThemeProvider>
  </Router>
);

export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Homepage from './components/Homepage';
import Donate from './components/Donate';
import Doctors from './components/Doctors';
import Dashboard from './components/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <Router>
    <MuiThemeProvider>
      <Switch>
        {/*<Route exact path='/' component={Homepage} /> */}
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/payment' component={Donate}/>
        <Route path='/doctors' component={Doctors}/>
      </Switch>
    </MuiThemeProvider>
  </Router>
);

export default App;




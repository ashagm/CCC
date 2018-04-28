import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import logo from "../../logo.png";
import { RaisedButton, TextField} from 'material-ui';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      useremail: '',
      password: '',
      message: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { useremail, password } = this.state;

    axios.post('/api/auth/login', { useremail, password })
      .then((result) => {
        console.log(result.data);
        localStorage.setItem('jwtToken', result.data.token);
        localStorage.setItem('mySession', result.data.mySession);
        this.setState({ message: '' });
        this.props.history.push('/homepage')
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { useremail, password, message } = this.state;
    return (
       <div className="register-page">
        <div className="div-logo">
          <img src={logo} alt="logo" className="logo-register"/>
        </div> 
        <div className="login-container">
        <form className="form-signin" onSubmit={this.onSubmit}>
          {message !== '' &&
            <div className="alert alert-warning alert-dismissible" role="alert">
              { message }
            </div>
          }
          <h2 className="form-signin-heading">SIGN IN </h2>

          <TextField
            hintText="Enter Email " 
            type="email" 
            floatingLabelText="Email"
            className="form-control" 
            name="useremail" 
            value={useremail} 
            onChange={this.onChange} required
          />  
          <br />         
          <TextField
            hintText="Enter password" 
            floatingLabelText="Password"
            className="form-control" 
            name="password" 
            value={password} 
            type="password" 
            onChange={this.onChange} required
          />
          <br /> <br />
          <RaisedButton 
            className="btn btn-lg btn-primary btn-block" 
            label="LOGIN" 
            className="btn-register"
            labelColor="#395399"
            type="submit" />
          <br/><br/>
          <p>
            Not a member? &nbsp;&nbsp;
            <Link to="/register">
            <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Click here</Link>
          </p>
        </form>
      </div>
      </div>
    );
  }
}

export default Login;
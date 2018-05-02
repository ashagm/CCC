import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import NavBar from "../NavBar";
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
        localStorage.setItem('username', result.data.mySession.username);
        this.setState({ message: '' });
        this.props.history.push('/homepage');
      })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
      });
  }

  render() {
    const { useremail, password, message } = this.state;
    console.log("props", this.props);
    return (
       <div className="register-page">
        <div className="div-register-logo">
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
            inputStyle={{
              color: '#fff'
            }}
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
            inputStyle={{
              color: '#fff'
            }}
            onChange={this.onChange} required
          />
          <br /> <br />
          <RaisedButton 
            className="btn btn-lg btn-primary btn-block" 
            label="LOGIN" 
            className="btn-register"
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
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';
import logo from "../../logo.png";
import { RaisedButton, TextField} from 'material-ui';

class Register extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      useremail: '',
      password1: ''
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, useremail, password, password1 } = this.state;

    axios.post('/api/auth/register', 
            { username, useremail, password }
            )
      .then((result) => 
       {
          console.log("Registered!", username);
          this.props.history.push("/login")
       })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { username, password, useremail, password1 } = this.state;

    return (
      <div className="register-page">
        <div className="div-register-logo">
          <img src={logo} alt="logo" className="logo-register"/>
        </div> 
        <div className="login-container">
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h1 className="">Register</h1>
              <TextField
                hintText="Enter Username " 
                floatingLabelText="Username"
                className="form-control" 
                name="username" 
                value={username} 
                inputStyle={{
                  color: '#fff'
                }}
                onChange={this.onChange} required
              />
              <br/>
              <TextField
                hintText="Enter Email address" 
                floatingLabelText="Email address"
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
              <br />
              <TextField
                hintText="Confirm password" 
                floatingLabelText="Confirm Password"
                type="password" 
                className="form-control" 
                name="password1" 
                value={password1} 
                inputStyle={{
                  color: '#fff'
                }}
                onChange={this.onChange} required
              /><br /> 
              <br /><br />
          {/* <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/> */}
            
          {/*  <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/> */}
              <RaisedButton 
                label="REGISTER" 
                className="btn-register"
                type="submit" 
              />  
               <p>
                Already a member? &nbsp;&nbsp;
                <Link to="/login">
                <span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Click here</Link>
              </p>        
          </form>
          </div>
      </div>
    );
  }
}

export default Register;
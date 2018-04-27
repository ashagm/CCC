import React, { Component } from 'react';
import axios from 'axios';
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
    console.log("Submitting Register..." + this.state);

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
        <div className="div-logo">
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
                onChange={this.onChange} required
              />
              <br/>
              <TextField
                hintText="Enter Email address" 
                floatingLabelText="Email address"
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
              <br />
              <TextField
                hintText="Confirm password" 
                floatingLabelText="Confirm Password"
                type="password" 
                className="form-control" 
                name="password1" 
                value={password1} 
                onChange={this.onChange} required
              /><br /> 
              <br /><br />
          {/* <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/> */}
            
          {/*  <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/> */}
              <RaisedButton 
                label="REGISTER" 
                className="btn-register"
                labelColor="#395399"
                type="submit" 
              />          
          </form>
          </div>
      </div>
    );
  }
}

export default Register;
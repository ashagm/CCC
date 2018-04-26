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
      password: ''
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

    const { username, password } = this.state;

    axios.post('/api/auth/register', 
            { username, password }
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
    const { username, password } = this.state;
    return (
      <div className="register-page">
        <img src={logo} alt="logo" className="logo-register"/>
        <div className="login-container">
          <form className="form-signin" onSubmit={this.onSubmit}>
            <h2 className="">Register</h2>
              <TextField
                hintText="Enter Email address" 
                floatingLabelText="Email address"
                errorText="This field is required" 
                className="form-control" 
                name="username" 
                value={username} 
                onChange={this.onChange} required
              />
              <br />
              <br />

              <TextField
                hintText="Enter password" 
                errorText="This field is required" 
                type="password" 
                className="form-control" 
                name="password" 
                value={password} 
                onChange={this.onChange} required
              /><br />
              <br />
          {/* <input type="email" className="form-control" placeholder="Email address" name="username" value={username} onChange={this.onChange} required/> */}
            
          {/*  <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.onChange} required/> */}
              <RaisedButton 
                label="REGISTER" 
                className="btn"
                labelColor="#395399" 
              />          
          </form>
          </div>
      </div>
    );
  }
}

export default Register;
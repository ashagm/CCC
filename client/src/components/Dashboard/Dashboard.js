import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import { RaisedButton} from 'material-ui';
import axios from 'axios';
import logo from "../../logo.png";
import NavBar from "../NavBar";
import "./Dashboard.css";
import "./type.js"


class Dashboard extends Component {

	logout = (e) => {
		e.preventDefault();
		console.log("logout button.");		
		console.log("logout button token" + localStorage.getItem('jwtToken'));

		 axios.get('/api/auth/logout')
	      .then((result) => {
	      	console.log("logged out", result)
	        localStorage.setItem('jwtToken', "");
	        console.log("token", localStorage.getItem('jwtToken'));
	        this.setState({ message: '' });
	        this.props.history.push('/login')
	      })
	      .catch((error) => {
	        if(error.response.status === 401) {
	          this.setState({ message: 'Logout failed' });
	        }
      	});

	}

	render(){
		return (			
			<div className="dashboard-page">
				<img src={logo} alt="logo" className="logo"/>
				<h1 className="typed-text">					
					  <a href="" className="typewrite" data-period="2000" 
					  data-type=
					  '[ "Welcome!!", 
					  	"Care! Connect! Conquer!",
					  	"What do you want to do?", 
					  	"Search for Doctors?", 
					  	"Looking for answers?",
					  	"Have something to share?"
					   ]'>
					    <span className="wrap"></span>
					  </a>
				</h1>
				<RaisedButton label="Log In" className="btn-dashboard" href="/login" labelColor="#395399"/>
				<RaisedButton label="Sign up" className="btn-dashboard" href="/register" labelColor="#395399"/>
			</div>  		 
		);
  	}

}

export default Dashboard;


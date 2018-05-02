import React, {Component} from 'react';
import { RaisedButton} from 'material-ui';
import axios from 'axios';
import logo from "../../logo.png";
import "./Dashboard.css";
import "./type.js"


class Dashboard extends Component {

	render(){
		return (			
			<div className="dashboard-page">
				<img src={logo} alt="logo" className="logo-dashboard"/>
				<div className="typed-text">					
					  <a href="" className="typewrite" data-period="2000" 
					  data-type=
					  '[ 
					  	"Care! Connect! Conquer!",
					  	"Connect with cancer patients and caregivers!",
					  	"Search for Doctors", 
					  	"Chat with others",
					  	"Ask questions",
					  	"Share your thoughts",
					  	"Find latest Cancer related news!"
					   ]'>
					    <span className="wrap"></span>
					  </a>
				</div>
				<RaisedButton 
					label="Log In" 
					className="btn-dashboard" 
					href="/login"
					backgroundColor="#fffacd"
					labelColor="#000"
				/>
				<RaisedButton 
					label="Sign up" 
					className="btn-dashboard" 
					href="/register"
					backgroundColor="#fffacd"
					labelColor="#000"
				/>
			</div>  		 
		);
  	}

}

export default Dashboard;


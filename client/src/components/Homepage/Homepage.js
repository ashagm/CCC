import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';
import donate from "./donate.png";
import news from "./news.png";
import doctor from "./doctor.png";
import question from "./question.png";
import chat from "./chat.png";
import service from "./service.png";
import "./Homepage.css";
import NavBar from "../NavBar"

class Homepage extends Component {

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
		<div className="container">	
			<NavBar/> 
			<div className="div-links">
			   	<Link to="/doctors">
			   		<button className="btn-tabs"> 
			   		<img src={doctor} alt="doctor" className="btn-image"/>
			   		Doctors</button>
			   	</Link>
			   	<Link to="/questions">
			   		<button className="btn-tabs">
			   		<img src={question} alt="question" className="btn-image"/>
			   		Questions</button>
			   	</Link>
			   	<Link to="/chatroom">
			   		<button className="btn-tabs">
			   		<img src={chat} alt="chat" className="btn-image"/>
			   		Chat</button>
			   	</Link>
			   	<Link to="/services">
			   		<button className="btn-tabs">
			   		<img src={service} alt="service" className="btn-image"/>
			   		Services</button>
			   	</Link>
			   	<Link to="/payment">
			   		<button className="btn-tabs">
		   			<img src={donate} alt="donate" className="btn-image"/>
		   			Donate </button>
			   	</Link>
			   		<Link to="/news">
			   		<button className="btn-tabs">
		   			<img src={news} alt="news" className="btn-image"/>
		   			News </button>
			   	</Link>
			 </div>  	
  		</div>	
  		);	
  	}

}

export default Homepage;


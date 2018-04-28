import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';
import logo from "../../logo.png";
import "./Homepage.css";

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
			<div className="div-logo">
				<img src={logo} alt="logo" className="logo-register"/>
			</div> 
			<div className="div-links">
			   	<Link to="/doctors">
			   		<button className="btn-tabs">Search Doctors</button>
			   	</Link>
			   	<Link to="/payment">
			   		<button className="btn-tabs">Donate Now</button>
			   	</Link>
			   	<Link to="/payment">
			   		<button className="btn-tabs">Ask Questions</button>
			   	</Link>
			   	<Link to="/chat">
			   		<button className="btn-tabs">Chat room</button>
			   	</Link>
			 </div>  	
			{/*<Card >
    			<CardTitle title="Care! Connect! Conquer!" subtitle="This is the home page." />
    			<img src={logo} alt="logo" className="logo"/>
    			<Link to="#" onClick={this.logout}>
                <span className="text-secondary">Logout</span>
                </Link>  <br/>
                <Link to="/payment">
                <span className="text-secondary">Donate</span>
                </Link> <br />
                <Link to="/doctors">
                <span className="text-secondary">Doctors</span>
                </Link>    		 
  			</Card>*/}
  	</div>	);	
  	}

}

export default Homepage;


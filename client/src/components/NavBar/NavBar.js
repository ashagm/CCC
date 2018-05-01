import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import logo from "../../logo.png";
import './NavBar.css';

class NavBar extends Component {
	
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
	        this.props.history.push('/')
	      })
	      .catch((error) => {
	        if(error.response.status === 401) {
	          this.setState({ message: 'Logout failed' });
	        }
      	});
	}

	render(){
			return(
				<Container className="nav-container">
			      <div className="div-logo">
			       <Link to="/homepage" className="link-homepage">
			        	<span className="text-secondary">BACK</span>
			        </Link>
			        <img src={logo} alt="logo" className="logo-register"/>
			       
			         <Link to="#" onClick={this.logout} className ="link-logout">
			        	<span className="text-secondary">Logout</span>
			        </Link>
			      </div> 
			    </Container>  
	  		);
  	}

}

export default NavBar;
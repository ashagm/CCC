import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";
import logo from "../../logo.png";
import './NavBar.css';
import {withRouter} from 'react-router';

class NavBar extends Component {

    constructor(props) {
        super(props);
        console.log("props" , props)
        this.logout = this.logout.bind(this);
    }
	
	logout = (e) => {
		e.preventDefault();
		// console.log("logout button.");		
		// console.log("logout button token" + localStorage.getItem('jwtToken'));

		 axios.get('/api/auth/logout')
	      .then((result) => {
	      	console.log("logged out", result);
	        localStorage.setItem('jwtToken', "");
	        console.log("token", localStorage.getItem('jwtToken'));
	        // this.setState({ message: '' });
	        this.props.history.push('/');
	        window.location.reload();

	      })
	      .catch((error) => {
	      	console.log(error);
	        if(error) {
	        	console.log("ERROR", error);
	          	// this.setState({ message: 'Logout failed' });
	        }
      	});
	}

	render(){
		// console.log("props in nav", this.props);
			return(
				<Container className="nav-container">
			      <div className="div-logo">
			       	<Link to="/homepage" className="link-homepage">
			        	<span className="text-secondary">Back</span>
			        </Link>
			        <img src={logo} alt="logo" className="logo-register"/>
			 
			        <Link to="/" onClick={this.logout} className ="link-logout">
			        	<span className="text-secondary">Logout</span>
			        </Link>
			      </div> 
			    </Container>  
	  		);
  	}

}

export default withRouter(NavBar);
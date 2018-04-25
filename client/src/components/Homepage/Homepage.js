import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import { Card, CardTitle } from 'material-ui';
import axios from 'axios';
import logo from "../../ccc.png";


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
		return (<Card className="container">
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
  			</Card>);
  	}

}

export default Homepage;


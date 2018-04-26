import React, { Component } from 'react';
import './Doctors.css';

class DocDetails extends Component {

	state = {
		doctors: this.props.doctors,
	}

	render(){
		return <div>DOC DETAILS {this.props.doctors}</div>
	}

}

export default DocDetails;
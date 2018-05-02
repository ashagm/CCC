import React, {Component} from 'react';
import NavBar from '../NavBar';
import "./Chat.css";
import io from 'socket.io-client';

class Chat extends Component {

	state = {
		socket: "",
		m: ""
	}

	componentDidMount(){
		// var socket = io();
		this.state.socket = io();
	}

	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
  	}

	onFormSubmit = (props) => {
		this.state.socket.emit('chat message', this.state.m);
      	this.setState('m' : '')
      	return false;
	}

	render(){
		return (
			<div className="chat-container">	
				<NavBar />
				<ul id="messages"></ul>
			    <form action="" className="chat-form" onSubmit={this.onFormSubmit}>
			      <input id="m" name="m" onChange={this.onChange} autoComplete="off" /><button>Send</button>
			    </form>

			</div>

			)
	}
}

export default Chat;
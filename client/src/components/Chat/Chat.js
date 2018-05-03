import React, {Component} from 'react';
import NavBar from '../NavBar';
import "./Chat.css";
import io from 'socket.io-client';

class Chat extends Component {

	state = {
		socket: "",
		m: "",
		messsages: ""
	}

	componentDidMount(){
		// var socket = io();
		this.setState({socket : io()});
	}

	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    console.log(state);
	    this.setState(state);
  	}


	onFormSubmit = (event) => {
		event.preventDefault();
		console.log(this.state.m);
		this.state.socket.emit('chat message', this.state.m);
      	this.setState({'m' : ''})
      	return false;

     //  	 this.state.socket.on('chat message', function(msg){
     //  		this.setState({'messages' : msg});
    	// });
	}

	// $(function () {
 //        var socket = io();
 //        $('form').submit(function(){
 //          socket.emit('chat message', $('#m').val());
 //          $('#m').val('');
 //          return false;
 //        });
 //        socket.on('chat message', function(msg){
 //          $('#messages').append($('<li>').text(msg));
 //          window.scrollTo(0, document.body.scrollHeight);
 //        });
 //      });

	render(){
		return (
			<div>
			<NavBar />
		<div className="chat-container">	
		
		<ul id="messages"></ul>
	    <form action="" className="chat-form" onSubmit={this.onFormSubmit}>
	      <input id="m" name="m" onChange={this.onChange} autoComplete="off" /><button>Send</button>
	    </form>

	</div>
	</div>

			)
	}
}

export default Chat;
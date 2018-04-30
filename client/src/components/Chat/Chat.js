import React, { Component } from 'react';
import { Card, Icon, Image, Grid } from 'semantic-ui-react'

class Chat extends Component{

    state ={
        username : "",
        message : ""
    }

    componentWillMount(){
        console.log("....mounting chat");
        let username = localStorage.getItem("username");
        console.log("username", username);
        this.setState({"username": username});
    }

    render(){
        return (
            <div className="container">
                <Grid>
                    <Grid.Row columns={1}>
                     <Grid.Column>
                        <Card>
                            <Card.Header>
                              Global Chat
                            </Card.Header>                                
                            <Card.Content >
                                <div className="messages"></div>
                            </Card.Content>
                            <Card.Content extra>
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: this.state.username})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/> */}
                                {/*onChange={ev => this.setState({username: ev.target.value})} */}
                                <br/>
                                <button className="btn btn-primary form-control">Send</button>
                            </Card.Content>
                        </Card>
                    </Grid.Column>  
                    </Grid.Row> 
                </Grid>
            </div>
        );
    }
}

export default Chat;

import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './Comments.css';
import API from "../../utils/API";
import logo from "../../logo.png";

import {Comment, Segment, Form, Input,TextArea, Button, Divider } from 'semantic-ui-react';

class Comments extends Component {
  
  constructor() {
    super();
    this.state = {
      isHidden: '',
      comment: '',
      name:'',
      commentsArr: []
    };
  }

  componentWillMount(){
    console.log("....mounting services");
    let username = localStorage.getItem("username");
    console.log("username", username);
    this.setState({"name": username});
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state);
  }

  componentDidMount(){ 
    this.fetchAllComments();
  }

  fetchAllComments(){
    console.log("Component did mounting....", this.props.id);
    axios.get('/api/comment/all' + this.props.id)
      .then(resAllComments => {
        console.log("got Comments, commentsArr", resAllComments.data);
        // console.log("Questions Asked", this.state.questionsAsked);
        this.setState({ commentsArr: resAllComments.data});        
      })
      .catch(err => console.log(err));  

  }

  onSubmit = (e) => {
    let q_id = this.props.id;
    let comment = this.state.comment;
    let name = this.state.name;
    axios.post('/api/comment/create', { q_id, comment, name})
      .then((result) => {
        console.log(result.data);
        this.setState({ message: 'CommentSubmitted!' });
        // this.setState('comment', '');
        // this.setState("commentsArr", result.data);
        this.setState({
          commentsArr: [...this.state.commentsArr, {
              _id: this.props.id,
              comment: this.state.comment,
              name: this.state.name,
          }]})

        this.props.history.push('/questions')
    })
      .catch((error) => {
        if(error) {
          this.setState({ message: 'Comment submission failed' });
        }
    });
  } 

  render() {
    console.log("Calling render in comments....");
    return (
      <div>
       {this.state.commentsArr.map(comment => (  
          <Comment className='comment-div' key={comment._id}>
            <Comment.Content>
              <Comment.Text className="comment-text">{comment.comment}</Comment.Text>
              <Comment.Author as='a'>By: {comment.name}</Comment.Author>              
            </Comment.Content>
          </Comment>
          
        ))} 
        <Form reply onSubmit={this.onSubmit}>
          <Form.Field 
          id='form-textarea-control-comment' 
          control={TextArea} 
          label='Comment' 
          name="comment" 
          placeholder='Add your comment' 
          onChange={this.onChange} />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        {/*onClick={() => this.saveComment(this.props.id)*/}
        </Form>

      </div>      
    );
  }
}

export default Comments;
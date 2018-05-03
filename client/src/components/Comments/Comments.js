import React, { Component } from 'react';
import axios from 'axios';
import './Comments.css';
import avatar from "./avatar.png";

import {Comment, Form, TextArea, Button, Header} from 'semantic-ui-react';

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
    // console.log("....mounting services");
    let username = localStorage.getItem("username");
    // console.log("username", username);
    this.setState({"name": username});
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    // console.log(this.state);
  }

  componentDidMount(){ 
    this.fetchAllComments();
  }

  fetchAllComments(){
    // console.log("Component did mounting....", this.props.id);
    axios.get('/api/comment/all' + this.props.id)
      .then(resAllComments => {
        // console.log("got Comments, commentsArr", resAllComments.data);
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
        // console.log(result.data);
        this.setState({ message: 'CommentSubmitted!' });

        this.setState({
          commentsArr: [...this.state.commentsArr, {
              _id: this.props.id,
              comment: this.state.comment,
              name: this.state.name,
          }]})
        
        this.setState({comment: ''})
        this.props.history.push('/questions')
    })
      .catch((error) => {
        if(error) {
          this.setState({ message: 'Comment submission failed' });
        }
    });
  } 

  render() {
    return (
      <div>
      <Header as='h3' dividing>Comments</Header>
       {this.state.commentsArr.map(comment => (  
              <Comment.Group size='small'>                
                <Comment className='comment-div' key={comment._id}>
                  <Comment.Avatar as='a' src={avatar} />
                  <Comment.Content>
                    <Comment.Author as='a'>{comment.name}</Comment.Author>
                    <Comment.Text>{comment.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
          
        ))} 
        <Form reply onSubmit={this.onSubmit}>
          <Form.Field 
          id='form-textarea-control-comment' 
          control={TextArea} 
          label='Comment' 
          name="comment" 
          value={this.state.comment}
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
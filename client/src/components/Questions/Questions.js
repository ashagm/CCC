import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './Questions.css';
import NavBar from "../NavBar";
import Comments from "../Comments";
import { Card, Segment, Form, Grid, Input, Item, TextArea, Button } from 'semantic-ui-react';

class Questions extends Component {
  
   constructor() {
    super();
    this.state = {
      isHidden: false,
      hideIds : [],
      name: '',
      category: '',
      question: '',
      message: '',
      questionsAsked: [],
      hideCommentIds: [
      {
        id : '',
        isHidden: true
      }]
    };
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  componentWillMount(){
    let username = localStorage.getItem("username");
    console.log("username", username);
    this.setState({"name": username});
  }

  componentDidMount(){
    axios.get('/api/question/all')
      .then(resAskedQuestions => {
        // console.log("got Services, resAskedQuestions", resAskedQuestions.data);
        this.setState({ questionsAsked: resAskedQuestions.data});
        
      })
      .catch(err => console.log(err));  

  }

  handleSubmit= (e) => {
    e.preventDefault();

    const { name, category, question } = this.state;
    const username = localStorage.getItem("username");

    axios.post('/api/question/create', { name, category, question})
      .then((result) => {
        // console.log(result.data);
        this.setState({ message: 'Submitted!' });
        this.setState({
          questionsAsked: [...this.state.questionsAsked, {
              _id: this.state._id,
              name: this.state.name,
              category: this.state.category,
              question: this.state.question,
          }]})

          this.setState({
            category: "General",
            question: ""
          });

        this.props.history.push('/questions')
    })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Questions could not be posted' });
        }
    });
   
  }

  handleCommentBtn = (propsId) => {
    
    console.log("You clicked on propsId", propsId);
    // this.state.hideIds.push(propsId);
    console.log("CommentID array", this.state.hideIds);

    if(this.state.hideIds.find(id => id === propsId)){
      this.setState({'isHidden' : true});
      this.state.hideIds.pop(propsId);
    }else{
      // this.setState({ hideIds: [...this.state.hideIds, propsId]});
      this.setState({ 'isHidden' : false});
      this.state.hideIds.push(propsId);
      
    }

  }


  render() {
    return (
      <div className="questions-container">
      <NavBar />
         <Grid columns='equal'>
            <Grid.Column width={4}>
              <Segment>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      Ask your Question
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                 <Form className="form-questions" onSubmit={this.handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Field id='form-input-control-full-name' name="name"
                      control={Input} label='User name' value={this.state.name}
                      placeholder='User name' onChange={this.onChange} />
                   </Form.Group>  
                   <Form.Group widths='equal'>  
                    <Form.Field label='Select category' name="category" control='select' value={this.state.category ? this.state.category : ''} onChange={this.onChange}>
                      <option value='General'>General</option>
                      <option value='Services'>Services</option>
                      <option value='Treatment'>Treatment</option>
                      <option value='Doctors'>Doctors</option>
                      <option value='Diet'>Diet</option>
                      <option value='Others'>Others</option>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field id='form-textarea-control-question' control={TextArea} label='Question' name="question" value={this.state.question}  onChange={this.onChange} />
                  <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
                </Form>                  
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment className="questions-segment">
                <Card centered fluid className="questions-card">
                  <Card.Content>
                    <Card.Header>
                      Previously Asked Questions 
                    </Card.Header>
                   </Card.Content> 
                  <Card.Content className="questions-content">
                    <Item.Group divided>
                      {this.state.questionsAsked.map(question => (                   
                        <Item key={question._id}>                          
                         <Item.Content>
                          <Item.Header><Link id={question._id} to="/questions"> {question.question}</Link></Item.Header>
                          <Item.Description>
                            <Item.Extra> Asked by: {question.name} in Category: {question.category} 
                              <Link to="#" className="btn-comment" id={"btn_" + question._id} onClick={() => this.handleCommentBtn(question._id)}>Comment</Link> 
                            </Item.Extra>                                  
                          </Item.Description>
                         {/*} {this.state.isHidden ? (
                            <Item.Description >
                              <Comments id={question._id}/>
                            </Item.Description>
                          ) : (null)} */}

                          {this.state.hideIds.find(id => id === question._id) && !this.state.isHidden ? (
                            <Item.Description >
                              <Comments id={question._id}/>
                            </Item.Description>
                          ) : (<Item.Description >
                              
                            </Item.Description>)}
                        </Item.Content>
                          </Item>
                      ))}
                  </Item.Group>
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
        </Grid>
      </div>      
    );
  }
}



export default Questions;
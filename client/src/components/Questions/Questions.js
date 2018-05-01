import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './Questions.css';
import API from "../../utils/API";
import logo from "../../logo.png";
import NavBar from "../NavBar";
import Comments from "../Comments";
import { Card, Segment, Form, Grid, Input, Item, TextArea, Button } from 'semantic-ui-react';

class Questions extends Component {
  
   constructor() {
    super();
    this.state = {
      isHidden: false,
      name: '',
      category: '',
      question: '',
      message: '',
      questionsAsked: []
    };
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
    console.log(this.state);
  }

  componentWillMount(){
    console.log("....mounting services");
    let username = localStorage.getItem("username");
    console.log("username", username);
    this.setState({"name": username});
  }

  componentDidMount(){
    console.log("Component did mounting....");
    axios.get('/api/question/all')
      .then(resAskedQuestions => {
        console.log("got Services, resAskedQuestions", resAskedQuestions.data);
        // console.log("Questions Asked", this.state.questionsAsked);
        this.setState({ questionsAsked: resAskedQuestions.data});
        
      })
      .catch(err => console.log(err));  

  }

  handleSubmit= (e) => {
    e.preventDefault();

    const { name, category, question } = this.state;
    console.log("State", this.state);
    const username = localStorage.getItem("username");
    console.log(username);

    axios.post('/api/question/create', { name, category, question})
      .then((result) => {
        console.log(result.data);
        this.setState({ message: 'Submitted!' });
        this.props.history.push('/questions')
    })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Questions could not be posted' });
        }
    });
   
  }

  handleCommentBtn = () => {
    this.state.isHidden ? this.setState({'isHidden' : false}) : this.setState({'isHidden' : true})
  }
 
  render() {
    return (
      <div>
      <NavBar />
         <Grid columns='equal'>
            <Grid.Column>
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
                    <Form.Field label='Select category' name="category" control='select' onChange={this.onChange}>
                      <option value='General'>General</option>
                      <option value='Services'>Services</option>
                      <option value='Treatment'>Treatment</option>
                      <option value='Doctors'>Doctors</option>
                      <option value='Diet'>Diet</option>
                      <option value='Others'>Others</option>
                    </Form.Field>
                  </Form.Group>
                  <Form.Field id='form-textarea-control-question' control={TextArea} label='Question' name="question" placeholder='Ask your question' onChange={this.onChange} />
                  <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
                </Form>                  
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      Questions 
                    </Card.Header>
                   </Card.Content> 
                  <Card.Content>
                    <Item.Group divided>
                        {this.state.questionsAsked.map(question => (                   
                           <Item>                          
                               <Item.Content>
                                <Item.Header><Link id={question._id} to="/questions"> {question.question}</Link></Item.Header>
                                <Item.Description>
                                  <Item.Extra> Asked by: {question.name} in Category: {question.category} 
                                    <Link to="/questions" className="btn" id={"btn_" + question._id} onClick={() => this.handleCommentBtn(question._id)}>Comment</Link> 
                                  </Item.Extra>                                  
                                </Item.Description>
                                {this.state.isHidden ? (
                                  <Item.Description>
                                    <Comments id={question._id}/>
                                  </Item.Description>
                                ) : (null)}
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
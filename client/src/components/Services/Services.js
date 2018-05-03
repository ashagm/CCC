import React, { Component } from 'react';
import axios from 'axios';
import './Services.css';
import API from "../../utils/API";
import NavBar from "../NavBar";
import { Card, Segment, Form, Grid, Input, Item, TextArea, Button } from 'semantic-ui-react';

class Services extends Component {
  
   constructor() {
    super();
    this.state = {
      name: '',
      contact: '',
      details: '',
      servicetype: '',
      message: '',
      servicesOffered: [],
      servicesRequired: []
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
    API.getAllServicesOffered()
      .then(resOfferedServices => {
        console.log("got Services, resOfferedServices", resOfferedServices.data);
        console.log("Services offered", this.state.servicesOffered);
        this.setState({ servicesOffered: resOfferedServices.data});
        // this.setState({ servicesOffered: [...this.state.servicesOffered, resOfferedServices]})
        
      })
      .catch(err => console.log(err));

    API.getAllServicesRequired()
      .then(resRequiredServices => {
        console.log("got Services, resOfferedServices", resRequiredServices.data);
        console.log("Services Required", this.state.servicesRequired);
        this.setState({ servicesRequired: resRequiredServices.data});
        // this.setState({ servicesOffered: [...this.state.servicesOffered, resOfferedServices]})
        
      })
      .catch(err => console.log(err));
  

  }

  handleSubmit= (e) => {
    e.preventDefault();

    const { name, contact, details, servicetype } = this.state;
    console.log("State", this.state);
    const username = localStorage.getItem("username");
    console.log(username);

    axios.post('/api/service/create', { name, contact, details, servicetype})
      .then((result) => {
        console.log(result.data);
        this.setState({ message: 'Submitted!' });

        if(servicetype === 'offer'){
         this.setState({
          servicesOffered: [...this.state.servicesOffered, {
              _id: this.state._id,
              name: this.state.name,
              contact: this.state.contact,
              details: this.state.details,
              servicetype : this.state.servicetype
          }]})
       }else{
        this.setState({
          servicesRequired: [...this.state.servicesRequired, {
              _id: this.state._id,
              name: this.state.name,
              contact: this.state.contact,
              details: this.state.details,
              servicetype : this.state.servicetype
          }]})

       }

        this.setState({
            contact: "",
            details: ""
          });
        this.props.history.push('/services')
    })
      .catch((error) => {
        if(error.response.status === 401) {
          this.setState({ message: 'Login failed. Username or password not match' });
        }
    });
   
  }
 
  render() {
    return (
      <div className="services-container">
      <NavBar />
         <Grid columns='equal'>
            <Grid.Column>
              <Segment>
                <Card>
                  <Card.Content>
                    <Card.Header>
                      Enter Services
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                 <Form className="form-services" onSubmit={this.handleSubmit}>
                  <Form.Group widths='equal'>
                    <Form.Field id='form-input-control-full-name' name="name"
                      control={Input} label='Full name' value={this.state.name}
                      placeholder='Full name' onChange={this.onChange} />
                   </Form.Group>  
                   <Form.Group widths='equal'>  
                    <Form.Field id='form-input-control-last-name' 
                    control={Input} 
                    label='Contact' 
                    name='contact'
                    value={this.state.contact}
                    placeholder='Contact' onChange={this.onChange} />
                  </Form.Group>
                   <Form.Group grouped>
                    <label></label>
                    <Form.Field label='Service Offered' 
                    control='input' 
                    type='radio' 
                    value='offer'
                    name='servicetype' onChange={this.onChange} />
                    <Form.Field label='Service required' 
                    control='input' 
                    type='radio' 
                    value='require'
                    name='servicetype' onChange={this.onChange} />
                  </Form.Group>
                  <Form.Field id='form-textarea-control-details' control={TextArea} label='Details' name="details" value={this.state.details} onChange={this.onChange} />
                  <Form.Field id='form-button-control-public' control={Button} content='Confirm' />
                </Form>                  
                  </Card.Content>
                </Card>
              </Segment>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment  className="services-segment">
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      Services Required
                    </Card.Header>
                   </Card.Content> 
                  <Card.Content>
                       <Item.Group divided>
                        {this.state.servicesRequired.map(serviceRequire => (                   
                           <Item>                          
                               <Item.Content>                                
                                <Item.Description>
                                  {serviceRequire.details}
                                </Item.Description>
                                <Item.Meta> Contact:  {serviceRequire.name}, {serviceRequire.contact}</Item.Meta>
                              </Item.Content>
                            </Item>
                        ))}
                    </Item.Group>  
                  </Card.Content>
                </Card>
              </Segment>
              <Segment  className="services-segment">
                <Card fluid>
                  <Card.Content>
                    <Card.Header>
                      Services Offered
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                  <Item.Group divided>
                    {this.state.servicesOffered.map(serviceOffer => (                   
                       <Item>                          
                           <Item.Content> 
                            <Item.Description>
                              {serviceOffer.details}
                            </Item.Description>
                            <Item.Meta>Contact : {serviceOffer.name}, {serviceOffer.contact}</Item.Meta>
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

export default Services;
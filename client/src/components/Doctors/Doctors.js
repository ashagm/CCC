import React, { Component } from 'react';
import './Doctors.css';
import API from "../../utils/API";
import { Segment, Image, Grid, Item, Button } from 'semantic-ui-react';
import logo from "../../logo.png";
import doclogo from "./doctor.jpeg";
import NavBar from "../NavBar";

class Doctors extends Component {

  state = {
    location: "",
    doctors: [],
    savedDocs: false,
    savedDoctors: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    console.log("handleFormSubmit", this.state.location)
    event.preventDefault();
    this.setState({savedDocs : false});
    API.getDoctors({
        location: this.state.location
    })
    .then(resDoctors => {
      console.log("got doctors, resDoctors", resDoctors);
      // this.state.doctors.push(resDoctors);
      // console.log("state", this.state.doctors);
      this.setState({ doctors: resDoctors});
      // this.setState({ doctors: [...this.state.doctors, resDoctors]})
    })
    .catch(err => console.log(err));
  };

  saveDoctor = props => {
    console.log(props);
    API.saveDoctor(props)
    .then(response => {
      console.log("saved", response);
    })
    .catch(err => console.log(err))
  };

  fetchSavedDoctors = (event) => {
    
    API.getSavedDoctors()
    .then(response => {
      console.log("got saved docs", response.data);
      this.setState({savedDocs : true});
      this.setState({ savedDoctors: response.data});
    })
    .catch(err => console.log(err));
  };

  render() {

    return (
      <div className="container">
        <NavBar/>
        <div className="searchBar">
            <form className="search-form">          
              <input
                value={this.state.location}
                name="location"
                onChange={this.handleInputChange}
                type="text"
                className="input-field"
                placeholder="Enter location"
              />
              <button className="btn-search" onClick={this.handleFormSubmit}>Search</button>          
            </form>
            <span><button className="btn-search-rec" onClick={this.fetchSavedDoctors}>Recommended Doctors</button></span>               
        </div>           

        {this.state.doctors.length || this.state.savedDoctors.length ? (
          <div className="mainContainer">
            <div className="doc-container-display">
              {this.state.savedDocs ? (
                <Item.Group divided>
                  {this.state.savedDoctors.map(savedDoctor => (                   
                    <Item className="doc-div">                        
                        <Item.Content> 
                            <Item.Header style={{color: "rgb(95, 124, 162)"}}> 
                               Dr. {savedDoctor.name}
                            </Item.Header>                      
                            <Item.Image
                              src={savedDoctor.image}
                              alt={savedDoctor.name}
                              className="doc-thumb-image"
                            />
                            <Item.Description>
                              {savedDoctor.bio}
                            </Item.Description>
                           
                        </Item.Content>
                      </Item>
                  ))}
                </Item.Group> 
              ) :(
              <Item.Group divided>
                  {this.state.doctors.map(doctor => (                   
                     <Item className="doc-div">
                        <Item.Image
                          src={doctor.image}
                          alt={doctor.name}
                          className="doc-thumb-image"
                        />
                        <Item.Content>
                            <Item.Header style={{color: "rgb(95, 124, 162)"}}>
                              Dr. {doctor.name}
                            </Item.Header>
                            <Item.Description>
                              {doctor.speciality.map(specialities => 
                                    (<p>{specialities.name}</p>)
                                )}
                            </Item.Description>
                            <Item.Meta>
                              <span>{doctor.address.street} {doctor.address.city} {doctor.address.state} </span>
                              <span>
                                
                              </span>
                              <br />
                            </Item.Meta>

                         <Button positive onClick={() => this.saveDoctor(doctor)} >Recommend</Button>    

                        </Item.Content>
                      </Item>
                  ))}
              </Item.Group>  
              )}  
            </div>
          </div>
          ) : (
            <div>
              <Segment className="welcomeBox">
                  <h1 className="work-sans">Find your local doctors</h1>
                  <h3 className="work-sans">Enter your current location to get started</h3>
                  <Image className="doc-image" src={doclogo}/>
              </Segment>
            </div>
          )
        }
      </div>     
    );
  }
}

export default Doctors;
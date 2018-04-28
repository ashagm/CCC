import React, { Component } from 'react';
import './Doctors.css';
import API from "../../utils/API";
import { Segment, Image, Grid, Item } from 'semantic-ui-react';
// import { Form, Input, Icon, Dropdown, Button } from "semantic-ui-react";
import DocDetails from "./DocDetails";
import logo from "../../logo.png";
import doclogo from "./doctor.jpeg";

class Doctors extends Component {

  state = {
    location: "",
    doctors: [],
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

    API.getDoctors({
        location: this.state.location
    })
    .then(resDoctors => {
      console.log("got doctors", resDoctors);
      // this.state.doctors.push(resDoctors);
      // console.log("state", this.state.doctors);
      this.setState({ doctors: resDoctors});
      // this.setState({ doctors: [...this.state.doctors, resDoctors]})
    })
    .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container">
        <div className="div-logo">
          <img src={logo} alt="logo" className="logo-register"/>
        </div> 
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
        </div>

        {this.state.doctors.length ? (
          <div className="mainContainer">
            <div className="doc-container-display">
              <Item.Group>
                  {this.state.doctors.map(doctor => (                   
                     <Item className="doc-div">
                        <Item.Image
                          src={doctor.image}
                          alt={doctor.name}
                        />
                        <Item.Content>
                            <Item.Header as="a" onClick={e => this.props.onClick(this.props.dr)} style={{color: "rgb(95, 124, 162)"}}>
                              Dr. {doctor.name}
                            </Item.Header>
                            <Item.Meta>
                              <span>
                                {doctor.speciality.map(specialities => 
                                    (<p>{specialities.name}</p>)
                                )}
                              </span>
                              <br />
                            </Item.Meta>
                        </Item.Content>
                      </Item>
                  ))}
              </Item.Group>    
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
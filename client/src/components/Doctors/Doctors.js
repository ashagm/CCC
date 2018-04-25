import React, { Component } from 'react';
import './Doctors.css';
import API from "../../utils/API";

class Doctors extends Component {

    state = {
      location: ""
    };
  

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    console.log("handle inpput");
    // Updating the input's state
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
    .then(res => console.log("got doctors", res))
    .catch(err => console.log(err));

  };

  render() {
    return (
      <div className="container">
        <h1>DOCTORS</h1>
        <h3> Search for Oncologists </h3>
         <div>
        <form className="form">
          <input
            value={this.state.location}
            name="location"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Enter state"
          />
          <button className="my-button" onClick={this.handleFormSubmit}>Find Doctors</button>
        </form>
      </div>

      </div>
    );
  }
}

export default Doctors;
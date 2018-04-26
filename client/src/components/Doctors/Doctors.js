import React, { Component } from 'react';
import './Doctors.css';
import API from "../../utils/API";
import DocDetails from "./DocDetails";

class Doctors extends Component {

  state = {
    location: "",
    doctors: [],
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
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

        {this.state.doctors.length ? (
          <div className="mainContainer">
            <div className="mainItemMap">
                  {this.state.doctors.map(doctor => (
                    <div id={doctor.id}>
                      <h1>{doctor.name}</h1>
                      <img src={doctor.image} alt={doctor.name}/>
                      <div>{doctor.speciality.map(specialities => 
                        (<p>{specialities.name}</p>)
                      )}
                      </div>
                    </div> 
                  ))}
            </div>

          </div>
          ) : (
            <div> No doctors to show</div>
          )
        }
      </div>
     
    );
  }
}

export default Doctors;
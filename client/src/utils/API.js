import axios from "axios";

export default {
  // getDoctors: function(location) {
  //   console.log()
  //   return this.getGeoLocation(location)
  //   	.then(response => {
  //   		console.log("Res", response);
  //   		let lat = response.data.results[0].geometry.location.lat;
	 //    	let long = response.data.results[0].geometry.location.lng;
	 //    	// console.log("lat", lat);
  //     //   console.log("long", long);	    	
	 //    	return axios.post("/api/doctor/doctors", { "lat" : lat, "long" : long, "location": location.location});
  //   	})
  //   	.then(postResult => { 
  //   		// console.log("postResult", postResult);
  //   		return this.getDoctorDetails(postResult.data);
  //   	})
  //   	.catch(err => {
  //   		console.log(err);
  //   	})    
  // },

  getDoctors: function(location) {
    return axios.post("/api/doctor/doctors", {"location": location.location})
    .then(postResult => { 
       // console.log("postResult", postResult);
       return this.getDoctorDetails(postResult.data);
     })
     .catch(err => {
       console.log(err);
     })       
  },

  getSavedDoctors : function(){
    return axios.get("/api/doctor/all");
  },


  getGeoLocation : function(location){
		console.log('In API', location);
		return axios.get("http://maps.google.com/maps/api/geocode/json?address=" + location);
  },

  getDoctorDetails : function(doctors){
  	let doctorsData = doctors.data;
    console.log(doctorsData);
  	let doctorsArr = [];
  	doctorsData.forEach(function(result) {

        doctorsArr.push(
        	{
	            "name" : result.profile.first_name + " " + result.profile.last_name +  ", " + result.profile.title,
	            "image" : result.profile.image_url,
	            "bio" : result.profile.bio,
	            "speciality": result.specialties,
              "id": result.uid,
              "address": result.practices[0].visit_address
        	}
          );
       });
  	console.log(doctorsArr);
  	return doctorsArr;
  },

  saveDoctor : function(doctor){
    console.log("In Save doctor", doctor)
    return axios.post("/api/doctor/save", doctor);
  },

  getUsername : function(){
    console.log(localStorage.getItem('mySession'));
  },

  saveService: function(){
      return axios.post("/api/service");
  },

  getAllServicesOffered: function(){
    console.log("getAllServicesoffered......");
      return axios.get("/api/service/all/offer");
  },

  getAllServicesRequired: function(){
      return axios.get("/api/service/all/require");
  }
};

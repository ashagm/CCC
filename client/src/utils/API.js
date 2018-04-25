import axios from "axios";

export default {
  getDoctors: function(location) {
    return this.getGeoLocation(location)
    	.then(response => {
    		console.log("Res", response);
    		let lat = response.data.results[0].geometry.location.lat;
	    	let long = response.data.results[0].geometry.location.lng;
	    	console.log("lat", lat);console.log("long", long);	    	
	    	return axios.post("/api/doctor/doctors", { "lat" : lat, "long" : long});
    	})
    	.then(postResult => { 
    		console.log("postResult", postResult);
    		return this.getDoctorDetails(postResult.data);
    	})
    	.catch(err => {
    		console.log(err);
    	})    
  },

  getGeoLocation : function(location){
		console.log('In API', location);
		return axios.get("http://maps.google.com/maps/api/geocode/json?address=" + location);
  },

  getDoctorDetails : function(doctors){
  	let doctorsData = doctors.data;
  	let doctorsArr = [];
  	doctorsData.forEach(function(result) {
       console.log("result", result);
        doctorsArr.push(
        	{
	            "name" : result.profile.first_name + result.profile.last_name + result.profile.title,
	            "image" : result.profile.image_url,
	            "bio" : result.profile.bio,
	            "speciality": result.specialties
        	}
          );
       });
  	console.log(doctorsArr);
  	return doctorsArr;
  }
};

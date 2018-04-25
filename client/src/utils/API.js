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
    	.then(postResult => { console.log(postResult)})
    	.catch(err => {
    		console.log(err);
    	})    
  },

  getGeoLocation : function(location){
		console.log('In API', location);
		return axios.get("http://maps.google.com/maps/api/geocode/json?address=" + location);
  }
};

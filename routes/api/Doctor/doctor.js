var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var axios = require('axios');

let apiKey = 'fbc02dea436e8732f548483ce4e0c7ef';
let googleAPIKey= 'AIzaSyDOHt8WJPCxUTykGJPREk1gqNDcfrq--k8';

router.post('/doctors', function(req, res) {
  console.log("Authenticated?", req.isAuthenticated());
  // console.log("/doctors", req.body.lat,",",req.body.long, ",", req.body.location);

  var geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.location + "&key=AIzaSyDOHt8WJPCxUTykGJPREk1gqNDcfrq--k8";

  console.log(geoURL);

  axios.get(geoURL)
    .then(response => {     
        console.log("Google maps Response", response.data.results[0].geometry.location);
        let latLong = response.data.results[0].geometry.location;

        var docURL = 
        "https://api.betterdoctor.com/2016-03-01/doctors?query=oncology" + 
        "&location=" + response.data.results[0].geometry.location.lat + encodeURIComponent(",") + response.data.results[0].geometry.location.lng + encodeURIComponent(",") + 10 +
        "&skip=0&limit=20&user_key=" + apiKey +
        "&user_location=" + response.data.results[0].geometry.location.lat + encodeURIComponent(",")+ response.data.results[0].geometry.location.lng;
    
        console.log(docURL);

        axios.get(docURL)
        .then(response => {     
          console.log("Response", response.data);
          res.send(response.data);    
        })
        .catch(err => res.status(422).json(err.response));  
           
      })
    .catch(err => res.status(422).json(err.response));   
   
});


module.exports = router;

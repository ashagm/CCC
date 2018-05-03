var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var axios = require('axios');
var Doctor = require("../../../models/Doctor");

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

router.post('/save', function(req, res){
  console.log("in Save", req.body, req.params);

    var newDoctor = new Doctor({
      id : req.body.id,
      name : req.body.name,
      speciality : req.body.speciality,
      bio : req.body.bio,
      image : req.body.image
    });

    newDoctor.save(function(err){
      if(err){
        return res.json({success: false, msg: 'Already exists.'});
      }
      console.log("done!");
      res.json({success: true, msg: 'Successfully created a new Doctor'});
    });
  
});

router.get('/all', function(req, res){
  console.log("in get all" );

    Doctor.find({})
    .then(function(dbDoctor) {
      // If any Books are found, send them to the client
      res.json(dbDoctor);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  
})


module.exports = router;

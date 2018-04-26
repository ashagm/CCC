var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var axios = require('axios');

let apiKey = 'fbc02dea436e8732f548483ce4e0c7ef';

router.post('/doctors', function(req, res) {
  console.log("/doctors", req.body.lat,",",req.body.long);

  var docUrl = 
  "https://api.betterdoctor.com/2016-03-01/doctors?query=oncology" + 
  // "&location=" + req.body.lat + encodeURIComponent(",") + req.body.long + 
  "&skip=0&limit=20&user_key=" + apiKey +
  "&user_location=" + req.body.lat + encodeURIComponent(",")+ req.body.long;
  

  console.log(docUrl);

  axios.get(docUrl)
    .then(response => {    	
    	// console.log("Response", response.data);
    	res.send(response.data);   	
    })
    .catch(err => res.status(422).json(err.response));	  

});


module.exports = router;

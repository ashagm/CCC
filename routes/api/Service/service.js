var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Service = require("../../../models/Service");

router.post('/create', function(req, res) { 
   console.log("In post", req.body);
    var newService = new Service({
      name : req.body.name,
      contact : req.body.contact,
      type : req.body.servicetype,
      details: req.body.details
    });

    console.log(newService);

    newService.save(function(err){
      if(err){
        return res.json({success: false, msg: 'Already exists.'});
      }
      console.log("Success service");

      res.json({success: true, msg: 'Successfully created a new Service'});
    });
});

router.get('/all/offer', function(req, res) { 
  	console.log("all offers");
  	Service.find({ 'type' : 'offer' }, function (err, service) {
  		if(err){
          	return res.json(err);
        		}
        	console.log(service)
        	return res.json(service);
  	});
});

router.get('/all/require', function(req, res) {
 
   console.log("all requirements");
   Service.find({ 'type' : 'require' }, function (err, service) {
		if(err){
        	return res.json(err);
      		}
      	console.log(service)
      	return res.json(service);
	});
});

module.exports = router;
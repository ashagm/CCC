var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../../models/user");

//identifies register
//
router.post('/', function(req, res){

	if(!req.body.username || !req.body.password){
		res.json({success: false, msg: 'Please pass username and password.'});
	}else {
		var newUser = new User({
			username : req.body.username,
			password : req.body.password
		});

		newUser.save(function(err){
			if(err){
				return res.json({success: false, msg: 'Already exists.'});
			}

			res.json({success: true, msg: 'Successfully created a new user'});
		});
	}
});


module.exports = router;
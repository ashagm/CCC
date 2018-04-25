var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../../../config/settings');
require('../../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../../../models/user");

router.post('/login', function(req, res) {
  console.log("/login");
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), settings.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/register', function(req, res) {
  console.log('/register');
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


router.get('/logout', function(req, res){
  console.log('/logout');
  req.logout();
  console.log("logged out...");
  res.redirect('/');
});

module.exports = router;
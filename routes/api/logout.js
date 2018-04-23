// var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();


router.get('/', function(req, res){
  req.logout();
  console.log("logged out...");
  res.redirect('/');
});

module.exports = router;
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/User');
var settings = require("../config/settings");

module.exports = function(passport){
  // console.log("passport", passport);
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  	opts.secretOrKey = settings.secret;
  	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log("Inside Passport....");
    User.findOne({id: jwt_payload.id}, function(err, user) {
      console.log("user passporjs-", user);
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};

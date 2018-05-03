const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
var path = require('path');
var logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var socket = require('./routes/api/Socket');

io.on('connection', function(socket){
  console.log('a user got connected!!');
  
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

app.use(logger('dev'));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


const CORS_WHITELIST = require('./constants/frontend');

const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};

const configureServer = app => {
  app.use(cors(corsOptions));

  app.use(bodyParser.json());
};

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cccDB");

// Start the API server
app.listen(PORT, function(error) {
  if(error) console.log(error);
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
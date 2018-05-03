const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");
var path = require('path');
var logger = require('morgan');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const http = require('http');
var socket = require('socket.io');

// var httpServer = http.Server(app);

app.use(logger('dev'));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);
  
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

// const CORS_WHITELIST = require('./constants/frontend');

// const corsOptions = {
//   origin: (origin, callback) =>
//     (CORS_WHITELIST.indexOf(origin) !== -1)
//       ? callback(null, true)
//       : callback(new Error('Not allowed by CORS'))
// };

// const configureServer = app => {
//   app.use(cors(corsOptions));

//   app.use(bodyParser.json());
// };

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cccDB");

// Start the API server
let server = app.listen(PORT, function(error) {
  if(error) console.log(error);
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

var io = socket(server);
// var socket = require('./routes/api/Socket');
const allowedOrigin = 
(process.env.NODE_ENV === 'production') ? "https://care-connect-conquer.herokuapp.com/" : 'http://localhost:3000';

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', allowedOrigin);
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});

// io.origins('*:*');
// io.on('connection', function(client){
//   console.log('a user got connected!!');
  
//     client.on('SEND_MESSAGE', function(data){
//       console.log("In send message", data);
//         io.emit('RECEIVE_MESSAGE', data);
//     });

//     client.on('disconnect', function(){
//       console.log('user disconnected');
//     });
// });

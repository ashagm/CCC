var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({

  	name: {
        type: String,
        required: true
    },
  	contact: {
        type: String,
        required: true
    },  
  	type: {
        type: String,
        required: true
    },
    details: {
        type: String,
    }
});

module.exports = mongoose.model('Service', ServiceSchema);
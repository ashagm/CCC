var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = new Schema({
	id: {
        type: String,
        unique: true,
        required: true
    },
  	name: {
        type: String,
    },
  	speciality: {
        type: String,
    },  
  	bio: {
        type: String,
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
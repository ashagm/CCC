var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  	name: {
        type: String,
    },
  	category: {
        type: String,
    },  
  	question: {
        type: String,
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
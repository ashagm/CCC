var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  	qId: {
        type: String,
        required: true
    },
  	comment: {
        type: String,
        required: true
    },
    name: {
    	type: String,
    	required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
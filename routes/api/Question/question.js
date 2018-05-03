var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Question = require("../../../models/Question");

router.post('/create', function(req, res) { 
   console.log("In post", req.body);
    var newQuestion = new Question({
      name : req.body.name,
      category : req.body.category,
      question : req.body.question
    });

    console.log(newQuestion);

    newQuestion.save(function(err){
      if(err){
        return res.json({success: false, msg: 'Could not be posted.'});
      }
      console.log("Success service");

      res.json({success: true, msg: 'Successfully created a new Question'});
    });
});

router.get('/all', function(req, res) { 
    console.log("all questions");
    Question.find(function (err, question) {
      if(err){
            return res.json(err);
            }
          console.log(question)
          return res.json(question);
    });
});


module.exports = router;
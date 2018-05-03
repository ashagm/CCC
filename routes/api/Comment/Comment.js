var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Comment = require("../../../models/Comment");

router.post('/create', function(req, res) { 
   console.log("In post", req.body);
    var newComment = new Comment({
      qId : req.body.q_id,
      comment : req.body.comment,
      name: req.body.name
    });

    console.log(newComment);

    newComment.save(function(err){
      if(err){
        return res.json({success: false, msg: 'Comment Could not be posted.'});
      }
      console.log("Success Comment");

      res.json({success: true, msg: 'Successfully created a new Comment'});
    });
});

router.get('/all:id', function(req, res) { 
    console.log("all comments", req.params.id);
    Comment.find({qId : req.params.id}, function (err, comment) {
      if(err){
            return res.json(err);
            }
          console.log(comment)
          return res.json(comment);
    });
});


module.exports = router;
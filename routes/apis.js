var express = require('express');
var Label = require('../models/label');
var bodyParser = require('body-parser');
// API router
var router = express.Router();
var jsonParser = bodyParser.json();
var fs = require('fs');
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'public/uploads/');
  },
  filename: function (request, file, callback) {
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('images');

router.route('/labels')
.post(jsonParser, function(req, res){
    
    var label = new Label();
    
    console.dir(req.body);
    console.log('id ' + req.body.user_id);
    label.user_id = req.body.user_id;
    label.image_id = req.body.image_id;
    label.labels = req.body.labels;
    
    label.save(function(err){
        if (err)
            res.send(err);
        res.json({message : 'Label created!'});
    })
});

router.route('/labels')
.get(function(req, res) {
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        res.json(label);
    })
});


router.route('/upload')
.post(upload, function(req, res) {
  // find the image_id in the database
  // If the file is not in the database, update it!
  Label.find({"image_id" : req.file.originalname}, function(err, label) {
    console.log(label);
    if(err)
      res.send(err);
    console.log(label.length);

    if(typeof label !== 'undefined' && label.length > 0) {
      console.log('File existed!');
      res.end('file existed');
    } else {
        var label = new Label();
        label.user_id = "";
        label.image_id = req.file.originalname;
        label.labels = "";
        label.save(function(err){
           if (err)
           res.send(err);
           return;
        });
        console.log('DB is updated!');
        res.end('Images Uploaded');
        return;
    }
  });
});

router.route('/explore')
.get(function(req, res) {
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        res.json(label);
    })
});

router.route('/upload')
.get(function(req, res) {
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        res.json(label);
    })
});

router.route('/explore')
.post(jsonParser, function(req, res) {
    /* not used now!! */
    /* find the class in mongoDB and return the file name */
    /* Use file name to test the function now */
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        return res.send('hi');
    })
});

module.exports = router;
var express = require('express');
var Label = require('../models/label')
var bodyParser = require('body-parser')
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
    console.log('uploading');
    console.log(file);
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
.post(function(req, res) {
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        res.json(label);
    })
});

router.route('/upload')
.post(function(req, res) {
  upload(req, res, function(err) {
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(req.file);
  res.end('Your File Uploaded');
  console.log('Images Uploaded');
  })
});

module.exports = router;
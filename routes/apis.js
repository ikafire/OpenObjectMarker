var express = require('express');
var Label = require('../models/label');
var bodyParser = require('body-parser');
// API router
var router = express.Router();
var jsonParser = bodyParser.json();
var fs = require('fs');
var multer  = require('multer');
var AM = require('../modules/account-manager');

var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    console.log('1');
    callback(null, 'public/uploads/');
  },
  filename: function (request, file, callback) {
    console.log('1');
    console.log(request);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).single('file');

router.route('/upload')
.post(upload, function(req, res) {
  // find the image_id in the database
  // If the file is not in the database, update it!
  Label.find({"image_id" : req.file.originalname}, function(err, label) {
    if(err)
      res.send(err);

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


/* Login process */
router.route('/login')
.post(jsonParser, function(req, res) {

    AM.manualLogin(req.body.user_name, req.body.password, function(e, o){
			if (!o){
                // Send the error message.
				res.status(400).send(e);
			}	else{
                // Success
				req.session.user = o;
				res.status(200).send(o);
			}
		});
});

/* Login process */
router.route('/signUp')
.post(jsonParser, function(req, res) {

    AM.addNewAccount({
			user : req.body.user_name,
            pass : req.body.password
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
});

module.exports = router;
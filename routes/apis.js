var express = require('express');
var Label = require('../models/label');
var bodyParser = require('body-parser');
// API router
var router = express.Router();
var jsonParser = bodyParser.json();
var fs = require('fs');
var multer  = require('multer');
var AM = require('../modules/account-manager');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.createConnection('mongodb://192.168.11.100/session');
var db = mongoose.connection;
var login_session = session({
  secret: 'supersecretstring12345!',
  saveUninitialized: true,
  resave: true,
  store: new MongoStore({ mongooseConnection: db })
});
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'public/uploads/');
  },
  filename: function (request, file, callback) {
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

/* Save the labels */
router.route('/saveLabels')
.post(jsonParser, function(req, res) {

    console.log(req.body.Labels);
    var str = req.body.img.split('/');
    var imgName = str[str.length - 1];
    console.log({"image_id" : imgName});
    Label.findOneAndUpdate({"image_id" : imgName}, {
        "user_id" : "",
        "image_id" : imgName,
        "labels" : req.body.Labels
    }, {upsert: true, new: true},
    function(err, numberAffected, raw){
        console.log(err, numberAffected, raw)
    });
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
.post(jsonParser, login_session, function(req, res) {

    AM.manualLogin(req.body.username, req.body.password, function(e, o){
			if (!o){
                // Send the error message.
				res.status(400).send(e);
			}	else{
                // Success
                console.log(req.session);
				//req.session.username = o;
                //req.session.save();
                //console.log("# Session value set "+ req.session.username);
				res.status(200).send(o);
			}
		});
});

/* Login process */
router.route('/signUp')
.post(jsonParser, function(req, res) {

    AM.addNewAccount({
			username : req.body.username,
            password : req.body.password
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
});



module.exports = router;
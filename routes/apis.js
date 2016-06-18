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
var zip = require('express-zip');

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

function parseLabels(labels, cls) {
    var ret = [];
    for(var i = 0; i < labels.length; i++) {
        var perImg = [];
        var nowImg = labels[i].labels;
        for (var j = 0; j < nowImg.length; j++) {
            if (cls.indexOf(nowImg[j].class) != -1) {
                perImg.push(nowImg[j]);
            }
        }
        if(perImg.length > 0) {
            var img = labels[i];
            img.labels = perImg
            ret.push(img);
        }
    }
    return ret;
}

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

/* Get all classes labels */
router.route('/explore')
.get(function(req, res) {
    Label.find(function(err, label) {
        if(err)
            res.send(err);
        res.json(label);
    })
});

/* Get Labels by class */
router.route('/explore/:class')
.get(jsonParser, function(req, res) {
    var cls = (req.params.class).split(',');
    Label.find(function(err, label) {
      if(err)
        res.send(err);
      var parsedLabels  = parseLabels(label, cls);
      res.json(parsedLabels);
  });
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
.post(jsonParser, function(req, res) {

    AM.manualLogin(req.body.username, req.body.password, function(e, o){
			if (!o){
                // Send the error message.
				res.status(400).send(e);
			}	else{
				res.json(o);
			}
		});
});

/* Signup process */
router.route('/signup')
.post(jsonParser, function(req, res) {
    AM.addNewAccount({
			username : req.body.username,
            password : req.body.password
		}, function(e){
			if (e){
                console.log(e);
				res.status(400).send(e);
			}	else{
                console.log('ok');
				res.status(200).send('ok');
			}
		});
});

/* Download Labels by class process */
router.route('/DownloadLabels/:class')
.get(jsonParser, function(req, res) {
    var cls = (req.params.class).split(',');
    Label.find(function(err, label) {
      if(err)
        res.send(err);
      var parsedLabels  = parseLabels(label, cls);
      console.log(parsedLabels);
      fs.writeFileSync("./tmpLabels.json", JSON.stringify(parsedLabels));
      var file = './tmpLabels.json';
      res.download(file);
  });
});

/* Download all Labels process */
router.route('/DownloadLabels/')
.get(jsonParser, function(req, res) {
    var cls = req.params;
    console.log(cls);
    Label.find(function(err, label) {
      if(err)
        res.send(err);

      fs.writeFileSync("./tmpLabels.json", JSON.stringify(label));
      var file = './tmpLabels.json';
      res.download(file);
  });
});

router.route('/DownloadImgs')
.get(jsonParser, function(req, res) {
    var cls = req.params;
    console.log(cls);
    Label.find(function(err, label) {
      if(err)
        res.send(err);

      var files = [];
      for (var i = 0; i < label.length; i++) {
          files.push({path: __dirname + "/../public/uploads/" + label[i].image_id, name: label[i].image_id});
      }
      console.log(files);
      res.zip(files);
  });
});

module.exports = router;
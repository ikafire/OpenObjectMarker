var express = require('express');
var Label = require('../models/label')
var bodyParser = require('body-parser')
// API router
var router = express.Router();
var jsonParser = bodyParser.json()

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

module.exports = router;
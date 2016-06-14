var mongoose = require('mongoose');
var Character = require('./models/label');
var config = require('./config');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var app = express();
var apis = require('./routes/apis');


app.use('/api', apis);
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

mongoose.connect('mongodb://192.168.11.100/mongo');
//mongoose.connect('mongodb://localhost/OBM');
console.log('Success: Connect to mongoDB');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
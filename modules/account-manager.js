var crypto 		= require('crypto');
var moment 		= require('moment');
var mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost/Login');

var loginSchema = new mongoose.Schema({
    user       : String,
    password   : String
});

exports.manualLogin = function(user, pass, callback)
{
	loginSchema.findOne({user:user}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
    });
}


/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	loginSchema.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			saltAndHash(newData.pass, function(hash){
				newData.pass = hash;
				// append date stamp when record was created //
				newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
				accounts.insert(newData, {safe: true}, callback);
			});
		}
	});
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}
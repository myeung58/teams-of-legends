var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
});

UserSchema.methods.setPassword = function(password){
  // generate salt
  this.salt = crypto.randomBytes(16).toString('hex');

  // password, salt, iterations, key length
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

// generate JSON web token
UserSchema.methods.generateJWT = function() {
  var today = new Date(),
    exp = new Date(today);

  // set expiration to 60 days
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, process.env.SSH_KEY);
};

mongoose.model('User', UserSchema);

var User = mongoose.model('User', UserSchema);

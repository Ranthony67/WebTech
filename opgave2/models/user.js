var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
  email: String,
  crypted_password: String,
  token: String
});
var User = mongoose.model('User', userSchema);

module.exports = User;

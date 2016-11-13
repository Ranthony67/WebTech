var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var programSchema = new mongoose.Schema({
  done: Boolean
});
var Program = mongoose.model('Program', programSchema);

module.exports = Program;

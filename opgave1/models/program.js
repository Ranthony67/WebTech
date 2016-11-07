var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var programSchema = new mongoose.Schema({});
var Program = mongoose.model('Program', programSchema);

module.exports = Program;

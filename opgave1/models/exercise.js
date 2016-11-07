var mongoose = require('mongoose');

var exerciseSchema = new mongoose.Schema({
  program_id: String,
  name: String,
  description: String,
  sets: Number,
  repetition: String
});
var Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

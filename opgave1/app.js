var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Express setup
var app = express();

// MongoDB setup with mongoose
var mongoDbPath = 'mongodb://localhost/opgave1';
var db = mongoose.connection;

// Set PUG as template engine
app.set('view engine', 'pug');

// Database schemas
var programSchema = new mongoose.Schema({});
var Program = mongoose.model('Program', programSchema);

var exerciseSchema = new mongoose.Schema({
  traning_program_id: String,
	name: String,
	description: String,
	sets: Number,
	repetition: String
});
var Exercise = mongoose.model('Exercise', exerciseSchema);

// Connect db
db.on('error', console.error);
db.on('open', function() {
});

mongoose.connect(mongoDbPath);

// Setup routes
app.get('/', function(req, res) {
	const programs = [];
	res.render('index', { programs });

	Program.find({}).exec().then((error,items)=>{
		res.send(items.length);
	});
});

app.post('/program', function(req, res) {
  new Program().save((err, item) => {
    res.redirect('/program/' + item._id);
  });
});

app.get('/program/:id', function(req, res) {
  const traningId = req.params.id;
  res.send(traningId);
});

// Initialise app server
app.listen(3000, function() {
	console.log("App is now running on port 3000");
});


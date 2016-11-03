var express = require('express');
var mongoose = require('mongoose');

// Express setup
var app = express();

// MongoDB setup with mongoose
var mongoDbPath = 'mongodb://localhost/opgave1';
var db = mongoose.connection;

// Set PUG as template engine
app.set('view engine', 'pug');

// Setup routes
app.get('/', function(req, res) {
	res.render('index', { message: 'test', title: 'test' });
});

// Database schemas
var exerciseSchema = new mongoose.Schema({
	name: String,
	description: String,
	sets: Number,
	repetition: Number
});
var Exercise = mongoose.model('Exercise', exerciseSchema);

// Connect db
db.on('error', console.error);
db.on('open', function() {
});

mongoose.connect(mongoDbPath);

// Initialise app server
app.listen(3000, function() {
	console.log("App is now running on port 3000");
});

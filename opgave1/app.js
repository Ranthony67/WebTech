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

// Connect db
db.on('error', console.error);
db.on('open', function () {
});
mongoose.connect(mongoDbPath);

var Program = require('./models/program');

app.use('/program', require('./routes/program'));

// Setup routes
app.get('/', function (req, res) {
  const programs = [];

  Program
    .find((error, items)=> {
      res.render('index', { programs: items });
    });
});

// Initialise app server
app.listen(3000, function () {
  console.log("App is now running on port 3000");
});


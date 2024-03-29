require('dotenv').config();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
mongoose.Promise = global.Promise;

// Express setup
var app = express();
app.use(bodyParser.json({extended: true}));

// Fixes CORS
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Token, Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "PATCH, POST, GET, DELETE, PUT, OPTIONS");
  next();
});

// MongoDB setup with mongoose
var db = mongoose.connection;

// Connect db
db.on('error', console.error);
db.on('open', function () {});
mongoose.connect(process.env.MONGODB_URI);

// Route setup
app.use('/users', require('./routes/user'));
app.use('/programs', require('./routes/program'));

app.get('/', (req, res) => {
  res.send({msg: 'Welcome'});
});

// Initialise app server
var port = process.env.PORT || 3000;
app.listen(process.env.PORT || 3000, function () {
  console.log("App is now running on port " + port);
});

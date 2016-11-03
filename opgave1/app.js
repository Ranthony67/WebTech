var express = require('express');
var app = express();

// Set PUG as template engine
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('views/index', { message: 'test', title: 'test' });
});

app.listen(3000, function() {
  console.log("App is now running on port 3000");
});

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send("Hello root");
});

app.listen(3000, function() {
  console.log("App is now running on port 3000");
});

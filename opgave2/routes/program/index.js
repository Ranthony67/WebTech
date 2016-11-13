var router = require('express').Router();
var Program = require('../../models/program');
var isAuthenticated = require('../../utils/is_authenticated');

router.get('/', isAuthenticated, function(req, res) {
  Program.find({}, (err, programs) => {
    res.send({ programs: programs })
  });
});

module.exports = router;

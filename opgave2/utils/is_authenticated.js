var User = require('../models/user');

function isAuthenticated(req, res, next) {
  var token = req.header("token");

  User.findOne({token: token}, (err, user) => {
    if (user !== null) {
      return next();
    }

    res.send({error: {status: 404, message: 'Unauthorized'}});
  });
}

module.exports = isAuthenticated;

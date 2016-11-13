var User = require('../models/user');

function isAuthenticated(req, res, next) {
  var token = req.header("token");

  User.findOne({token: token}, (err, user) => {
    if (user !== null) {
      return next();
    }

    res.status(401);
    res.send({error: {status: 401, message: 'Unauthorized'}});
  });
}

module.exports = isAuthenticated;

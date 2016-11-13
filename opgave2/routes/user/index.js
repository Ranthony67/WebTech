var router = require('express').Router();
var User = require('../../models/user');
var isAuthenticated = require('../../utils/is_authenticated');

var hashPassword = require('../../utils/generate_token').hashPassword;
var generateToken = require('../../utils/generate_token').generateToken;

router.get('/', (req, res) => {
});

router.post('/sign_up', (req, res) => {
  var email = req.body.email;
  var rawPassword = req.body.password;

  if (!email || !rawPassword) {
    res.status(422);
    res.send({error: {status: 422, message: 'Missing params'}});
    return;
  }


  User.findOne({email: email}, (err, user) => {
    if (user !== null) {
      res.status(422);
      res.send({error: {status: 422, message: 'User already exists'}});
      return;
    }

    var hashedPassword = hashPassword(req.body.password);

    var user = new User();
    user.email = email;
    user.crypted_password = hashedPassword;
    user.token = generateToken();
    user.save((err) => {
      res.send({token: user.token});
    });
  });
});

router.post('/sign_in', (req, res) => {
  var email = req.body.email;
  var rawPassword = req.body.password;

  if (!email || !rawPassword) {
    res.status(422);
    res.send({error: {status: 422, message: 'Missing params'}});
    return;
  }

  var hashedPassword = hashPassword(req.body.password);

  User.findOne({email: email, crypted_password: hashedPassword}, (err, user) => {
    if (user === null) {
      res.status(403).send({error: {status: 403, message: 'No user found or password incorrect.'}});
      return;
    }

    var newToken = generateToken();
    user.token = newToken;

    user.save((err) => {
      res.send({token: newToken});
    });
  });
});

module.exports = router;

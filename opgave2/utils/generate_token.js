var crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(64).toString('hex');
};

function hashPassword(password) {
  var hash = crypto.createHash('sha256');
  return hash.update(password).digest('hex');
}

module.exports = {
  generateToken: generateToken,
  hashPassword: hashPassword
};

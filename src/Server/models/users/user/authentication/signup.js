var Promise = require('promise');
var db = require('../../../../db/index');

signup = (data) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
        [data.name, data.email, data.password, data.role]);
      resolve();
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  signup: signup
}
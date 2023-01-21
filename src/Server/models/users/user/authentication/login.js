var Promise = require('promise');
var db = require('../../../../db/index');

login = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query('SELECT * FROM users');

      result.then((answer) => {
        isUserExist(data, answer.rows) ?
          resolve() :
          reject()
      })
    } catch (error) {
      reject(error);
    }
  })
}

isUserExist = (checkedUser, users) => {
  for (let index = 0; index < users.length; index++) {
    if (
      checkedUser.name == users[index].name &&
      checkedUser.email == users[index].email &&
      checkedUser.password == users[index].password &&
      checkedUser.role == users[index].role) {

      return true;
    }
  }
  return false;
}

module.exports = {
  login: login
}
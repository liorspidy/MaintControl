var Promise = require('promise');
var db = require('../../../db/index');

getUsers = (decodedToken, query) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM dim_users
                         WHERE company_id = ${decodedToken.companyId}
                         OFFSET ${query.OFFSET}
                         LIMIT ${query.LIMIT}`);

      result.then((answer) => {
          resolve({
            httpCode: 200,
            answer: answer.rows
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during recieving users: ${err}`
          })
        })
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      });
    }
  })
}

module.exports = {
  getUsers: getUsers
}
var Promise = require('promise');
var db = require('../../../db/index');

deleteUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`DELETE FROM dim_users 
                         WHERE user_name = '${data.user_name}' AND
						                   email = '${data.email}' AND
						                   company_id = ${data.company_id}`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "deleted user succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during deleting user: ${err}`
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
  deleteUser: deleteUser
}
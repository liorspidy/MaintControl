var Promise = require('promise');
var db = require('../../../db/index');

updateUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(data);
      console.log(query);
      // result = db.query(`UPDATE dim_users 
      //                    SET user_name = ${data.user_name},
      //                       first_name,
      //                       last_name,
      //                       email,
      //                       password,
      //                       phone,
      //                       role,
      //                       company_id WHERE
      //                       user_id = ${data.user_id}`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "updated user succesfuly"
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
  updateUser: updateUser
}
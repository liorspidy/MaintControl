var Promise = require('promise');
var db = require('../../../../db/index');

updateUser = (data, decodedToken) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`UPDATE dim_users 
                         SET user_name = '${data.user_name}',
                            first_name = '${data.first_name}',
                            last_name = '${data.last_name}',
                            email = '${data.email}',
                            password = '${data.password}',
                            phone = '${data.phone}',
                            role = '${data.role}' 
                            WHERE user_id = ${data.user_id} AND 
                            company_id = ${decodedToken.companyId}`);

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "updated user succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during updating user: ${err}`
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
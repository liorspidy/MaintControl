var Promise = require('promise');
var db = require('../../../../db/index');

searchUser = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM dim_users
                         WHERE company_id = ${decodedToken.companyId}
                         AND user_id != ${decodedToken.userId}
                         AND (first_name ILIKE '%${data.search_term}%' 
                              OR last_name ILIKE '%${data.search_term}%' 
                              OR email ILIKE '%${data.search_term}%' 
                              OR phone ILIKE '%${data.search_term}%')
                         ORDER BY user_id`);

      result.then((answer) => {
          resolve({
            httpCode: 200,
            answer: answer.rows
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during searching user: ${err}`
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
  searchUser: searchUser
}
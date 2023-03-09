var Promise = require('promise');
var db = require('../../../../db/index');
jwtSecretConfig = require('../../../../config/JWTAuthoriztionConfig');
const {
  generateAccessToken
} = require('./autohrization/jwt');

login = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM dim_users WHERE 
                        user_name='${data.user_name}' AND 
                        password='${data.password}' AND
                        company_id=${data.company_id}`);

      userName = {}
      result.then((answer) => {
          if (isUserExist(answer)) {
            userName = { userName: answer.rows[0].user_name }
            return generateAccessToken(userName)
          } else {
            reject({httpCode:401, answer:'Unauthorized'});
          }
        })
        .then((token) => {
          resolve({httpCode:201, answer:token})
        })
        .catch((err) => {
          reject(500, `Error generating token: ${err}`)
        })
    } catch (error) {
      reject(500, "Internal server error");
    }
  })
}

isUserExist = (answer) => {
  return answer.rowCount == 1 ? true : false;
}

module.exports = {
  login: login
}
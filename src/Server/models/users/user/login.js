var Promise = require('promise');
var db = require('../../../db/index');
jwtSecretConfig = require('../../../config/JWTAuthoriztionConfig');
const {
  generateAccessToken
} = require('../../../utils/autohrization/jwt');

login = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM dim_users WHERE 
                        user_name='${data.user_name}' AND 
                        password='${data.password}' AND
                        company_id=${data.company_id}`);

      role = ''
      result.then((answer) => {
          if (isUserExist(answer)) {
            payload = {
              userId: answer.rows[0].user_id,
              userName: answer.rows[0].user_name,
              companyId: answer.rows[0].company_id
            }
            role = answer.rows[0].role

            return generateAccessToken(payload)
          } else {
            reject({
              httpCode: 401,
              answer: 'Unauthorized'
            });
          }
        })
        .then((token) => {
          resolve({
            httpCode: 201,
            answer: {
              token: token,
              role: role
            }
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error generating token: ${err}`
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

isUserExist = (answer) => {
  return answer.rowCount == 1 ? true : false;
}

module.exports = {
  login: login
}
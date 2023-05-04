var Promise = require('promise')
var db = require('../../../../db/index')

addUser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`INSERT INTO dim_users (
             user_name,
					   first_name,
					   last_name,
					   email,
					   password,
					   phone,
					   role,
					   company_id) VALUES (
						   '${data.user_name}',
						   '${data.first_name}',
						   '${data.last_name}',
						   '${data.email}',
						   '${data.password}',
						   '${data.phone}',
						   '${data.role}',
						   ${data.company_id})`)

      result.then(() => {
          resolve({
            httpCode: 200,
            answer: "Added user succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during adding user: ${err}`
          })
        })
    } catch (error) {
      reject({
        httpCode: 500,
        answer: "Internal server error"
      })
    }
  })
}

module.exports = {
  addUser: addUser
}
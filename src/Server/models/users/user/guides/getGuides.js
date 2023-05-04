var Promise = require('promise')
var db = require('../../../../db/index')

getGuides = (decodedToken, query) => {
  return new Promise((resolve, reject) => {
    try {
      result = db.query(`SELECT * FROM fact_guides
                         WHERE company_id = ${decodedToken.companyId}
                         ORDER BY guide_id
                         OFFSET ${query.OFFSET}
                         LIMIT ${query.LIMIT}`)

      result.then((answer) => {
        const entries = Object.entries(answer.rows[0]).filter(([key]) => key !== 'company_id')
        const guides = Object.fromEntries(entries)
          resolve({
            httpCode: 200,
            answer: guides
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during getting guides: ${err}`
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
  getGuides: getGuides
}
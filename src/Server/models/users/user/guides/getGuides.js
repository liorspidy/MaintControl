var Promise = require('promise')
var db = require('../../../../db/index')
const bucket = require('../../../../bucket')

getGuides = (decodedToken, query) => {
  return new Promise((resolve, reject) => {
    try {
      // result = db.query(`SELECT * FROM fact_guides
      //                    WHERE company_id = ${decodedToken.companyId}
      //                    ORDER BY guide_id
      //                    OFFSET ${query.OFFSET}
      //                    LIMIT ${query.LIMIT}`)

      // result.then((answer) => {
      //   const entries = Object.entries(answer.rows[0]).filter(([key]) => key !== 'company_id')
      //   const guides = Object.fromEntries(entries)
      //     resolve({
      //       httpCode: 200,
      //       answer: guides
      //     })
      //   })
      const bucketName = 'maint_control_guides_bucket'
      const secretName = process.env.guides_bucket_secret
      const offset = `${query.OFFSET}`
      const limit = `${query.LIMIT}`
      
      bucket.getFiles(bucketName, offset, limit, decodedToken.companyId, secretName)
        .then((answer) => {
          resolve({
            httpCode: 200,
            answer: answer
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
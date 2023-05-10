var Promise = require('promise')
const bucket = require('../../../../bucket/index')

deleteGuide = (decodedToken, data) => {
  return new Promise((resolve, reject) => {
    try {

      const bucketName = 'maint_control_guides_bucket'
      const folderName = `companyID - ${decodedToken.companyId}`
      const secretName = process.env.guides_bucket_secret

      bucket.deleteFile(bucketName, folderName,data.file_name, secretName)
      .then(() => {
          resolve({
            httpCode: 200,
            answer: "deleted guide succesfuly"
          })
        })
        .catch((err) => {
          reject({
            httpCode: 500,
            answer: `Error during deleting guide: ${err}`
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
  deleteGuide: deleteGuide
}
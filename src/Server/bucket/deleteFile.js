const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.guides_bucket_secret
})

deleteFile = (bucketName, filename) => {
  return new Promise((resolve, reject) => {
    storage.bucket(bucketName).file(filename).delete()
      .then(() => {
        console.log(`${filename} deleted from ${bucketName}.`)
        resolve()
      })
      .catch((err) => {
        console.error('ERROR:', err)
        reject(err)
      })
  })
}

module.exports = {
  deleteFile: deleteFile
}
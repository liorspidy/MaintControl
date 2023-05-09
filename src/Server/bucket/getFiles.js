const {
  Storage
} = require('@google-cloud/storage')

getFiles = (bucketName, fileName) => {
  return new Promise((resolve, reject) => {
    getSecret()
      .then(keyFile => {
        const storageWithCredentials = new Storage({
          projectId: process.env.GCP_PROJECT_ID,
          credentials: keyFile
        })
        storageWithCredentials.bucket(bucketName)
          .getFiles({prefix: 'companyID - 1/'})
          .then((data) => {
            console.log('======= data =====' + data)
            const files = data[0]
            console.log('Files:')
            files.forEach((file) => {
              console.log(file.name)
            })
          })
          .catch((err) => {
            console.error('ERROR:', err)
          })
      })
  })
}

getSecret = () => {
  return new Promise((resolve, reject) => {
    try {
      const keyFile = JSON.parse(process.env.guides_bucket_secret)
      resolve(keyFile)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getFiles: getFiles
}
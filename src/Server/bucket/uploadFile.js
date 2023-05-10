const {
  Storage
} = require('@google-cloud/storage')
const secretManager = require('../secretManager/index')

uploadFile = (bucketName, pathToFile, folderName, fileName, mimetype, secretName) => {
  return new Promise((resolve, reject) => {
    secretManager.getSecret(secretName)
      .then(keyFile => {
        const storageWithCredentials = new Storage({
          projectId: process.env.GCP_PROJECT_ID,
          credentials: keyFile
        })
        createFolderIfNotExists(storageWithCredentials, bucketName, folderName)
          .then(() => {
            console.log('folder if not exists success')
            uploadFileToFolder(storageWithCredentials, bucketName, pathToFile, folderName, fileName, mimetype)
              .then(() => {
                console.log('File uploaded successfully')
                resolve()
              })
              .catch((err) => {
                console.error(`Error uploading file: ${err}`)
                reject()
              })
          })
          .catch((err) => {
            console.error(`Error could not create folder if not exists: ${err}`)
            reject()
          })
      })
      .catch((err) => {
        console.error(`Error secret: ${err}`)
        reject(err)
      })
  })
}

createFolderIfNotExists = (storage, bucketName, folderName) => {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName)
    const folderFile = bucket.file(`${folderName}/`)
    folderFile.exists()
      .then((data) => {
        const exists = data[0]
        if (!exists) {
          console.log(`Creating folder ${folderName} in bucket ${bucketName}`)
          return folderFile.save('')
            .then(() => {
              resolve()
            })
            .catch((err) => {
              reject(err)
            })
        }
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}


uploadFileToFolder = (storage, bucketName, pathToFile, folderName, fileName, mimetype) => {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName)
    const file = bucket.file(`${folderName}/${fileName}`)
    const options = {
      destination: file,
      resumable: false,
      validation: false,
      metadata: {
        contentType: mimetype,
      },
    }
    bucket.upload(pathToFile, options)
      .then(() => {
        console.log(`File ${fileName} uploaded to folder ${folderName} in bucket ${bucketName}`)
        resolve()
      })
      .catch((err) => {
        console.error(`Error uploading file ${fileName} to folder ${folderName} in bucket ${bucketName}: ${err}`)
        reject(err)
      })
  })
}

module.exports = {
  uploadFile: uploadFile
}
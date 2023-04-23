// const { createBucket } = require('./createBucket')
const { uploadFile } = require('./uploadFile')
const { deleteFile } = require('./deleteFile')
const { downloadFile } = require('./downloadFile')

module.exports={
  // createBucket: createBucket,
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  downloadFile: downloadFile
}

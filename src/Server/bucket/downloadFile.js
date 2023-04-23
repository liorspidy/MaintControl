const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.BUCKET_SECRET
});

downloadFile = (bucketName, srcFilename, destFilename) => {
  return new Promise((resolve, reject) => {
    storage.bucket(bucketName).file(srcFilename).download({ destination: destFilename })
      .then(() => {
        console.log(`gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`);
        resolve();
      })
      .catch((err) => {
        console.error('ERROR:', err);
        reject(err);
      });
  });
}

module.exports = {
  downloadFile: downloadFile
}
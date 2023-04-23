const { Storage } = require('@google-cloud/storage');

deleteFile = (bucketName, filename, keyFilename) => {
  return new Promise((resolve, reject) => {
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: keyFilename
    });

    storage.bucket(bucketName).file(filename).delete()
      .then(() => {
        console.log(`${filename} deleted from ${bucketName}.`);
        resolve();
      })
      .catch((err) => {
        console.error('ERROR:', err);
        reject(err);
      });
  });
}

module.exports = {
  deleteFile: deleteFile
}
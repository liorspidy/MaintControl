const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.BUCKET_SECRET
});

createBucket = (bucketName) => {
  return new Promise((resolve, reject) => {
    storage.createBucket(bucketName)
      .then(([bucket]) => {
        console.log(`Bucket ${bucket.name} created.`);
        resolve();
      })
      .catch((err) => {
        console.error('ERROR:', err);
        reject(err);
      });
  });
}

module.exports = {
  createBucket: createBucket
}
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.GCP_GUIDES_KEY_FILE_NAME
});

// Create a new bucket
async function createBucket() {
  const [bucket] = await storage.createBucket(process.env.GCP_GUIDES_BUCKET_NAME);
  console.log(`Bucket ${bucket.name} created.`);
}

// Upload a file to a bucket
async function uploadFile(filename) {
  await storage.bucket(process.env.GCP_GUIDES_BUCKET_NAME).upload(filename);
  console.log(`${filename} uploaded to ${process.env.GCP_GUIDES_BUCKET_NAME}.`);
}

// Delete a file from a bucket
async function deleteFile(filename) {
  await storage.bucket(process.env.GCP_GUIDES_BUCKET_NAME).file(filename).delete();
  console.log(`${filename} deleted from ${process.env.GCP_GUIDES_BUCKET_NAME}.`);
}

// Download a file from a bucket
async function downloadFile(srcFilename, destFilename) {
  await storage.bucket(process.env.GCP_GUIDES_BUCKET_NAME).file(srcFilename).download({ destination: destFilename });
  console.log(`gs://${process.env.GCP_GUIDES_BUCKET_NAME}/${srcFilename} downloaded to ${destFilename}.`);
}

module.exports={
  createBucket: createBucket,
  uploadFile: uploadFile,
  deleteFile: deleteFile,
  downloadFile: downloadFile
}
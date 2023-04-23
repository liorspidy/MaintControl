uploadFile = (bucketName) => {
  createFolderIfNotExists(bucketName)
    .then(() => {
      uploadFileToFolder('path/to/myfile.txt', 'myfile.txt');
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
}

// Create a folder if it doesn't exist
createFolderIfNotExists = (bucketName) => {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const folderFile = bucket.file(folderName);
    folderFile.exists()
      .then((data) => {
        const exists = data[0];
        if (!exists) {
          console.log(`Creating folder ${folderName} in bucket ${bucketName}`);
          return folderFile.save('')
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        }
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Upload a file to a folder in a bucket
uploadFileToFolder = (filePath, fileName) => {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`${folderName}${fileName}`);
    const options = {
      destination: file,
      resumable: false,
      validation: false,
      metadata: {
        contentType: 'text/plain',
      },
    };
    bucket.upload(filePath, options)
      .then(() => {
        console.log(`File ${fileName} uploaded to folder ${folderName} in bucket ${bucketName}`);
        resolve();
      })
      .catch((err) => {
        console.error(`Error uploading file ${fileName} to folder ${folderName} in bucket ${bucketName}: ${err}`);
        reject(err);
      });
  });
}

module.exports = {
  uploadFile: uploadFile
}
getSecret = (secretName) => {
  return new Promise((resolve, reject) => {
    try {
      // const keyFile = JSON.parse(process.env.guides_bucket_secret)
      const keyFile = JSON.parse(secretName)
      resolve(keyFile)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getSecret: getSecret
}
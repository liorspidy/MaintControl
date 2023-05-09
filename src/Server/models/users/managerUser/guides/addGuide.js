const fs = require('fs')
const path = require('path')
const Busboy = require('busboy')
const fileType = require('file-type')
const bucket = require('../../../../bucket/index')

addGuide = (decodedToken, req) => {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({
        headers: req.headers
      })
      let filename = ''
      let mimetype = ''
      busboy.on('file', (fieldname, file, originalname) => {
        const now = new Date()
        const date = now.toLocaleDateString('he-IL')
        filename = `${originalname.filename} - ${date}`

        // Get the file type from the buffer
        const chunks = []
        file.on('data', chunk => chunks.push(chunk))
        file.on('end', () => {

          const buffer = Buffer.concat(chunks)
          const type = fileType(buffer)
          mimetype = type?.mime
          const saveTo = path.join('/tmp', filename)
          fs.writeFileSync(saveTo, buffer)
        })
      })

      busboy.on('finish', () => {
        bucket.uploadFile(
            'maint_control_guides_bucket',
            path.join('/tmp', filename),
            `companyID - ${decodedToken.companyId}`,
            filename,
            mimetype
          )
          .then(() => {
            resolve({
              httpCode: 200,
              answer: 'Added guide successfully'
            })
          })
          .catch((err) => {
            reject({
              httpCode: 500,
              answer: `Error during adding guide: ${err}`
            })
          })
      })

      req.pipe(busboy)
    } catch (error) {
      reject({
        httpCode: 500,
        answer: 'Internal server error: ' + error,
      })
    }
  })
}

module.exports = {
  addGuide: addGuide
}
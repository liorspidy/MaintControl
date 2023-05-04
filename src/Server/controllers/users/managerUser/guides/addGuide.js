const managerUser = require('../../../../models/users/managerUser/index')

module.exports = {
  addGuide: (req, res) => {
    console.log('Content-Type: ', req.headers['content-type']);
    managerUser.addGuide(req.user, req) // Pass the req object to the model
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: err.answer,
        })
      })
  }
}

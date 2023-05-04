const managerUser = require('../../../../models/users/managerUser/index')

module.exports = {
  updateGuide: (req, res) => {
    managerUser.updateGuide(req.body)
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: err.answer
        })
      })
  }
}
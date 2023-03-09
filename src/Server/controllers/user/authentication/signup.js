const user = require('../../../models/users/user/index')

module.exports = {
  signup: (req, res) => {
    user.signup(req.body)
    .then((httpCode, answer) => {
      return res.status(httpCode).json({
        answer: answer
      })
    })
    .catch((httpCode, answer) => {
      return res.status(httpCode).json({
        error: answer
      })
    });
  }
};
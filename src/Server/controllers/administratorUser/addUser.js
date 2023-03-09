// const user = require('../../models/users/user/index')

module.exports = {
  addUser: (req, res) => {
    administratorUser.addUser(req.body)
      .then((result) => {
        return res.status(result.httpCode).json({
          answer: result.answer
        })
      })
      .catch((err) => {
        return res.status(err.httpCode).json({
          error: err.answer
        })
      });
  }
};
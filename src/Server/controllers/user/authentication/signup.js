const user = require('../../../models/users/user/index')

module.exports = {
  signup: (req, res) => {
    user.signup(req.body)
      .then((answer) => {
        return res.status(200).json({});
      })
      .catch((error) => {
        return res.status(400).json({});
      });
  }
};
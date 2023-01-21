const user = require('../../../models/users/user/index')

module.exports = {
  login: (req, res) => {
    user.login(req.body)
      .then((result) => {
        return res.status(200).json({})
      })
      .catch((error) => {
        return res.status(401).json({})
      });
  }
};

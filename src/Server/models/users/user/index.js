const { signup } = require("./authentication/signup");
const { login } = require("./authentication/login");

module.exports = {
  signup: signup,
  login: login,
}

const { login } = require("./authorization/login")
const { getUserSettings } = require("./settings/getUserSettings")
const { getGuides } = require("./guides/getGuides")


module.exports = {
  login: login,
  getUserSettings: getUserSettings,
  getGuides: getGuides
}

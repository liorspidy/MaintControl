const { addUser } = require("./addUser");
const { updateUser } = require("./updateUser");
const { deleteUser } = require("./deleteUser");
const { getUsers } = require("./getUsers");

module.exports = {
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUsers: getUsers
}

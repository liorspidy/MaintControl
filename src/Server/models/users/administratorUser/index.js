const { addUser } = require("./usersManagement/addUser");
const { updateUser } = require("./usersManagement/updateUser");
const { deleteUser } = require("./usersManagement/deleteUser");
const { getUsers } = require("./usersManagement/getUsers");

module.exports = {
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUsers: getUsers
}

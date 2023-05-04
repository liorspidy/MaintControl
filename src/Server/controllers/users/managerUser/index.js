const { addGuide } = require("./guides/addGuide")
const { updateGuide } = require("./guides/updateGuide")
const { deleteGuide } = require("./guides/deleteGuide")

module.exports = {
  addGuide: addGuide,
  updateGuide: updateGuide,
  deleteGuide: deleteGuide
}

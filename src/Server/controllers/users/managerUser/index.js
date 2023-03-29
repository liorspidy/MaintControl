const { addGuide } = require("./guides/addGuide");
const { updateGuide } = require("./guides/updateGuide");
const { deleteGuide } = require("./guides/deleteGuide");
const { getGuides } = require("./guides/getGuides");

module.exports = {
  addGuide: addGuide,
  updateGuide: updateGuide,
  deleteGuide: deleteGuide,
  getGuides: getGuides
}

const express = require('express');
const getGuidesRouter = express.Router();
const cors = require('cors');
const managerUserController = require('../../../../controllers/users/managerUser/index');
const {
  verifyToken
} = require('../../../../utils/autohrization/jwt');
const {
  authorizeRole
} = require('../../../../utils/autohrization/role');


getGuidesRouter.use(cors());

getGuidesRouter.get('/guides/getGuides', verifyToken, authorizeRole(['administrator', 'manager', 'maintainance']), (req, res) => {
  managerUserController.getGuides(req, res)
});

module.exports = getGuidesRouter
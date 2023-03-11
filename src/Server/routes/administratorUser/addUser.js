const express = require('express');
const addUserRouter = express.Router();
const administratorUserController = require('../../controllers/administratorUser/index');
const {
  verifyToken
} = require('../../utils/autohrization/jwt');
const {
  authorizeRole
} = require('../../utils/autohrization/role');

addUserRouter.post('/users/addUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.addUser(req, res)
});

module.exports = addUserRouter
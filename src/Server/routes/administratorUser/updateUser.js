const express = require('express');
const updateUserRouter = express.Router();
const {
  verifyToken
} = require('../../utils/autohrization/jwt');
const administratorUserController = require('../../controllers/administratorUser/index');
const {
  authorizeRole
} = require('../../utils/autohrization/role');

updateUserRouter.put('/users/updateUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.updateUser(req, res)
});

module.exports = updateUserRouter
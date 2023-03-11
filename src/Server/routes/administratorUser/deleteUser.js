const express = require('express');
const deleteUserRouter = express.Router();
const administratorUserController = require('../../controllers/administratorUser/index');
const {
  verifyToken
} = require('../../utils/autohrization/jwt');
const {
  authorizeRole
} = require('../../utils/autohrization/role');

deleteUserRouter.delete('/deleteUser', verifyToken, authorizeRole(['administrator']), (req, res) => {
  administratorUserController.deleteUser(req, res);
});

module.exports = deleteUserRouter